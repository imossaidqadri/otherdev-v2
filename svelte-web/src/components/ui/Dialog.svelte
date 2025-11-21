<script lang="ts">
  import { cn } from '$lib/utils';

  export let open = $state(false);
  export let class: string = '';

  function toggle() {
    open = !open;
  }

  function closeModal() {
    open = false;
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        class="fixed inset-0 transition-opacity"
        on:click={closeModal}
      >
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        class={cn(
          'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full',
          class
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <slot {open} {toggle} {closeModal} />
      </div>
    </div>
  </div>
{/if}