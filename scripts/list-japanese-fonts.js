/**
 * Script to list all Japanese fonts available in next/font/google
 * Run with: cmd /c node scripts/list-japanese-fonts.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

// Path to next/font/google type definitions
const fontTypesPath = path.join(
  process.cwd(),
  'node_modules',
  'next',
  'dist',
  'compiled',
  '@next',
  'font',
  'dist',
  'google',
  'index.d.ts',
);

try {
  const content = fs.readFileSync(fontTypesPath, 'utf-8');

  // Extract all exported font function names
  const fontMatches = content.match(/export declare function (\w+)/g);

  if (fontMatches) {
    const allFonts = fontMatches
      .map(match => match.replace('export declare function ', ''))
      .sort();

    // Known Japanese font patterns/names

    const japanesePatterns = [
      /_JP($|_)/,
      /^Zen_/,
      /^Kaisei_/,
      /^Yuji_/,
      /^Shippori_/,
      /^Sawarabi_/,
      /^Kosugi/,
      /^Klee_/,
      /^Hina_/,
      /^M_PLUS/,
      /^BIZ_UD/,
      /^Noto.*_JP/,
      /^DotGothic/,
      /^Hachi_Maru/,
      /^Kiwi_Maru/,
      /^Potta_/,
      /^Reggae_/,
      /^RocknRoll_/,
      /^Stick$/,
      /^Dela_Gothic/,
      /^Yusei_/,
      /^New_Tegomin/,
      /^Mochiy_/,
      /^Rampart_/,
      /^Murecho/,
      /^WDXL_Lubrifont/,
    ];

    const japaneseFonts = allFonts.filter(font =>
      japanesePatterns.some(pattern => pattern.test(font)),
    );

    console.log('\n=== Japanese Fonts in next/font/google ===\n');
    console.log(`Found ${japaneseFonts.length} Japanese fonts:\n`);
    japaneseFonts.forEach((font, i) => {
      console.log(`${(i + 1).toString().padStart(2)}. ${font}`);
    });

    console.log('\n=== Import Statement ===\n');
    console.log(
      `import {\n  ${japaneseFonts.join(',\n  ')}\n} from 'next/font/google';`,
    );
  }
} catch (error) {
  console.error('Error reading font types:', error.message);
  console.log('\nAlternative: Check https://fonts.google.com/?subset=japanese');
}
