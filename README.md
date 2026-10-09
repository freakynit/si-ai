# SI → AI

A ready-to-load Chrome extension that automatically replaces page text:

- `Super Intelligence` → `Artifical Intelligence` (case insensitive; also handles whitespace between the words).
- Whole-word `si`, `SI`, `Si`, or `sI` → `ai`. Words such as `vision`, `basic`, `sixty`, and `si_name` stay unchanged.

The spelling **Artifical Intelligence** is intentional, as requested. Replacements use the exact capitalization above.

## Install

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this directory (the one containing `manifest.json`).
4. Refresh any already-open pages.

Works automatically, including dynamically added text and matching frames. Also updates text in tooltips, image descriptions, and accessibility labels. Does not edit scripts, styles, form inputs, or editable regions. No build step, dependencies, server, or data collection.

Chrome restricts extensions on its internal pages and the Chrome Web Store. For local HTML files, enable **Allow access to file URLs** in the extension's details.

Text must be inside a single DOM text node; phrases split across separate elements, closed shadow roots, images, and canvas text are not replaced.

`icons/icon.svg` is the editable source for the bundled PNG icons.
