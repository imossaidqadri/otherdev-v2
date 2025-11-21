<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';

	let isOpen = $state(false);
	let contactDialogOpen = $state(false);

	onMount(() => {
		if (browser) {
			const saved = sessionStorage.getItem('mobileMenuOpen');
			if (saved === 'true') {
				isOpen = true;
			}
		}
	});

	// Update sessionStorage when menu state changes
	$effect(() => {
		if (browser) {
			sessionStorage.setItem('mobileMenuOpen', isOpen.toString());
		}
	});

	function handleContactClick() {
		contactDialogOpen = true;
	}

	// Function to check if current path matches a route
	function isActivePath(path) {
		return $page.url.pathname === path;
	}

	// Svelte 5 derived state for pathname
	let pathname = $derived($page.url.pathname);
</script>

<nav class="fixed top-[15px] left-0 right-0 z-[60] px-3 pointer-events-none">
	<!-- Mobile Navigation -->
	<div class="sm:hidden flex items-center gap-[6px] w-full pointer-events-auto relative z-50">
		{#if !isOpen}
			<div class="opacity-100 scale-100 transition-all duration-200">
				<a 
					href="/"
					data-slot="nav-item"
					class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[75px] {pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}"
				>
					other dev
				</a>
			</div>
		{/if}

		{#if isOpen}
			<div class="flex items-center gap-1.5 flex-1 opacity-100 transition-opacity duration-200">
				<div class="opacity-100 translate-x-0 transition-all duration-300" style="transition-delay: 0.1s;">
					<a
						href="/work"
						data-slot="nav-item"
						class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[52px] {pathname.startsWith('/work') ? 'text-foreground' : 'text-muted-foreground'}"
					>
						work
					</a>
				</div>
				<!-- Commented out audio link similar to Next.js
				<div class="opacity-100 translate-x-0 transition-all duration-300" style="transition-delay: 0.15s;">
					<a
						href="/audio"
						data-slot="nav-item"
						class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[52px] {pathname.startsWith('/audio') ? 'text-foreground' : 'text-muted-foreground'}"
					>
						audio
					</a>
				</div>
				-->
				<div class="opacity-100 translate-x-0 transition-all duration-300" style="transition-delay: 0.2s;">
					<a
						href="/about"
						data-slot="nav-item"
						class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[52px] {pathname.startsWith('/about') ? 'text-foreground' : 'text-muted-foreground'}"
					>
						about
					</a>
				</div>
				<div class="opacity-100 translate-x-0 transition-all duration-300" style="transition-delay: 0.25s;">
					<button
						onclick={handleContactClick}
						data-slot="nav-item"
						class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[62px] text-muted-foreground"
					>
						contact
					</button>
				</div>
				<div class="opacity-100 translate-x-0 transition-all duration-300" style="transition-delay: 0.3s;">
					<a
						href="https://wa.me/923156893331?text=Hi!%20I%20found%20you%20through%20otherdev.com%20and%20would%20love%20to%20discuss%20a%20project."
						target="_blank"
						rel="noopener noreferrer"
						data-slot="nav-item"
						class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[62px] text-muted-foreground"
					>
						whatsapp
					</a>
				</div>
			</div>
		{/if}

		<!-- Hamburger/X Button -->
		<button
			onclick={() => isOpen = !isOpen}
			data-slot="nav-item"
			class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-7 text-foreground ml-auto"
			aria-label="Toggle menu"
		>
			{#if isOpen}
				<X size={16} strokeWidth={1.5} />
			{:else}
				<Menu size={16} strokeWidth={1.5} />
			{/if}
		</button>
	</div>

	<!-- Tablet/Desktop Navigation -->
	<div class="hidden sm:flex items-center gap-1.5 pointer-events-auto">
		<a
			href="/"
			data-slot="nav-item"
			class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[75px] {pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}"
		>
			other dev
		</a>
		<a
			href="/work"
			data-slot="nav-item"
			class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[75px] {pathname.startsWith('/work') ? 'text-foreground' : 'text-muted-foreground'}"
		>
			work
		</a>
		<!-- Commented out audio link similar to Next.js
		<a
			href="/audio"
			data-slot="nav-item"
			class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[75px] {pathname.startsWith('/audio') ? 'text-foreground' : 'text-muted-foreground'}"
		>
			audio
		</a>
		-->
		<a
			href="/about"
			data-slot="nav-item"
			class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[75px] {pathname.startsWith('/about') ? 'text-foreground' : 'text-muted-foreground'}"
		>
			about
		</a>
		<button
			onclick={handleContactClick}
			data-slot="nav-item"
			class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[75px] text-muted-foreground"
		>
			contact
		</button>
		<a
			href="https://wa.me/923156893331?text=Hi!%20I%20found%20you%20through%20otherdev.com%20and%20would%20love%20to%20discuss%20a%20project."
			target="_blank"
			rel="noopener noreferrer"
			data-slot="nav-item"
			class="flex items-center justify-center rounded-md backdrop-blur-sm bg-stone-200/70 text-[11px] font-normal leading-tight transition-colors hover:text-foreground h-7 w-[75px] text-muted-foreground"
		>
			whatsapp
		</a>
	</div>

	<!-- Backdrop -->
	{#if isOpen}
		<div class="sm:hidden fixed inset-0 z-30 -backdrop-blur-lg pointer-events-none" />
	{/if}

	<!-- Contact Dialog -->
	{#if contactDialogOpen}
		<!-- We'll implement the contact dialog later -->
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white p-6 rounded-lg max-w-md w-full">
				<h3 class="text-lg font-bold mb-4">Contact Us</h3>
				<p>Implementation for contact dialog will go here.</p>
				<div class="mt-4 flex justify-end">
					<button
						onclick={() => contactDialogOpen = false}
						class="bg-gray-200 px-4 py-2 rounded"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	{/if}
</nav>