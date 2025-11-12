/**
 * Main application logic and event handlers
 */

import { SIG_LINE, showCopyToast, setStealth, setBlur } from './utils.js';
import { cypherText, decodeText, applyChaos } from './cypher.js';
import { generateQRCode } from './qr.js';
import { ensureSynth, textToNotes, scheduleNotes } from './audio.js';
import { exportQR, exportASCII, downloadTxt, downloadSequence, shareURL } from './exports.js';

// Application state
const state = {
  notes: [],
  playing: false
};

/**
 * Get DOM elements
 */
function getElements() {
  return {
    input: document.getElementById('inputText'),
    mode: document.getElementById('mode'),
    chaos: document.getElementById('chaos'),
    decodeToggle: document.getElementById('decodeToggle'),
    blurToggle: document.getElementById('blurToggle'),
    stealthToggle: document.getElementById('stealthModeToggle'),
    autoCopy: document.getElementById('autoCopy'),
    output: document.getElementById('output'),
    playBtn: document.getElementById('playBtn'),
    instructionsBtn: document.getElementById('instructionsBtn'),
    instructions: document.getElementById('instructions'),
    generateBtn: document.getElementById('generateBtn'),
    downloadTxtBtn: document.getElementById('downloadTxtBtn'),
    sequenceBtn: document.getElementById('sequenceBtn'),
    shareBtn: document.getElementById('shareBtn'),
    exportQRBtn: document.getElementById('exportQRBtn'),
    exportASCIIBtn: document.getElementById('exportASCIIBtn')
  };
}

/**
 * Main generate function
 */
async function generate() {
  const els = getElements();
  const input = els.input.value ?? '';
  const mode = els.mode.value;
  const chaos = els.chaos.value;
  const decodeMode = els.decodeToggle.checked;

  let out = '';
  
  if (decodeMode) {
    out = ">>> DECODED TEXT >>>\n" + decodeText(input, mode, chaos);
  } else {
    let cy = cypherText(input, mode);
    
    // if QR selected, cy is dataURL — still show notice + stash canvas
    if (mode === 'qr') {
      // already drew into canvas; cy is data URL
      out = ">>> QR READY >>>\n(Use EXPORT QR .PNG)\n";
    } else {
      // Handle chaos layers (may be async)
      cy = await applyChaos(cy, chaos);
      
      // If chaos produced a data URL (corruptedqr), show ready message
      if (chaos === 'corruptedqr') {
        out = ">>> CORRUPTED QR READY >>>\n(Use EXPORT QR .PNG)\n";
      } else {
        state.notes = textToNotes(input);
        out = ">>> CYPHERED TEXT >>>\n" + cy + "\n\n>>> SONIC ECHO >>>\n" + state.notes.join(' ');
      }
    }
  }
  
  els.output.textContent = out;

  if (els.autoCopy.checked) {
    navigator.clipboard.writeText(out + SIG_LINE)
      .then(showCopyToast)
      .catch(err => console.warn('Copy failed:', err));
  }
}

/**
 * Handle play/stop button
 */
async function handlePlay() {
  const els = getElements();
  await ensureSynth();
  
  if (state.playing) {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    state.playing = false;
    els.playBtn.textContent = 'PLAY';
  } else {
    if (!state.notes.length) {
      state.notes = textToNotes(els.input.value || '');
    }
    scheduleNotes(state.notes);
    state.playing = true;
    els.playBtn.textContent = 'STOP';
  }
}

/**
 * Auto-resize textarea
 */
function autoSize() {
  const input = document.getElementById('inputText');
  input.style.height = 'auto';
  input.style.height = Math.min(420, Math.max(84, input.scrollHeight)) + 'px';
}

/**
 * Initialize app from URL parameters (for shared links)
 */
function initFromURL() {
  const els = getElements();
  const p = new URLSearchParams(location.search);
  
  if (p.has('msg')) {
    try {
      els.input.value = atob(p.get('msg'));
    } catch(e) {
      console.warn('Failed to decode message from URL:', e);
    }
  }
  
  if (p.has('mode')) {
    els.mode.value = p.get('mode') || '';
  }
  
  if (p.has('chaos')) {
    els.chaos.value = p.get('chaos') || 'none';
  }
  
  // Generate automatically if there was a message
  if (p.has('msg')) {
    // If QR is chosen, draw it now to prep export
    if ((els.mode.value || '') === 'qr') {
      generateQRCode(els.input.value || '');
    }
    generate();
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  const els = getElements();
  
  // Main actions
  els.generateBtn.addEventListener('click', generate);
  els.playBtn.addEventListener('click', handlePlay);
  els.downloadTxtBtn.addEventListener('click', downloadTxt);
  els.sequenceBtn.addEventListener('click', () => downloadSequence(state.notes));
  els.exportQRBtn.addEventListener('click', exportQR);
  els.exportASCIIBtn.addEventListener('click', exportASCII);
  els.shareBtn.addEventListener('click', () => {
    shareURL().then(showCopyToast).catch(err => console.warn('Share failed:', err));
  });
  
  // Toggles
  els.stealthToggle.addEventListener('change', e => setStealth(e.target.checked));
  els.blurToggle.addEventListener('change', e => setBlur(e.target.checked));
  
  // Auto-resize textarea
  els.input.addEventListener('input', () => requestAnimationFrame(autoSize));
  
  // Instructions modal
  els.instructionsBtn.addEventListener('click', () => els.instructions.showModal());
}

/**
 * Initialize the application
 */
export function init() {
  setupEventListeners();
  initFromURL();
  autoSize();
  
  // Set defaults
  setStealth(false);
  setBlur(true);
}

// Auto-initialize when module loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
