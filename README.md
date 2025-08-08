# BF6 Companion App

Desktop highlight manager and clip exporter for Battlefield 6.

## Setup

1. Install Node.js and npm.
2. Install ffmpeg (see ffmpeg project for details and licensing).
3. `npm install`
4. Copy `env.example` to `.env` and adjust paths.

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Package (Windows NSIS)

```bash
npm run package
```

## Zip Repository

```bash
npm run zip
```

## Auto Update

Uses electron-updater with a generic provider. Update URLs must be configured before distribution.

## FFmpeg Licensing

Ensure compliance with ffmpeg's LGPL/GPL when distributing. Provide source or link as required.

## Privacy

Tokens stored securely via system keychain. Telemetry and voice recording disabled by default.
