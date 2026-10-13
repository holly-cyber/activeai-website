// Fails the build if the built site contains wording the brief rules out
// (retired names and terms, prospect names, manipulative language, methodology
// tells, prices). See CLAUDE.md "Content rules".
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const banned = [
  [/\bAMS\b/, 'old score abbreviation'],
  [/Athlete Momentum Score/i, 'old score name'],
  [/Brand Momentum Score/i, 'wrong score name: it is the Behavioural Momentum Score'],
  [/Momentum Unlocks?/i, 'retired term: the deck calls them moments'],
  [/\b(1[0-9]|[2-9][0-9])\s+moments\b|\b(ten|eleven|twelve)\s+moments\b/i, 'more moments than the nine public ones'],
  [/\d+\s*%\s*conversion|conversion (rate )?of \d/i, 'per-moment conversion rate'],
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

// Figures that look like a rule break but are allowed, each with its reason.
const allowed = [
  [/£48\.2K/g, 'revenue lift on the illustrative partner dashboard (October deck, slide 12)'],
];

const text = (html) =>
  allowed.reduce(
    (t, [re]) => t.replace(re, ' '),
    html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '),
  );

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
