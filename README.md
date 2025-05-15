# OneDrop

Web3 Chrome Browser Extension.

[@onedrop_app](https://x.com/onedrop_app) | [Chrome Install](https://chromewebstore.google.com/detail/onedrop/kgofomaofbbadcokcjlnchcljalinnfd)

## Overview

OneDrop is a Chrome extension that turns trending news on social media into tokens instantly. Just scroll, spot a post, and launch it with AI-generated details, deployed via pump.fun.

## Installation

### Chrome Web Store
https://chromewebstore.google.com/detail/onedrop/kgofomaofbbadcokcjlnchcljalinnfd

### Manual Installation (Developer Mode)

1. Download latest release
2. Unzip file
3. Go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked" and select unzipped folder

## Development Setup

```bash
git clone https://github.com/onedropdotapp/onedrop_plugin.git
cd OneDrop
pnpm install
pnpm dev
```

Load in Chrome: Open `chrome://extensions/`, enable Developer mode, click "Load unpacked", select `build/chrome-mv3-dev` directory

## Build for Production

```bash
pnpm build
pnpm package
```