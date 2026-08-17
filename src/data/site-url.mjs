// Single source of truth for the canonical origin.
// Keystone 7A: every absolute schema @id reads from this. Change it in ONE place.
// Vercel: set PUBLIC_SITE_URL in Project Settings → Environment Variables to override.
export const SITE_URL =
  process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.qualitykonnectionconstruction.com';
