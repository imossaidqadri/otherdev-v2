<script lang="ts">
  import type { Project, PlaylistOrImage } from '$lib/types';

  export let title: string;
  export let slug: string;
  export let image: string;
  export let description: string | undefined = undefined;
  export let variant: 'home' | 'work' | 'broll' = 'home';
  export let showText: boolean = false;
  export let isPlaylistOrImage: boolean = false;
</script>

<div class="flex flex-col gap-[13px]">
  <a
    href={variant === 'broll' || isPlaylistOrImage ? (slug ?? '#') : `/work/${slug}`}
    class="block group"
  >
    <div class={`
      relative aspect-square overflow-hidden rounded-[5px] transition-all flex items-center justify-center
      ${variant === 'home' ? 'bg-stone-200 hover:shadow-lg' : ''}
      ${variant === 'work' ? 'bg-stone-200' : ''}
      ${variant === 'broll' ? '' : ''}
    `}>
      <div class={`
        relative w-full h-full bg-stone-200
        ${variant === 'home' ? 'px-[24px] py-[36px]' : ''}
        ${variant === 'work' ? 'px-[50px] py-[60px]' : ''}
        ${variant === 'broll' ? '' : ''}
      `}>
        <img
          src={image}
          alt={title}
          class={`
            transition-transform duration-300 object-contain
            ${variant === 'home' ? 'group-hover:scale-[1.02] p-6' : ''}
            ${variant === 'work' ? 'group-hover:scale-[0.99] p-6' : ''}
            ${variant === 'broll' ? 'object-cover' : ''}
          `}
        />
      </div>
    </div>
  </a>

  {#if showText}
    <a
      href={`/work/${slug}`}
      class="box-border flex flex-col items-start pb-[3px] pt-0 px-0 relative shrink-0"
    >
      <div class="box-border flex flex-col items-start mb-[-3px] relative shrink-0 w-full">
        <div class="flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[11.4px] text-black tracking-[-0.24px] w-full">
          <p class="leading-[14px] whitespace-pre-wrap">{title}</p>
        </div>
      </div>
      <div class="box-border flex flex-col items-start mb-[-3px] pb-0 pt-[9px] px-0 relative shrink-0 w-full">
        <div class="flex flex-col font-normal justify-center leading-[14px] not-italic relative shrink-0 text-[#686868] text-[11.1px] tracking-[-0.24px] w-full whitespace-pre-wrap">
          <p class="mb-0">{description}</p>
        </div>
      </div>
    </a>
  {/if}
</div>