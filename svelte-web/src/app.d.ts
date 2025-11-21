// See https://kit.svelte.dev/docs/types#app
import type { RequestEvent } from '@sveltejs/kit';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		
		interface Locals {
			domain: string;
		}
	}
}

export {};