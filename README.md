# OneDrop

Web3 Chrome Browser Extension time.

## 📋 Table of Contents

- [OneDrop](#onedrop)
  - [📋 Table of Contents](#-table-of-contents)
  - [🔍 Overview](#-overview)
  - [✨ Features](#-features)
  - [💻 Installation](#-installation)
    - [Chrome Web Store (Coming Soon)](#chrome-web-store-coming-soon)
    - [Manual Installation (Developer Mode)](#manual-installation-developer-mode)
  - [🛠️ Development Setup](#️-development-setup)
  - [🏗️ Building for Production](#️-building-for-production)
  - [📁 Project Structure](#-project-structure)

## 🔍 Overview

OneDrop is a browser extension that simplifies Web3 authentication and transaction signing, providing a seamless experience for users interacting with decentralized applications.

## ✨ Features

- Quick Web3 authentication
- Secure transaction signing
- User-friendly interface
- Cross-browser compatibility
- Integration with web applications

## 💻 Installation

### Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store
2. Search for "OneDrop"
3. Click "Add to Chrome"

### Manual Installation (Developer Mode)

1. Download the latest release from the [releases page](#)
2. Unzip the downloaded file
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the unzipped folder 

## 🛠️ Development Setup

1. Clone the repository:

```bash
git clone https://github.com/thejoven/plugin-onedrop.git
cd OneDrop
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Load the extension in your browser:
   - Chrome: Open `chrome://extensions/`, enable Developer mode, click "Load unpacked", and select the `build/chrome-mv3-dev` directory
   - Firefox: Open `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on...", and select any file in the `build/firefox-mv2-dev` directory

5. The extension should now be installed and ready for development. Changes to the code will automatically rebuild the extension - refresh the extension in your browser to see the changes.

## 🏗️ Building for Production

To create a production build:

```bash
pnpm build
# or
npm run build
```

To package the extension for store submission:

```bash
pnpm package
# or
npm run package
```

This will create a zip file in the `build` directory that can be submitted to browser extension stores.

## 📁 Project Structure

```
OneDrop/
├── src/                 # Source code
│   ├── background.ts    # Background script
│   ├── content.tsx      # Content script
│   ├── popup.tsx        # Popup UI
│   ├── components/      # Reusable UI components
│   ├── features/        # Feature modules
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API and service functions
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
├── assets/              # Static assets
├── build/               # Build output
└── ...
```