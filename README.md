# Electron React Desktop App

This repository contains an Electron-based desktop application built with React. It is compatible with **macOS** and **Windows**.

## 🛠️ Features

- Cross-platform support (macOS & Windows)
- Electron + React integration
- Hot reloading for faster development
- Optimized production build

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **yarn** (Optional but recommended) - [Install](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
$ git clone https://github.com/psuedo97/electron-assignment
$ cd electron-assignment
```

### 2. Install dependencies

Using `npm`:

```bash
$ npm install
```

Or using `yarn` (recommended for better performance):

```bash
$ yarn install
```

### 3. Run the application

Start the Electron app in development mode:

```bash
$ npm run dev
# or
$ yarn dev
```

The Electron window will open automatically.

## 🏗️ Building for Production

To package the app for your platform:

### On macOS:

```bash
$ npm run package
# or
$ yarn package --mac
```

The output will be in the `dist` directory.

### On Windows:

```bash
$ npm run package
# or
$ yarn package --win
```

The packaged app will be available in the `dist` folder.

## 📁 Directory Structure

```
.
├── public/            # Static assets
├── src/              # Source code
│    ├── components/  # React components
│    ├── main/        # Electron main process
│    └── renderer/    # Electron renderer process (React UI)
├── package.json      # Project metadata and scripts
└── README.md         # Project documentation
```

## 📖 Scripts

- `dev`: Run the app in development mode
- `build`: Create a production build
- `build:mac`: Package the app for macOS
- `build:win`: Package the app for Windows

## 🐛 Troubleshooting

1. **Node.js version issues:** Ensure Node.js is v18 or higher.
2. **Permissions error (macOS):** Allow execution of the app via System Preferences.
3. **Windows Defender warning:** Mark the app as a trusted source.

