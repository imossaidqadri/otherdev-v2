<script lang="ts" context="module">
  import type { PageServerLoad } from './$types';
  import { projects } from '$lib/projects';

  export const load: PageServerLoad = async ({ params }) => {
    const project = projects.find(p => p.slug === params.slug);

    if (!project) {
      return {
        status: 404,
        error: new Error('Project not found')
      };
    }

    return {
      project,
      relatedProjects: projects.filter(p => p.id !== project.id).slice(0, 13),
      metadata: {
        title: `${project.title} | OtherDev Portfolio`,
        description: project.description,
        keywords: [
          "web design",
          "web development",
          "project",
          project.title,
          "OtherDev",
        ],
        openGraph: {
          title: project.title,
          description: project.description,
          type: "article",
          url: `https://otherdev.com/work/${params.slug}`,
          images: [{
            url: project.image,
            width: 1200,
            height: 630,
            alt: project.title,
          }]
        },
        twitter: {
          card: "summary_large_image",
          title: project.title,
          description: project.description,
          images: [project.image],
        },
      }
    };
  };

  export const prerender = true;
</script>

<script lang="ts">
  import ProjectCard from '$components/ProjectCard.svelte';
  import { browser } from '$app/environment';
  
  // These will be populated from the load function
  let { project, relatedProjects } = $props();
  
  if (!project) {
    // If running client-side and project is not found, we would have been redirected
    // This is just a safeguard
    if (browser) {
      // In a real app, you might want to use goto function to redirect to 404 page
    }
  }
</script>

{#if project}
  <div class="min-h-screen relative">
    <main class="px-3">
      <div class="pt-[69px]">
        <h1 class="text-[22.7px] leading-[28px] tracking-[-0.48px] font-normal text-black mb-[29px]">
          {project.title}
        </h1>

        {#if project.url}
          <a
            href={`https://${project.url}`}
            target="_blank"
            rel="noopener noreferrer"
            class="text-[11.1px] leading-[14px] tracking-[-0.24px] font-normal text-black mb-[24px] inline-block hover:underline"
          >
            {project.url}
          </a>
        {/if}

        <p class="text-[11.1px] sm:text-[11.3px] leading-[14px] tracking-[-0.24px] font-normal text-black mb-[64px] max-w-[315px] sm:max-w-[532px]">
          {project.description}
        </p>
      </div>

      {#if project.media && project.media.length > 0}
        <div class="bg-neutral-200 rounded-[5px] mb-[35.37px] md:mr-[15.3%]">
          <div class="flex flex-col gap-[90px] md:px-[145px] md:max-w-none lg:max-w-[803px] lg:mx-auto lg:px-0 py-[78px]">
            {#each project.media as mediaUrl, index}
              <img
                key={mediaUrl + index}
                src={mediaUrl}
                alt={`${project.title} - Image ${index + 1}`}
                class="w-full h-auto object-contain rounded-[5px] px-6"
              />
            {/each}
          </div>
        </div>
      {/if}

      <div class="mb-[10.63px]">
        <h2 class="text-[11.4px] leading-[14px] tracking-[-0.24px] font-normal text-[#686868]">
          Related Projects
        </h2>
      </div>

      <div class="overflow-x-auto overflow-y-clip pb-[6px] mb-[57px] -mx-3 scrollbar-hide">
        <div class="flex gap-[12px] px-3">
          {#each relatedProjects as relatedProject}
            <div class="flex-shrink-0 w-[320px] sm:w-[600px]">
              <ProjectCard
                title={relatedProject.title}
                slug={relatedProject.slug}
                image={relatedProject.image}
                description={relatedProject.description}
                variant="work"
                showText={true}
              />
            </div>
          {/each}
        </div>
      </div>

      <a
        href="/work"
        class="inline-flex bg-neutral-200 rounded-[5px] h-[21px] px-[6px] items-center mb-[34.66px]"
      >
        <span class="text-[10.3px] leading-[14px] tracking-[-0.24px] font-normal text-[#686868]">
          Back to Work
        </span>
      </a>
    </main>
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Project Not Found</h1>
      <p class="mt-2">The project you're looking for doesn't exist.</p>
      <a href="/work" class="mt-4 inline-block text-blue-500 hover:underline">← Back to Work</a>
    </div>
  </div>
{/if}