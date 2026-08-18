<div align="center">

# Pretty-Mermaid Skills

![fLEWT5x.png](https://iili.io/fLEWT5x.png)

Render Mermaid diagrams as beautiful SVGs or ASCII art

Ultra-fast, fully themeable, zero DOM dependencies. Built for the AI era.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/nagomiita/Pretty-mermaid-skills?style=social)](https://github.com/nagomiita/Pretty-mermaid-skills)

**English** ｜ [中文](README_CN.md)

</div>

## Introduction
A Mermaid diagram rendering skill for AI, supporting both SVG and ASCII output formats to make your documentation more vivid.

This fork hardens dependency handling: runtime scripts never install packages automatically, runtime dependencies are pinned in `package-lock.json`, and installation is an explicit step.

## ✨ Features

- 📊 **Multi-format Support**: SVG and ASCII rendering export
- 🎨 **Rich Themes**: 15 built-in themes for different scenarios
- 📈 **Full Diagram Support**: Flowchart, Sequence, State, Class, ER and more
- ⚡ **High Performance**: Batch parallel rendering
- 📚 **Ready to Use**: Complete templates and detailed documentation
- 🔒 **Hardened Dependency Handling**: No runtime `npm install`; reproducible locked dependencies

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

`npm ci` installs exactly the versions recorded in `package-lock.json`. `--ignore-scripts` prevents npm lifecycle scripts from running during dependency installation.

### Verify Installation
```bash
node scripts/themes.mjs
```

> **Security note**: The rendering scripts do not invoke npm and do not install dependencies automatically. If dependencies are missing, they exit with instructions to run the explicit install command above.

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
- Node.js 18+
- npm with `npm ci` support

## 📄 License
MIT License

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=nagomiita/Pretty-mermaid-skills&type=timeline&legend=top-left)](https://www.star-history.com/#nagomiita/Pretty-mermaid-skills&type=timeline&legend=top-left)

## 🙏 Acknowledgments
Based on [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid)
