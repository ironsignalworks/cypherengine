/**
 * Export functionality for various formats
 */

import { SIG_LINE } from './utils.js';

/**
 * Export QR code as PNG
 */
export function exportQR() {
  const mode = document.getElementById('mode').value;
  const chaos = document.getElementById('chaos').value;
  
  if (mode !== 'qr' && chaos !== 'corruptedqr') {
    alert('No QR to export. Choose QR Code or Corrupted QR.');
    return;
  }
  
  const canvas = document.getElementById('qrCanvas');
  const data = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = data;
  a.download = 'chyper_qr.png';
  a.click();
}

/**
 * Export output as ASCII art PNG
 */
export function exportASCII() {
  const output = document.getElementById('output');
  const out = output.textContent || '';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const lines = (out + SIG_LINE).split('\n');
  const font = '12px ui-monospace, monospace';
  
  ctx.font = font;
  const width = Math.min(1200, Math.max(...lines.map(l => ctx.measureText(l).width)) + 16);
  const lineH = 16;
  const height = Math.min(1000, lines.length * lineH + 12);
  
  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);
  
  // bg + frame
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(170,255,0,.35)';
  ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
  
  // text
  ctx.font = font;
  ctx.fillStyle = '#aaff00';
  lines.forEach((l, i) => ctx.fillText(l, 8, (i + 1) * lineH));
  
  const data = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = data;
  a.download = 'chyper_ascii.png';
  a.click();
}

/**
 * Download output as text file
 */
export function downloadTxt() {
  const output = document.getElementById('output');
  const text = (output.textContent || '') + SIG_LINE;
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'chyper_output.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Download note sequence as text file
 */
export function downloadSequence(notes) {
  if (!notes.length) {
    alert('No notes generated.');
    return;
  }
  
  const body = notes.join(',') + SIG_LINE;
  const blob = new Blob([body], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'chyper_sequence.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Generate and copy shareable URL with UTM tracking
 */
export function shareURL() {
  const input = document.getElementById('inputText');
  const mode = document.getElementById('mode');
  const chaos = document.getElementById('chaos');
  
  const baseUrl = "https://ironsignalworks.com/chyper";
  const p = new URLSearchParams();
  p.set('msg', btoa(input.value || ''));
  p.set('mode', mode.value || '');
  p.set('chaos', chaos.value || '');
  // Tracking
  p.set('utm_source', 'chyper');
  p.set('utm_medium', 'share');
  p.set('utm_campaign', 'lab-to-site');
  
  const share = baseUrl + '?' + p.toString();
  return navigator.clipboard.writeText(share);
}
