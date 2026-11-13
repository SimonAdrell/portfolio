import type { Reroute } from '@sveltejs/kit/hooks';
import { deLocalizeUrl } from '#lib/paraglide/runtime.js';

// /sv/… renders the same route as /…
export const reroute: Reroute = ({ url }) => deLocalizeUrl(url).pathname;
