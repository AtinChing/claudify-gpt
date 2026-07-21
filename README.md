# Claudify GPT

Chrome extension (Manifest V3) that restyles **ChatGPT** and **Gemini** with Claude’s visual language — warm charcoal / paper surfaces, editorial serif responses, and clay accents.

## Install / reload

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. **Load unpacked** → this folder (or **Reload** if already loaded)
4. Hard-refresh the site (`Cmd+Shift+R`)

Supported:
- [chatgpt.com](https://chatgpt.com)
- [gemini.google.com](https://gemini.google.com)

## What it does

- Charcoal `#1f1f1e` / paper `#f8f8f6` surfaces, sidebar `#141413`
- Assistant prose → Source Serif 4; UI → Source Sans 3 (bundled, CSP-safe)
- Composer as a soft rectangle (not a black-faded pill footer)
- Strips ChatGPT’s bottom gradient / mask / disclaimer glow
- Keeps site branding (e.g. “ChatGPT” top-left)

## Files

| File | Role |
|------|------|
| `theme.css` + `content.js` | ChatGPT |
| `theme-gemini.css` + `content-gemini.js` | Gemini |
| `fonts/` | SIL OFL Source fonts |

## License

MIT — fonts under SIL Open Font License (Adobe Source families).
