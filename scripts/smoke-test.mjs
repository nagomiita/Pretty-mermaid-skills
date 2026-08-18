#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderMermaid, renderMermaidAscii, THEMES } from 'beautiful-mermaid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const fixtures = [
  'flowchart.mmd',
  'sequence.mmd',
  'state.mmd',
  'class.mmd',
  'er.mmd',
];

for (const fixture of fixtures) {
  const source = readFileSync(join(root, 'assets', 'example_diagrams', fixture), 'utf8');
  const svg = await renderMermaid(source);
  const ascii = renderMermaidAscii(source);

  assert.match(svg, /^<svg\b/, `${fixture}: SVG output was not generated`);
  assert.ok(ascii.trim().length > 0, `${fixture}: ASCII output was empty`);
}

const regression = `flowchart LR
    A["Order<br/>52333 rows"] ==>|"issued 51398"| B["Purchase"]
    A -.->|"only 935"| A`;

const regressionSvg = await renderMermaid(regression);
const regressionAscii = renderMermaidAscii(regression);

// The ASCII renderer pads edge labels with box-drawing glyphs instead of spaces
// (e.g. `issued┄51398`, `only─935`), so a literal space never appears inside a
// label. Normalize U+2500-U+257F to spaces before matching label text.
const flattenAscii = (value) => value.replace(/[\u2500-\u257F]/g, ' ').replace(/\s+/g, ' ');
const regressionAsciiFlat = flattenAscii(regressionAscii);

assert.ok(!regressionSvg.includes('&quot;Order'), 'quoted node label leaked into SVG output');
assert.ok(!regressionSvg.includes('&lt;br'), '<br/> leaked into SVG output');
assert.ok(!regressionAscii.includes('"Order'), 'quoted node label leaked into ASCII output');
assert.ok(!regressionAscii.includes('<br'), '<br/> leaked into ASCII output');
assert.ok(regressionAscii.includes('Order'), 'ASCII output lost the Order label');
assert.ok(regressionAscii.includes('52333 rows'), 'ASCII output lost the multiline label content');
assert.ok(regressionAsciiFlat.includes('issued 51398'), 'ASCII output lost the primary edge label');
assert.ok(regressionAsciiFlat.includes('only 935'), 'ASCII output lost the sibling edge label');

// Assert the floor rather than an exact count: an upstream release that adds a
// theme should not fail this suite.
assert.ok(Object.keys(THEMES).length >= 15, 'expected at least 15 built-in themes');
assert.ok(THEMES['zinc-light'], 'zinc-light theme is missing');

console.log(`Smoke tests passed: ${fixtures.length} example diagrams + issue #3 regression case`);
