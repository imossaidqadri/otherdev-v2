import { createTRPCSvelteClient } from '@trpc/svelte-query';
import type { AppRouter } from '$server/routers';

export const trpc = createTRPCSvelteClient<AppRouter>({
  url: '/api/trpc',
});