import { dev } from '$app/environment';

// Fully static in production: anchors and scrolling need no JavaScript.
// Kept on in dev, where it drives hot reload of styles.
export const csr = dev;
