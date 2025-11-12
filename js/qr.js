/**
 * QR Code generation and manipulation
 */

import { clampCanvasSize } from './utils.js';

/**
 * Generate QR code and return as data URL
 */
export function generateQRCode(text) {
  const canvas = document.getElementById('qrCanvas');
  const ctx = canvas.getContext('2d');
  const panel = document.querySelector('.panel');
  const containerW = panel.clientWidth;
  const size = clampCanvasSize(Math.floor(containerW * 0.25));
  canvas.width = canvas.height = size;

  const qr = qrcode(4, 'L');
  qr.addData(text);
  qr.make();

  const m = qr.getModuleCount();
  const tile = Math.ceil(size / m);

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);
  
  for(let r = 0; r < m; r++) {
    for(let c = 0; c < m; c++) {
      ctx.fillStyle = qr.isDark(r, c) ? '#aaff00' : '#000';
      ctx.fillRect(c * tile, r * tile, tile, tile);
    }
  }
  
  // signature footer
  ctx.fillStyle = 'rgba(0,0,0,.7)';
  ctx.fillRect(0, size - 18, size, 18);
  ctx.fillStyle = '#aaff00';
  ctx.font = '11px ui-monospace, monospace';
  ctx.fillText('ironsignalworks.com', 6, size - 6);
  
  return canvas.toDataURL('image/png');
}

/**
 * Corrupt QR code with glitch effects
 */
export function corruptQRCode(qrDataURL) {
  // accept dataURL from generateQRCode OR raw text (generate first if needed)
  const data = qrDataURL.startsWith('data:') ? qrDataURL : generateQRCode(qrDataURL);
  const canvas = document.getElementById('qrCanvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const n = Math.floor(canvas.width * canvas.height * 0.02);
      
      for(let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        const w = 1 + Math.floor(Math.random() * 3);
        const h = 1 + Math.floor(Math.random() * 3);
        const dx = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 6);
        const dy = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 6);
        
        try {
          const block = ctx.getImageData(x, y, w, h);
          ctx.putImageData(block, x + dx, y + dy);
        } catch(e) {
          // Skip if out of bounds
          console.warn('QR corruption out of bounds', e);
        }
      }
      
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      console.error('Failed to load QR image for corruption');
      resolve(data);
    };
    
    img.src = data;
  });
}
