// Fails the build if the built site contains wording the brief rules out
// (old score name, public unlock counts, prospect names, manipulative language,
// methodology tells). See CLAUDE.md "Content rules".
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const banned = [
  [/\bAMS\b/, 'old score abbreviation'],
  [/Athlete Momentum Score/i, 'old score name'],
  [/\bnine\b|\b9\s+(momentum\s+)?(unlocks|triggers)/i, 'public unlock count'],
  [/Acenta|England Athletics/i, 'prospect name'],
  [/\bexploit|\bhook(ed|s)?\b|dopamine|neurochemical|loss aversion/i, 'manipulative language'],
  [/Fogg|B\s*=\s*M\s*[×x*]\s*A|\bNobel\b|\bMIT\b/i, 'methodology or name-dropping'],
  [/£\s?\d/, 'price'],
];

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const text = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');

let failed = false;
for (const file of walk('dist')) {
  const body = text(readFileSync(file, 'utf8'));
  for (const [re, why] of banned) {
    const m = body.match(re);
    if (m) {
      failed = true;
      console.error(`✗ ${file}: ${why} ("${m[0]}")`);
    }
  }
}
if (failed) process.exit(1);
console.log('✓ Content rules pass');
