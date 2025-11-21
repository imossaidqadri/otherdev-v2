<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="min-h-screen">
	<Header />
	<main class="container mx-auto px-3 pr-3 md:pr-[8%] lg:pr-[15%] pt-[60px] pb-12">
		{@render children()}
		<Footer />
	</main>
</div>