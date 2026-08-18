#!/usr/bin/env node

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

async function main() {
  const { THEMES } = await loadBeautifulMermaid();
  const themes = Object.keys(THEMES);

  console.log('Available Beautiful-Mermaid Themes:\n');
  themes.forEach((theme, i) => {
    console.log(`${String(i + 1).padStart(2)}. ${theme}`);
  });

  console.log(`\nTotal: ${themes.length} themes`);
  console.log('\nUsage:');
  console.log('  node scripts/render.mjs --input diagram.mmd --theme <theme-name> --output output.svg');
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
