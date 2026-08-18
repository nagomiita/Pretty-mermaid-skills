<div align="center">

# Pretty-Mermaid Skills

![fLEWT5x.png](https://iili.io/fLEWT5x.png)

Render Mermaid diagrams as beautiful SVGs or ASCII art

Ultra-fast, fully themeable, zero DOM dependencies. Built for the AI era.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%5E20.17%20%7C%7C%20%3E%3D22.9-brightgreen)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/nagomiita/Pretty-mermaid-skills?style=social)](https://github.com/nagomiita/Pretty-mermaid-skills)

**English** ｜ [中文](README_CN.md)

</div>

## Introduction
A Mermaid diagram rendering skill for AI, supporting both SVG and ASCII output formats to make your documentation more vivid.

This fork hardens dependency handling: runtime scripts never install packages automatically, runtime dependencies are pinned in `package-lock.json`, npm lifecycle scripts are disabled, and newly published package versions are excluded from dependency resolution for seven days.

## ✨ Features

- 📊 **Multi-format Support**: SVG and ASCII rendering export
- 🎨 **Rich Themes**: 15 built-in themes for different scenarios
- 📈 **Full Diagram Support**: Flowchart, Sequence, State, Class, ER and more
- ⚡ **High Performance**: Batch parallel rendering
- 📚 **Ready to Use**: Complete templates and detailed documentation
- 🔒 **Hardened Dependency Handling**: No runtime `npm install`; reproducible locked dependencies; lifecycle scripts disabled; 7-day release-age gate

### Supported Themes
| Light Themes | Dark Themes | Other |
| :--- | :--- | :--- |
| zinc-light | zinc-dark | nord |
| tokyo-night-light | tokyo-night | nord-light |
| cappuccin-latte | tokyo-night-storm | dracula |
| github-light | cappuccin-mocha | one-dark |
| solarized-light | github-dark | |
| | solarized-dark | |

## 🤖 AI Assistant Integration

Seamlessly integrates with the following AI coding environments:

- **Claude Code**
- **Cursor**
- **Gemini CLI**
- **Antigravity**
- **OpenCode**
- **Codex**
- **qoder**

## 🚀 Installation

### One-click Skill Install
```bash
npx skills add https://github.com/nagomiita/Pretty-mermaid-skills --skill pretty-mermaid
```

### Install Locked Dependencies
Run this once from the installed skill directory:
```bash
cd Pretty-mermaid
npm ci --ignore-scripts
```

`npm ci` installs exactly the versions recorded in `package-lock.json`. `--ignore-scripts` and the repository `.npmrc` prevent npm lifecycle scripts from running during dependency installation.

### Verify Installation
```bash
node scripts/themes.mjs
```

> **Security note**: The rendering scripts do not invoke npm and do not install dependencies automatically. The repository requires npm 11.10.0+ and uses `min-release-age=7`, so dependency resolution excludes versions published less than seven days ago. `engine-strict=true` prevents unsupported Node/npm versions from silently bypassing this policy.

## 🔐 Dependency Security Policy

The repository-local `.npmrc` applies these controls:

```ini
ignore-scripts=true
audit=true
fund=false
save-exact=true
engine-strict=true
min-release-age=7
```

`min-release-age` is primarily a protection for dependency resolution and lockfile updates. Normal reproducible installs should continue to use `npm ci` with the committed lockfile. Do not casually override the seven-day gate when updating dependencies; review urgent security exceptions explicitly.

## 📖 Quick Start

### List Available Themes
```bash
node scripts/themes.mjs
```

### Render Single Diagram
```bash
node scripts/render.mjs \
  --input diagram.mmd \
  --output output.svg \
  --theme tokyo-night
```

### Batch Render
```bash
node scripts/batch.mjs \
  --input-dir ./diagrams \
  --output-dir ./output \
  --theme dracula
```

## 📂 Examples

Check the 5 template files in `assets/example_diagrams/`:
- `flowchart.mmd` - Flowchart
- `sequence.mmd` - Sequence Diagram
- `state.mmd` - State Diagram
- `class.mmd` - Class Diagram
- `er.mmd` - ER Diagram

## 📚 Documentation
See [SKILL.md](SKILL.md) for detailed usage guide.

## ⚙️ Requirements
- Node.js `^20.17.0 || >=22.9.0`
- npm 11.10.0+

## 📄 License
MIT License

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=nagomiita/Pretty-mermaid-skills&type=timeline&legend=top-left)](https://www.star-history.com/#nagomiita/Pretty-mermaid-skills&type=timeline&legend=top-left)

## 🙏 Acknowledgments
Based on [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid)
