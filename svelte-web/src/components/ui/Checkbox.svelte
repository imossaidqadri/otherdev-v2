<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  
  export let checked = $state(false);
  export let class: string = '';
  export let disabled: boolean = false;
  
  // Spread remaining attributes to the input element
  let restProps = $props<HTMLInputAttributes>();
  
  function toggle() {
    if (!disabled) {
      checked = !checked;
    }
  }
</script>

<input
  type="checkbox"
  class={cn(
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    class
  )}
  checked={checked}
  disabled={disabled}
  on:change={toggle}
  {...restProps}
/>