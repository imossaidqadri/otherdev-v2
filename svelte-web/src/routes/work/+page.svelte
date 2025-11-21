<script lang="ts" context="module">
  import type { PageServerLoad } from './$types';
  import { projects as projectsData } from '$lib/projects';

  export const load: PageServerLoad = async () => {
    return {
      title: "Our Work | OtherDev - Web & Design Solutions",
      description: "Explore our premium web design and development projects. We engineer digital solutions for pioneering brands across real estate, e-commerce, SaaS, and more.",
      projects: projectsData,
      metadata: {
        title: "Our Work | OtherDev - Web & Design Solutions",
        description: "Explore our premium web design and development projects. We engineer digital solutions for pioneering brands across real estate, e-commerce, SaaS, and more.",
        keywords: [
          "web design",
          "web development",
          "portfolio",
          "project showcase",
          "digital solutions",
          "OtherDev",
        ],
        openGraph: {
          title: "Our Work | OtherDev",
          description: "Explore our premium web design and development projects. We engineer digital solutions for pioneering brands.",
          type: "website",
          url: "https://otherdev.com/work",
          images: [{
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "OtherDev Portfolio",
          }]
        },
        twitter: {
          card: "summary_large_image",
          title: "Our Work | OtherDev",
          description: "Premium web design and development portfolio",
          images: ["/og-image.png"],
        },
      }
    };
  };
</script>

<script lang="ts">
  import ProjectCard from '$components/ProjectCard.svelte';

  // This will be populated from the load function
  let { projects } = $props();
</script>

<div class="min-h-screen">
  <main class="container mx-auto px-3 pr-3 md:pr-[8%] lg:pr-[15%] pt-[60px] pb-12">
    <div class="grid grid-cols-12 mb-8">
      <p class="text-[#686868] text-[11px] leading-[14px] font-normal col-span-7 sm:col-span-8 md:col-span-7 lg:col-span-6">
        We work closely with our collaborators to engineer premium web and
        design solutions. Below is a selection showcasing some of our most
        recent work.
      </p>
    </div>

    <div class="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[13px] gap-y-10">
      {#each projects as project (project.id)}
        <ProjectCard
          title={project.title}
          slug={project.slug}
          image={project.image}
          description={project.description}
          variant="work"
          showText={true}
        />
      {/each}
    </div>
  </main>
</div>
