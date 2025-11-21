<script lang="ts">
  import type { HTMLDivAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  
  // Spread remaining attributes to the card element
  let restProps = $props<HTMLDivAttributes>();
</script>

<div
  class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', $props.class)}
  {...restProps}
>
  <slot />
</div>