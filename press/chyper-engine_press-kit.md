# CHYPER ENGINE — Press Kit

**One-liner**  
Chyper Engine is a browser-based cipher playground that encodes/decodes text, adds chaos layers, generates QR codes, and turns your message into a **sonic echo**—all locally in your browser. No tracking. No uploads.

**Elevator pitch**  
Chyper Engine is a compact, neon‑terminal web app built in the **Iron Signal Works** lab. Drop in any text, pick a **Cypher Style** (ROT13, Reverse, Base64, Hex, Zalgo, Morse, Atbash, QR Code) and optionally add a **Chaos Layer** (ASCII, Binary, Corrupted QR). Decode the other way around with **Decoder Mode**, export **QR** and **ASCII** images, **copy/share** stateful links (with UTM), and even **play** your message back as a note sequence—the app maps characters to pitch for a playful _signal → sound_ translation. Everything runs locally in the browser.

**Core features**  
- Encode & decode: ROT13, Reverse, Base64, Hex, Zalgo, Morse, Atbash, QR Code.  
- Chaos layers: ASCII Artifact, Binary Scream, Corrupted QR.  
- **Sonic Echo**: convert text to a sequence of musical notes and play it.  
- Exports: **TXT**, **ASCII PNG**, **QR PNG**, note sequence as **.txt**.  
- **Share**: copies a URL that reloads your exact state (with UTM for analytics).  
- **Branding baked in**: optional ISW signature on exports (traffic back to site).  
- **Privacy by design**: local-only processing; no tracking, no uploads.  
- Accessibility: labeled controls, reduced motion support, high-contrast stealth mode.

**Who it’s for**  
Artists, designers, developers, ARG/alt‑reality makers, puzzle communities, educators, social creators, and anyone who wants to obfuscate, stylize, or perform text in a shareable, audiovisual way.

**Tech notes**  
- Built with vanilla JS + Web APIs (Canvas, Clipboard, Web Audio via Tone.js).  
- QR via `qrcode-generator`. Audio scheduling via Tone.Transport.  
- Designed for current Chromium browsers; recent Safari/Firefox supported.  
- Exports include a small footer signature and can be disabled in code.  
- Share links persist **input**, **mode**, and **chaos** as URL params.

**Visual identity**  
- Primary color: Neon ISW Green — `#aaff00`  
- Background: Deep Black/Graphite — `#0b0b0b` to `#121212` gradients  
- Typeface: System monospace (SFMono / Consolas / Menlo / Courier New)  
- UI motifs: terminal‑like panel, dashed output frame, subtle CRT vibe

**Suggested assets**  
- App hero screenshot (panel with Cypher/Chaos/Output).  
- QR export example (clean + corrupted).  
- ASCII export example (with signature).  
- Short clip of “Sonic Echo” note playback.  
- ISW logo on dark background (PNG/SVG).

**Boilerplate (Iron Signal Works)**  
_Iron Signal Works_ builds playful web tools, experimental interfaces, and audio systems with a glitch/brutalist edge—contractor‑ready with clean code under the hood.

**Attribution & usage**  
- Please credit: “Chyper Engine — Iron Signal Works (ironsignalworks.com)” when embedding screenshots or exports.  
- Press may use provided assets and screenshots for coverage.

**Contact & links**  
- Site: **https://ironsignalworks.com**  
- App: **https://ironsignalworks.com/chyper**  
- Email: **web@ironsignalworks.com**  
- Social: @ironsignalworks (where applicable)

_Last updated: 2025-09-05_
