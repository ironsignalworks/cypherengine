# Changelog

## [2.0.0] - ES Module Refactor

### Major Changes
- **Refactored to ES6 Modules**: Converted from inline scripts to modular JavaScript
  - Split code into 6 focused modules (app.js, utils.js, cypher.js, qr.js, audio.js, exports.js)
  - Improved code organization and maintainability
  - Better separation of concerns

### Bug Fixes
1. **Async QR Corruption**: Fixed corruptQRCode to properly handle asynchronous canvas operations
   - Now returns a Promise that resolves when corruption is complete
   - Added proper error handling for out-of-bounds canvas operations
   
2. **Audio Context Initialization**: Improved error handling for Tone.js audio context
   - Better handling of user interaction requirements
   - More informative error messages
   
3. **Canvas Bounds Checking**: Added try-catch blocks in QR corruption to prevent crashes
   - Skips operations that would be out of bounds
   - Logs warnings instead of throwing errors
   
4. **URL Parameter Parsing**: Enhanced error handling when decoding shared link parameters
   - Catches and logs decode errors gracefully
   - Prevents app crash on malformed URLs

5. **Chaos Layer Flow**: Fixed async handling for corruptedqr chaos layer
   - Properly generates QR code before applying corruption
   - Correctly displays "CORRUPTED QR READY" message

### Improvements
- **Code Documentation**: Added JSDoc comments to all functions
- **Error Handling**: Consistent error handling throughout all modules
- **Type Safety**: Better parameter validation and type checking
- **Performance**: Removed redundant DOM queries by caching element references
- **Accessibility**: Maintained all existing ARIA labels and accessibility features

### File Structure
```
Before (1 file):
- index.html (with 300+ lines of inline JavaScript)

After (8 files):
- index.html (clean, references module)
- js/app.js (main application logic)
- js/utils.js (shared utilities)
- js/cypher.js (cipher implementations)
- js/qr.js (QR code functionality)
- js/audio.js (audio synthesis)
- js/exports.js (export handlers)
- package.json (project metadata)
```

### Developer Experience
- Added package.json with npm scripts
- Created comprehensive README.md
- Added test.html for module verification
- All modules use modern ES6+ syntax
- Import/export statements for clear dependencies

### Breaking Changes
- None for end users (UI and functionality remain identical)
- Developers must now serve files via HTTP (no file:// protocol due to CORS)

### Testing
- Verified all cipher modes work correctly
- Tested all chaos layers including corruptedqr
- Confirmed audio playback functionality
- Validated all export formats (TXT, PNG, QR)
- Tested share URL generation with UTM parameters

### Future Improvements
- Consider adding unit tests
- Potential TypeScript migration
- Service worker for offline functionality
- Additional cipher algorithms
