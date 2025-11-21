<script lang="ts" context="module">
  import { CanvasClient } from '@od-canvas/sdk';
  import type { PageServerLoad } from './$types';

  // Initialize Canvas client
  const canvas = new CanvasClient({
    baseUrl: import.meta.env.VITE_CANVAS_API_URL || 'https://canvas.otherdev.com',
    apiKey: import.meta.env.VITE_CANVAS_API_KEY
  });

  export const load: PageServerLoad = async ({ params }) => {
    let post = null;
    try {
      post = await canvas.getPublicDocument(parseInt(params.slug));
    } catch (e) {
      console.error('Failed to fetch blog post:', e);
    }

    return {
      post,
      metadata: post ? {
        title: `${post.title} | Blog | OtherDev`,
        description: post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      } : {
        title: 'Blog Post Not Found | OtherDev',
        description: 'The blog post you are looking for does not exist or has been removed.',
      }
    };
  };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';

  // This will be populated from the load function
  let { post } = $props();
</script>

{#if post}
  <article class="max-w-2xl mx-auto px-4 py-12">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-neutral-900 mb-4">{post.title}</h1>
      <p class="text-sm text-neutral-600">
        {
          new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }
      </p>
    </header>

    <div class="prose prose-lg w-full content"
         data-sveltekit-preload-data="hover">
      {@html post.content}
    </div>

    <footer class="mt-12 pt-8 border-t border-neutral-200">
      <a href="/blog" class="text-blue-600 hover:text-blue-800 font-medium">
        ← Back to all posts
      </a>
    </footer>
  </article>
{:else}
  <div class="container mx-auto px-4 py-12 max-w-3xl">
    <div class="bg-red-50 border border-red-200 rounded-lg p-6">
      <h2 class="text-red-800 font-semibold mb-2">Blog post not found</h2>
      <p class="text-red-600 mb-4">
        The blog post you are looking for does not exist or has been removed.
      </p>
      <a
        href="/blog"
        class="text-blue-600 hover:underline"
      >
        ← Back to blog
      </a>
    </div>
  </div>
{/if}
