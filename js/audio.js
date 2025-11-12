/**
 * Audio/Sonic echo functionality using Tone.js
 */

let synthReady = false;

/**
 * Ensure audio context is started
 */
export async function ensureSynth() {
  if (synthReady) return;
  try {
    await Tone.start();
    synthReady = true;
  } catch(e) {
    console.warn('Audio context not started yet', e);
  }
}

/**
 * Convert text to musical notes
 */
export function textToNotes(text) {
  const scale = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
  return Array.from(text).map(ch => scale[ch.charCodeAt(0) % scale.length]);
}

/**
 * Schedule notes for playback
 */
export function scheduleNotes(seq) {
  Tone.Transport.cancel();
  const synth = new Tone.Synth({
    oscillator: { type: 'square' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.8 }
  }).toDestination();
  
  let t = 0;
  seq.forEach(n => {
    Tone.Transport.schedule((time) => synth.triggerAttackRelease(n, '8n', time), t);
    t += 0.2;
  });
  
  Tone.Transport.start();
}
