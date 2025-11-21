import { type RequestHandler } from './$types';
import { createContext } from '$server/trpc';
import { appRouter } from '$server/routers';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const GET: RequestHandler = async (event) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req: event.request,
    createContext: async () => createContext({ event }),
  });

  return response;
};

export const POST: RequestHandler = async (event) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req: event.request,
    createContext: async () => createContext({ event }),
  });

  return response;
};