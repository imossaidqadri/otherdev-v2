<script lang="ts" context="module">
  import type { PageServerLoad } from './$types';

  export const load: PageServerLoad = async () => {
    return {
      title: 'Audio | OtherDev',
      description: 'Listen to our music and audio content.',
      metadata: {
        title: 'Audio | OtherDev',
        description: 'Listen to our music and audio content.',
        keywords: [
          "audio",
          "music",
          "podcast",
          "OtherDev",
        ],
        openGraph: {
          title: "Audio | OtherDev",
          description: "Listen to our music and audio content.",
          type: "website",
          url: "https://otherdev.com/audio",
          images: [{
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "OtherDev Audio",
          }]
        },
        twitter: {
          card: "summary_large_image",
          title: "Audio | OtherDev",
          description: "Listen to our music and audio content.",
          images: ["/og-image.png"],
        },
      }
    };
  };
</script>

<div class="min-h-screen bg-neutral-50">
  <main class="container mx-auto px-3 pt-[72px] pb-12">
    <div class="grid grid-cols-12 gap-[12px]">
      <div class="col-span-12 sm:col-span-10">
        <div class="relative w-full aspect-video rounded-[5px] overflow-hidden bg-stone-200 flex items-center justify-center">
          <p class="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px]">
            Audio content coming soon
          </p>
        </div>
      </div>
    </div>

    <div class="mt-[30px] grid grid-cols-8 sm:grid-cols-12 gap-[6px] sm:gap-[12px]">
      <div class="col-span-7 sm:col-span-8 md:col-span-7 lg:col-span-6 xl:col-span-5">
        <p class="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px]">
          Audio
        </p>
        <p class="mt-[9px] text-black text-[12px] font-normal leading-[14px] tracking-[-0.24px] whitespace-pre-line">
          Our audio content and music releases will be available here soon. 
          Stay tuned for podcasts, music, and other audio experiences.
        </p>
      </div>
    </div>
  </main>
</div>