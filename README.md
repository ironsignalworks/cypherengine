# Cypher Engine

Experimental text cipher and glitch tool with chaos layers, QR output, and sonic encoding. Built by Iron Signal Works.

## Features

- **Multiple Cipher Modes**: ROT13, Reverse, Base64, Hex, Zalgo, Morse Code, Atbash, QR Code
- **Chaos Layers**: ASCII Artifact, Binary Scream, Corrupted QR
- **Sonic Echo**: Convert text to musical notes using Tone.js
- **Export Options**: TXT, ASCII PNG, QR PNG
- **Share Functionality**: Generate shareable URLs with UTM tracking
- **Decoder Mode**: Reverse the encoding process

## Project Structure

```
cypherengine/
??? index.html          # Main HTML page
??? package.json        # Project metadata
??? js/                 # ES6 Modules
?   ??? app.js         # Main application logic
?   ??? utils.js       # Utility functions
?   ??? cypher.js      # Cipher implementations
?   ??? qr.js          # QR code generation
?   ??? audio.js       # Audio/sonic functionality
?   ??? exports.js     # Export handlers
??? assets/            # Images and icons

```

## Running the Project

### Development Server

Using Python:
```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Production

Simply serve the files from any static web server. All dependencies are loaded from CDN:
- Tone.js (audio synthesis)
- qrcode-generator (QR code generation)

## Code Architecture

The project has been refactored to use ES6 modules for better maintainability:

- **utils.js**: Common utilities and constants
- **cypher.js**: All cipher encoding/decoding logic
- **qr.js**: QR code generation and corruption effects
- **audio.js**: Tone.js integration for sonic echoes
- **exports.js**: Export functionality (PNG, TXT, share URLs)
- **app.js**: Main application initialization and event handlers

## Bug Fixes

- Fixed async handling for corrupted QR code generation
- Improved error handling for audio context initialization
- Added proper canvas bounds checking for QR corruption
- Fixed URL parameter parsing for shared links

## Technologies

- Vanilla JavaScript (ES6 modules)
- Tone.js for audio synthesis
- Canvas API for image generation
- QR Code Generator library

## License

MIT License

---

Built by [Iron Signal Works](https://ironsignalworks.com)
