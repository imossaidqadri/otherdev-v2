import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Create tRPC context
 * In SvelteKit, we need to access the domain from the event locals
 */
export const createTRPCContext = async (opts: { event: RequestEvent }) => {
  // Extract domain from SvelteKit locals (set in hooks.server.ts)
  const domain = opts.event.locals.domain || opts.event.request.headers.get('x-tenant-domain') || 'otherdev.com';

  return {
    domain,
  };
};

// Export as createContext for the API handler
export const createContext = createTRPCContext;

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;