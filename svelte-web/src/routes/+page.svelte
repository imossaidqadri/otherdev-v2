<script lang="ts">
  import { shuffle } from '$lib/utils';
  import { projects } from '$lib/projects';
  import { playlistsAndImages } from '$lib/playlistsAndImages';
  import ProjectCard from '$components/ProjectCard.svelte';

  // Combine and shuffle the data
  const data = shuffle([...playlistsAndImages, ...projects]);
</script>

<div class="min-h-screen">
  <div class="grid grid-cols-12 mb-8">
    <p class="text-[#686868] text-[11px] leading-[14px] font-normal col-span-7 sm:col-span-8 md:col-span-7 lg:col-span-6">
      otherdev produces digital platforms for pioneering creatives.
      <br />
      Based in Karachi City, we are a full-service web development and
      design studio specializing in the fashion and design fields.
    </p>
  </div>
  <div class="mt-[30px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[12px] gap-y-[15px]">
    {#each data as project (project.id)}
      <ProjectCard
        title={project.title}
        slug={project.slug ?? project.url}
        image={project.image}
        description={project.description}
        variant={project.isPlaylistOrImage ? 'broll' : 'home'}
        {isPlaylistOrImage}
      />
    {/each}
  </div>
</div>