import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { CanvasClient } from '@od-canvas/sdk';

// Initialize Canvas client
const canvas = new CanvasClient({
  baseUrl: import.meta.env.VITE_CANVAS_API_URL || 'https://canvas.otherdev.com',
  apiKey: import.meta.env.VITE_CANVAS_API_KEY
});

/**
 * Content router for fetching blog posts from Canvas CMS
 */
export const contentRouter = router({
  /**
   * Get all blog posts
   */
  getBlogPosts: publicProcedure
    .input(
      z.object({
        limit: z.number().optional().default(10),
        page: z.number().optional().default(1),
      })
    )
    .query(async ({ input }) => {
      try {
        const documents = await canvas.getPublicDocuments(parseInt(import.meta.env.VITE_CANVAS_PROJECT_ID || '4')) ?? [];
        // Sort by creation date, newest first
        const sortedDocs = documents
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice((input.page - 1) * input.limit, input.page * input.limit);

        return {
          docs: sortedDocs,
          totalDocs: documents.length,
          limit: input.limit,
          totalPages: Math.ceil(documents.length / input.limit),
          page: input.page,
          pagingCounter: (input.page - 1) * input.limit + 1,
          hasPrevPage: input.page > 1,
          hasNextPage: input.page < Math.ceil(documents.length / input.limit),
          prevPage: input.page > 1 ? input.page - 1 : null,
          nextPage: input.page < Math.ceil(documents.length / input.limit) ? input.page + 1 : null
        };
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        return {
          docs: [],
          totalDocs: 0,
          limit: input.limit,
          totalPages: 0,
          page: input.page,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null
        };
      }
    }),

  /**
   * Get a single blog post by ID
   */
  getBlogPost: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const post = await canvas.getPublicDocument(parseInt(input.id));
        return post;
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
        return null;
      }
    }),
});