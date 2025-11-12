/**
 * Cypher and chaos layer implementations
 */

import { MORSE_TABLE, MORSE_REV } from './utils.js';
import { generateQRCode, corruptQRCode } from './qr.js';

/**
 * Apply cypher transformation to text
 */
export function cypherText(str, mode) {
  switch(mode) {
    case 'rot13':
      return str.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
      });
    case 'reverse':
      return [...str].reverse().join('');
    case 'base64':
      return btoa(unescape(encodeURIComponent(str)));
    case 'hex':
      return Array.from(str).map(c => c.charCodeAt(0).toString(16)).join(' ');
    case 'zalgo':
      return Array.from(str).map(c => c + '\u0301').join('');
    case 'morse':
      return Array.from(str.toUpperCase()).map(ch => MORSE_TABLE[ch] ?? ch).join(' ');
    case 'atbash':
      return str.replace(/[a-z]/gi, c => {
        const isU = c === c.toUpperCase();
        const code = c.toLowerCase().charCodeAt(0) - 97;
        const m = String.fromCharCode(97 + (25 - code));
        return isU ? m.toUpperCase() : m;
      });
    case 'qr':
      return generateQRCode(str); // returns dataURL
    default:
      return str;
  }
}

/**
 * Reverse chaos layer transformation
 */
export function reverseChaos(str, chaos) {
  switch(chaos) {
    case 'binary':
      return str.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
    case 'ascii':
      return str.trim().split(/\s+/).map(n => String.fromCharCode(parseInt(n, 10))).join('');
    default:
      return str;
  }
}

/**
 * Decode text based on mode and chaos layer
 */
export function decodeText(str, mode, chaos) {
  let decoded = reverseChaos(str, chaos);
  try {
    switch(mode) {
      case 'rot13':
        return cypherText(decoded, 'rot13');
      case 'reverse':
        return cypherText(decoded, 'reverse');
      case 'base64':
        return decodeURIComponent(escape(atob(decoded)));
      case 'hex':
        return decoded.trim().split(/\s+/).map(h => String.fromCharCode(parseInt(h, 16))).join('');
      case 'zalgo':
        return decoded.replace(/\u0301/g, '');
      case 'morse':
        return decoded.trim().split(/\s+/).map(tok => MORSE_REV[tok] ?? tok).join('').replace(/\//g, ' ');
      case 'atbash':
        return cypherText(decoded, 'atbash');
      case 'qr':
        return "[QR cannot be decoded here]";
      default:
        return decoded;
    }
  } catch(e) {
    console.error('Decoding error:', e);
    return "Decoding Error";
  }
}

/**
 * Apply chaos layer to text
 */
export async function applyChaos(str, chaos) {
  switch(chaos) {
    case 'ascii':
      return Array.from(str).map(c => c.charCodeAt(0)).join(' ');
    case 'binary':
      return Array.from(str).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    case 'corruptedqr':
      // First generate QR from text, then corrupt it
      const qrDataURL = generateQRCode(str);
      return await corruptQRCode(qrDataURL);
    default:
      return str;
  }
}
