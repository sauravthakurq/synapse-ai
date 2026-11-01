# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] - 2026-03-26

The initial release of the SYNAPSE AI platform, incorporating core intelligent multi-agent workspaces, autonomous media generation, and interactive learning environments.

### Highlights

- **Discussion TTS** — Voice playback during discussion phase with per-agent voice assignment, supporting all TTS providers including browser-native
- **Immersive Mode** — Full-screen view with speech bubbles, auto-hide controls, and keyboard navigation
- **Discussion buffer-level pause** — Freeze text reveal without aborting the AI stream
- **Keyboard shortcuts** — Comprehensive roundtable controls: T/V/Esc/Space/M/S/C
- **Whiteboard enhancements** — Pan, zoom, auto-fit, history, and auto-save
- **New providers** — ElevenLabs TTS, Grok/xAI for LLM, image, and video
- **Server-side generation** — Media and TTS generation on the server
- **1.25x playback speed** — Configurable playback pacing controls
- **Multi-platform integrations** — Generate workspaces from Slack, Telegram, and 20+ messaging integrations
- **Vercel one-click deploy** — Production-ready cloud deployment configuration

### Security

- Fixed SSRF and credential forwarding via client-supplied baseUrl
- Resolved server-side API key routing in chat route handlers

### Testing

- Vitest unit testing infrastructure
- Playwright e2e testing framework
