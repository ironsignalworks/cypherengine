/**
 * Utility functions for Chyper Engine
 */

export const SIG_LINE = "\n\n=== Generated with Chyper Engine // Iron Signal Works ===\nhttps://ironsignalworks.com\n";

export const MORSE_TABLE = {
  A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',
  M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',
  Y:'-.--',Z:'--..', '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
  '6':'-....','7':'--...','8':'---..','9':'----.', ' ':'/'
};

export const MORSE_REV = Object.fromEntries(Object.entries(MORSE_TABLE).map(([k,v])=>[v,k]));

/**
 * Show copy success toast notification
 */
export function showCopyToast() {
  const copyFeedback = document.getElementById('copyFeedback');
  copyFeedback.classList.remove('hidden');
  setTimeout(() => copyFeedback.classList.add('hidden'), 1200);
}

/**
 * Toggle stealth mode styling
 */
export function setStealth(on) {
  document.body.classList.toggle('stealth', !!on);
}

/**
 * Toggle input blur effect
 */
export function setBlur(on) {
  const input = document.getElementById('inputText');
  input.classList.toggle('blurred', !!on);
}

/**
 * Clamp canvas size to reasonable limits
 */
export function clampCanvasSize(base) {
  return Math.max(64, Math.min(base, 256));
}
