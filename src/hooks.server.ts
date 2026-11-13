import type { Handle } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '#lib/paraglide/server.js';

// Sets the request's locale for message functions and <html lang>; reroute (hooks.ts) handles the path.
export const handle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ locale }) =>
		resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		})
	);
