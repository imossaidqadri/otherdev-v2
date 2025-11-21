<script lang="ts">
  import type { HTMLLabelAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  
  export let class: string = '';
  
  // Spread remaining attributes to the label element
  let restProps = $props<HTMLLabelAttributes>();
</script>

<label
  class={cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    class
  )}
  {...restProps}
>
  <slot />
</label>