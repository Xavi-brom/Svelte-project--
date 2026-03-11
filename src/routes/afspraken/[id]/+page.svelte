<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	/**
	 * @typedef {{ id: number, klant: string, datum: string, tijd: string, dienst: string }} Afspraak
	 */

	/** @type {Afspraak | null} */
	let afspraak = null;
	let afspraakId = '';
	let loading = true;
	let notFound = false;

	onMount(async () => {
		loading = true;
		notFound = false;

		try {
			const id = get(page).params.id;
			if (!id) {
				afspraak = null;
				notFound = true;
				return;
			}

			afspraakId = id;
			const res = await fetch(`/api/afspraken/${id}`);
			if (res.ok) {
				afspraak = await res.json();
				if (!afspraak) {
					notFound = true;
				}
			} else {
				afspraak = null;
				notFound = true;
			}
		} catch (error) {
			afspraak = null;
			notFound = true;
		} finally {
			loading = false;
		}
	});
</script>

<section
	class="min-h-screen px-4 py-[clamp(1.75rem,4vw,2.75rem)] text-[#1f1f1f] bg-[radial-gradient(circle_at_10%_10%,#ffd6ba_0%,transparent_40%),radial-gradient(circle_at_90%_90%,#ffeeb7_0%,transparent_35%),#fff8ef]"
>
	<div class="mx-auto flex max-w-230 flex-col gap-[clamp(1.2rem,3vw,1.8rem)]">
		<header class="flex flex-col gap-[0.6rem]">
			<a
				href="/afspraken"
				class="inline-flex w-fit items-center gap-2 rounded-full border border-[#e6c7b2] bg-[#fff3e9] px-[clamp(0.7rem,1.3vw,0.9rem)] py-[clamp(0.42rem,0.9vw,0.54rem)] text-[clamp(0.82rem,1vw,0.9rem)] font-semibold text-[#8c350f] no-underline transition duration-150 hover:-translate-y-px hover:border-[#dba382] hover:bg-[#ffe8d7] focus-visible:outline-3 focus-visible:outline-[#e89a6f] focus-visible:outline-offset-2"
			>
				Terug naar afspraken
			</a>
			<p class="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[#c95f2d]">Salon Planner</p>
			<div class="flex flex-wrap items-end justify-between gap-3">
				<div>
					<h1 class="m-0 text-[clamp(1.9rem,2.7vw,2.8rem)] font-bold leading-[1.05]">
						Afspraak details
					</h1>
					<p class="mt-[0.4rem] max-w-[52ch] text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed text-[#1f1f1f]/85">
						Een overzichtelijke samenvatting van alle gegevens voor deze afspraak.
					</p>
				</div>
				{#if afspraakId}
					<span
						class="inline-flex items-center gap-2 rounded-full border border-[#eddccf] bg-white px-[0.85rem] py-[0.35rem] text-[0.85rem] font-semibold text-[#7a2c0c]"
					>
						Afspraak #{afspraakId}
					</span>
				{/if}
			</div>
		</header>

		{#if loading}
			<div
				class="rounded-2xl border border-[#e9d8cb] bg-white px-[clamp(1rem,2vw,1.4rem)] py-[clamp(0.9rem,2vw,1.2rem)] text-[clamp(0.95rem,1.2vw,1.05rem)] shadow-[0_10px_22px_rgba(90,50,20,0.08)]"
			>
				Afspraak laden...
			</div>
		{:else if notFound}
			<div
				class="rounded-2xl border border-[#e9d8cb] bg-white px-[clamp(1rem,2vw,1.4rem)] py-[clamp(0.9rem,2vw,1.2rem)] text-[clamp(0.95rem,1.2vw,1.05rem)] shadow-[0_10px_22px_rgba(90,50,20,0.08)]"
			>
				<p class="m-0 text-[0.95rem] font-semibold text-[#7a2c0c]">Afspraak niet gevonden.</p>
				<p class="mt-[0.35rem] text-[#1f1f1f]/75">
					Controleer het afspraaknummer of ga terug naar het overzicht.
				</p>
			</div>
		{:else if afspraak}
			<article
				class="rounded-3xl border border-[#eddccf] bg-white p-[clamp(1rem,2.2vw,1.6rem)] shadow-[0_16px_34px_rgba(90,50,20,0.12)]"
			>
				<div class="flex flex-col gap-[0.6rem] border-b border-[#f2e2d7] pb-[clamp(0.8rem,2vw,1.1rem)]">
					<p class="m-0 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#c95f2d]">
						Geselecteerde afspraak
					</p>
					<h2 class="m-0 text-[clamp(1.4rem,2.2vw,1.8rem)] font-semibold">
						{afspraak.klant}
					</h2>
				</div>
				<dl
					class="mt-[clamp(0.9rem,2.2vw,1.2rem)] grid gap-[clamp(0.7rem,1.6vw,0.95rem)] grid-cols-[repeat(auto-fit,minmax(clamp(12rem,28vw,15rem),1fr))]"
				>
					<div
						class="rounded-2xl border border-[#f0dfd3] bg-[#fff7f1] px-[clamp(0.8rem,1.6vw,1rem)] py-[clamp(0.7rem,1.4vw,0.9rem)]"
					>
						<dt class="text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#a7572f]">
							Klant
						</dt>
						<dd class="mt-[0.35rem] text-[clamp(1rem,1.4vw,1.12rem)] font-semibold">
							{afspraak.klant}
						</dd>
					</div>
					<div
						class="rounded-2xl border border-[#f0dfd3] bg-[#fff7f1] px-[clamp(0.8rem,1.6vw,1rem)] py-[clamp(0.7rem,1.4vw,0.9rem)]"
					>
						<dt class="text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#a7572f]">
							Datum
						</dt>
						<dd class="mt-[0.35rem] text-[clamp(1rem,1.4vw,1.12rem)] font-semibold">
							{afspraak.datum}
						</dd>
					</div>
					<div
						class="rounded-2xl border border-[#f0dfd3] bg-[#fff7f1] px-[clamp(0.8rem,1.6vw,1rem)] py-[clamp(0.7rem,1.4vw,0.9rem)]"
					>
						<dt class="text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#a7572f]">
							Tijd
						</dt>
						<dd class="mt-[0.35rem] text-[clamp(1rem,1.4vw,1.12rem)] font-semibold">
							{afspraak.tijd}
						</dd>
					</div>
					<div
						class="rounded-2xl border border-[#f0dfd3] bg-[#fff7f1] px-[clamp(0.8rem,1.6vw,1rem)] py-[clamp(0.7rem,1.4vw,0.9rem)]"
					>
						<dt class="text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#a7572f]">
							Dienst
						</dt>
						<dd class="mt-[0.35rem] text-[clamp(1rem,1.4vw,1.12rem)] font-semibold">
							{afspraak.dienst}
						</dd>
					</div>
				</dl>
				<div
					class="mt-[clamp(0.9rem,2vw,1.2rem)] rounded-2xl border border-[#eddccf] bg-white px-[clamp(0.8rem,1.6vw,1rem)] py-[clamp(0.7rem,1.4vw,0.9rem)]"
				>
					<p class="m-0 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-[#6f6f6f]">
						Notities
					</p>
					<p class="mt-[0.35rem] text-[clamp(0.95rem,1.2vw,1.05rem)] text-[#1f1f1f]/75">
						Geen notities toegevoegd.
					</p>
				</div>
			</article>
		{/if}
	</div>
</section>
