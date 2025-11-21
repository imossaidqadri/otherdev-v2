import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

/** 
 * Multi-tenant middleware (SvelteKit equivalent of Next.js proxy.ts)
 * Detects tenant from domain and adds it to request headers
 * 
 * Domain mapping:
 * - otherdev.com → otherdev
 * - clientname.com → clientname (custom domains)
 * - localhost:3000 → localhost (development)
 */
const tenantHandle: Handle = async ({ event, resolve }) => {
	// Extract domain from request headers (similar to proxy.ts)
	const hostname = event.request.headers.get('host') || '';
	
	// Extract domain (remove port for localhost)
	const domain = hostname.split(':')[0];
	
	// Add tenant domain to locals so it can be used in load functions
	event.locals.domain = domain;
	
	// Create response and add tenant domain header (for tRPC)
	const response = await resolve(event);
	response.headers.set('x-tenant-domain', domain);
	
	return response;
};

// Export the hook sequence (allows for multiple hooks if needed in the future)
export const handle = sequence(tenantHandle);