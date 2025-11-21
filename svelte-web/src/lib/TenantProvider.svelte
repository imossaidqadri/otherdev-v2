<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let children: import('svelte').Snippet;
  let domain = $state('otherdev.com');

  onMount(async () => {
    if (browser) {
      // Get domain from window.location on client-side
      const hostname = window.location.hostname;
      // Remove port if present (e.g., localhost:3000 -> localhost)
      const cleanDomain = hostname.split(':')[0];
      domain = cleanDomain;
    }
  });
  
  // Make domain available to child components
  export { domain };
</script>

{#if browser}
  {@render children()}
{:else}
  {@render children()}
{/if}