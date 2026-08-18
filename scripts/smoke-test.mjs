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

assert.ok(!regressionSvg.includes('&quot;Order'), 'quoted node label leaked into SVG output');
assert.ok(!regressionSvg.includes('&lt;br'), '<br/> leaked into SVG output');
assert.ok(!regressionAscii.includes('"Order'), 'quoted node label leaked into ASCII output');
assert.ok(!regressionAscii.includes('<br'), '<br/> leaked into ASCII output');
assert.ok(regressionAscii.includes('Order'), 'ASCII output lost the Order label');
assert.ok(regressionAscii.includes('52333 rows'), 'ASCII output lost the multiline label content');
assert.ok(regressionAscii.includes('issued 51398'), 'ASCII output lost the primary edge label');
assert.ok(regressionAscii.includes('only 935'), 'ASCII output lost the sibling edge label');

assert.equal(Object.keys(THEMES).length, 15, 'expected 15 built-in themes');
assert.ok(THEMES['zinc-light'], 'zinc-light theme is missing');

console.log(`Smoke tests passed: ${fixtures.length} example diagrams + issue #3 regression case`);
