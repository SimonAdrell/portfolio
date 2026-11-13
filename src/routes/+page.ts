import { dev } from '$app/env';

// Fully static in production: anchors and scrolling need no JavaScript.
// Kept on in dev, where it drives hot reload of styles.
export const csr = dev;

// Builds sv/index.html, so GitHub Pages serves /sv/ (the URL Paraglide links to).
export const trailingSlash = 'always';
