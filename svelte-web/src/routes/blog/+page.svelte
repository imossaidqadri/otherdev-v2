<script lang="ts" context="module">
  import { CanvasClient } from '@od-canvas/sdk';
  import type { PageServerLoad } from './$types';

  // Initialize Canvas client
  const canvas = new CanvasClient({
    baseUrl: import.meta.env.VITE_CANVAS_API_URL || 'https://canvas.otherdev.com',
    apiKey: import.meta.env.VITE_CANVAS_API_KEY
  });

  export const load: PageServerLoad = async () => {
    let posts: any[] = [];
    try {
      const documents = await canvas.getPublicDocuments(parseInt(import.meta.env.VITE_CANVAS_PROJECT_ID || '4')) ?? [];
      posts = documents
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }

    return {
      posts,
      metadata: {
        title: "Blog | OtherDev",
        description: "Latest articles and insights from OtherDev",
      }
    };
  };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';

  // This will be populated from the load function
  let { posts } = $props();

  if (!posts) {
    posts = [];
  }
</script>

{#if posts && posts.length > 0}
  <div class="relative px-4 py-4">
    <div class="flex sticky top-0">
      <h1 class="text-sm mb-2 bg-neutral-200 rounded-md p-2 cursor-pointer hover:bg-neutral-300">
        <span class="font-bold">OD</span> / Blog
      </h1>
    </div>
    <p class="text-neutral-600 text-xs mb-8">
      {posts.length} {posts.length === 1 ? 'post' : 'posts'}{' '}•{' '}Powered by 
      <a href="https://canvas.otherdev.com" class="text-blue-600 hover:underline ml-1">Canvas</a>
    </p>

    <div class="grid gap-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {#each posts as post (post.id)}
        <article class="md:border duration-300 hover:bg-neutral-200 rounded-md hover:rounded-xl md:p-4 hover:shadow-lg transition-shadow">
          <h2 class="text-sm font-bold mb-2">
            <a href="/blog/{post.id}" class="text-neutral-900 hover:text-blue-600">
              {post.title}
            </a>
          </h2>
          <p class="text-sm text-neutral-600 mb-4">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p class="text-neutral-700 line-clamp-2">
            {post.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
          </p>
          <a
            href="/blog/{post.id}"
            class="inline-block mt-4 text-neutral-600 hover:text-neutral-800 text-xs font-medium"
          >
            Read More →
          </a>
        </article>
      {/each}
    </div>
  </div>
{:else}
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">Blog</h1>
    <p class="text-gray-600">No blog posts found.</p>
  </div>
{/if}
