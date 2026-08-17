/**
 * PENDING CLIENT INPUT REPORT.
 * Keystone 7A's "pending client input" pattern: fields the client still owes are
 * scaffolded with guards and light up automatically once business.ts is filled.
 * This prints the outstanding list so the owner always has a live checklist and
 * nothing quietly ships as a placeholder.
 */
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';

const C = { yellow: '\x1b[33m', green: '\x1b[32m', dim: '\x1b[2m', off: '\x1b[0m' };

export function pending() {
  const src = fs.readFileSync('src/data/business.ts', 'utf8');
  const found = [...src.matchAll(/^\s*(\w+):\s*PENDING as/gm)].map((m) => m[1]);
  // Nested objects declare their own PENDING fields; catch those too.
  const all = [...new Set(found)];

  console.log(`\n${C.dim}──${C.off} Pending client input`);
  if (!all.length) {
    console.log(`   ${C.green}all business facts supplied${C.off}`);
    return [];
  }
  console.log(`   ${C.yellow}${all.length} field(s) still needed from the client:${C.off}`);
  console.log(`   ${all.join(', ')}`);
  console.log(
    `   ${C.dim}Guarded everywhere — no placeholder is rendered. Fill src/data/business.ts to light them up.${C.off}`
  );
  return all;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) pending();
