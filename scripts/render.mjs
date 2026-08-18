#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';

async function loadBeautifulMermaid() {
  try {
    return await import('beautiful-mermaid');
  } catch (error) {
    console.error('[beautiful-mermaid] Dependency is not installed.');
    console.error('Run `npm ci --ignore-scripts` in the Pretty-mermaid-skills directory, then try again.');
    console.error(`Cause: ${error.message}`);
    process.exit(1);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    input: null,
    output: null,
    format: 'svg',
    theme: null,
    bg: '#FFFFFF',
    fg: '#27272A',
    font: 'Inter',
    transparent: false,
    useAscii: false,
    paddingX: 5,
    paddingY: 5,
    boxBorderPadding: 1,
  };

  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    const val = args[i + 1];

    switch (key) {
      case '--input': case '-i': opts.input = val; i++; break;
      case '--output': case '-o': opts.output = val; i++; break;
      case '--format': case '-f': opts.format = val; i++; break;
      case '--theme': case '-t': opts.theme = val; i++; break;
      case '--bg': opts.bg = val; i++; break;
      case '--fg': opts.fg = val; i++; break;
      case '--line': opts.line = val; i++; break;
      case '--accent': opts.accent = val; i++; break;
      case '--muted': opts.muted = val; i++; break;
      case '--surface': opts.surface = val; i++; break;
      case '--border': opts.border = val; i++; break;
      case '--font': opts.font = val; i++; break;
      case '--transparent': opts.transparent = true; break;
      case '--use-ascii': opts.useAscii = true; break;
      case '--padding-x': opts.paddingX = parseInt(val); i++; break;
      case '--padding-y': opts.paddingY = parseInt(val); i++; break;
      case '--box-border-padding': opts.boxBorderPadding = parseInt(val); i++; break;
      case '--help': case '-h':
        console.log(`Usage: node render.mjs --input <file> [options]\n\nOptions:\n  -i, --input <file>       Input Mermaid file (.mmd) [required]\n  -o, --output <file>      Output file (default: stdout)\n  -f, --format <fmt>       Output format: svg | ascii (default: svg)\n  -t, --theme <name>       Theme name (e.g. tokyo-night, dracula)\n      --bg <hex>           Background color\n      --fg <hex>           Foreground color\n      --line <hex>         Edge/connector color\n      --accent <hex>       Arrow heads and highlights color\n      --muted <hex>        Secondary text color\n      --surface <hex>      Node fill tint color\n      --border <hex>       Node stroke color\n      --font <name>        Font family (default: Inter)\n      --transparent        Transparent background (SVG only)\n      --use-ascii          Pure ASCII instead of Unicode (ASCII only)\n      --padding-x <n>      Horizontal spacing (ASCII only, default: 5)\n      --padding-y <n>      Vertical spacing (ASCII only, default: 5)\n      --box-border-padding <n>  Padding inside node boxes (ASCII only, default: 1)`);
        process.exit(0);
    }
  }

  if (!opts.input) {
    console.error('Error: --input is required. Use --help for usage.');
    process.exit(1);
  }

  if (!existsSync(opts.input)) {
    console.error(`Error: Input file not found: ${opts.input}`);
    process.exit(1);
  }

  return opts;
}

async function main() {
  const opts = parseArgs();
  const { renderMermaid, renderMermaidAscii, THEMES } = await loadBeautifulMermaid();
  const input = readFileSync(opts.input, 'utf8');

  if (opts.format === 'ascii') {
    const ascii = renderMermaidAscii(input, {
      useAscii: opts.useAscii,
      paddingX: opts.paddingX,
      paddingY: opts.paddingY,
      boxBorderPadding: opts.boxBorderPadding,
    });
    if (opts.output) {
      writeFileSync(opts.output, ascii);
      console.log(`ASCII diagram saved to ${opts.output}`);
    } else {
      console.log(ascii);
    }
  } else {
    const theme = opts.theme ? THEMES[opts.theme] : undefined;
    const colors = theme || {
      bg: opts.bg,
      fg: opts.fg,
      ...(opts.line && { line: opts.line }),
      ...(opts.accent && { accent: opts.accent }),
      ...(opts.muted && { muted: opts.muted }),
      ...(opts.surface && { surface: opts.surface }),
      ...(opts.border && { border: opts.border }),
    };

    const svg = await renderMermaid(input, {
      ...colors,
      font: opts.font,
      transparent: opts.transparent,
    });

    if (opts.output) {
      writeFileSync(opts.output, svg);
      console.log(`SVG diagram saved to ${opts.output}`);
    } else {
      console.log(svg);
    }
  }
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
