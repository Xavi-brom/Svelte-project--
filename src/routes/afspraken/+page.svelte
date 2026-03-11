<script>
	import { onMount } from 'svelte';

	/**
	 * @typedef {{ id: number, klant: string, datum: string, tijd: string, dienst: string }} Afspraak
	 */

	/** @type {Afspraak[]} */
	let afspraken = [];
	/** @type {Afspraak | null} */
	let geselecteerdeAfspraak = null;
	let loading = true;

	onMount(async () => {
		const res = await fetch('/api/afspraken');
		const data = /** @type {Afspraak[]} */ (await res.json());
		afspraken = data;
		geselecteerdeAfspraak = afspraken[0] ?? null;
		loading = false;
	});
</script>

<section
	class="min-h-screen px-4 py-[clamp(1.75rem,4vw,2.75rem)] text-[#1f1f1f] bg-[radial-gradient(circle_at_10%_10%,#ffd6ba_0%,transparent_40%),radial-gradient(circle_at_90%_90%,#ffeeb7_0%,transparent_35%),#fff8ef]"
>
	<div class="mx-auto max-w-250">
		<div>
			<a
				href="/"
				class="mb-[clamp(0.65rem,1.2vw,0.9rem)] inline-block rounded-full border border-[#e6c7b2] bg-[#fff3e9] px-[clamp(0.7rem,1.3vw,0.9rem)] py-[clamp(0.42rem,0.9vw,0.54rem)] text-[clamp(0.82rem,1vw,0.9rem)] font-semibold text-[#8c350f] no-underline transition duration-150 hover:-translate-y-px hover:border-[#dba382] hover:bg-[#ffe8d7] focus-visible:outline-3 focus-visible:outline-[#e89a6f] focus-visible:outline-offset-2"
			>
				Terug naar home
			</a>
			<p class="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[#c95f2d]">Salon Planner</p>
			<h1 class="mt-1 mb-2 text-[clamp(1.8rem,2.4vw,2.6rem)] font-bold leading-[1.1]">Afspraken Overzicht</h1>
			<p class="m-0 max-w-[52ch] text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed text-[#1f1f1f]/85">
				Bekijk alle geplande afspraken en zie details meteen hieronder.
			</p>
		</div>

		{#if loading}
			<p
				class="mt-[clamp(0.9rem,2vw,1.2rem)] rounded-[0.8rem] border border-[#e9d8cb] bg-white px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.9rem,1.2vw,1rem)]"
			>
				Afspraken laden...
			</p>
		{:else if afspraken.length === 0}
			<p
				class="mt-[clamp(0.9rem,2vw,1.2rem)] rounded-[0.8rem] border border-[#e9d8cb] bg-white px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.9rem,1.2vw,1rem)]"
			>
				Er zijn nog geen afspraken beschikbaar.
			</p>
		{:else}
			<ul
				class="mt-[clamp(1rem,2vw,1.4rem)] grid list-none gap-[clamp(0.75rem,1.8vw,1rem)] p-0 grid-cols-[repeat(auto-fit,minmax(clamp(15rem,28vw,19rem),1fr))]"
			>
				{#each afspraken as afspraak}
					<li
						class={`overflow-hidden rounded-2xl border border-[#eddccf] bg-white shadow-[0_6px_20px_rgba(90,50,20,0.09)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(90,50,20,0.16)] ${geselecteerdeAfspraak?.id === afspraak.id ? 'ring-2 ring-[#d97f50] ring-offset-2 ring-offset-[#fff8ef]' : ''}`}
					>
						<button
							class="block w-full cursor-pointer border-0 bg-transparent px-[clamp(0.85rem,1.8vw,1rem)] py-[clamp(0.8rem,1.8vw,1rem)] text-left text-inherit no-underline"
							type="button"
							aria-pressed={geselecteerdeAfspraak?.id === afspraak.id}
							on:click={() => (geselecteerdeAfspraak = afspraak)}
						>
							<div>
								<p class="m-0 text-[0.75rem] uppercase tracking-[0.06em] text-[#6f6f6f]">Klant</p>
								<h2 class="mt-1 mb-0 text-[clamp(1.05rem,1.8vw,1.25rem)] font-semibold">{afspraak.klant}</h2>
							</div>
							<div class="mt-[clamp(0.7rem,1.8vw,0.9rem)] grid gap-[0.45rem]">
								<p class="m-0 flex justify-between text-[clamp(0.9rem,1.3vw,0.95rem)]">
									<span class="text-[#686868]">Datum</span>{afspraak.datum}
								</p>
								<p class="m-0 flex justify-between text-[clamp(0.9rem,1.3vw,0.95rem)]">
									<span class="text-[#686868]">Tijd</span>{afspraak.tijd}
								</p>
								<p class="m-0 flex justify-between text-[clamp(0.9rem,1.3vw,0.95rem)]">
									<span class="text-[#686868]">Dienst</span>{afspraak.dienst}
								</p>
							</div>
						</button>
						<a
							href={"/afspraken/" + afspraak.id}
							class="ml-[clamp(0.85rem,1.8vw,1rem)] mb-[clamp(0.8rem,1.6vw,1rem)] inline-block rounded-full bg-[#fde1d2] px-[clamp(0.6rem,1.2vw,0.7rem)] py-[0.35rem] text-[0.85rem] font-semibold text-[#8c350f] no-underline"
						>
							Bekijk details
						</a>
					</li>
				{/each}
			</ul>

			{#if geselecteerdeAfspraak}
				<article
					class="mt-[clamp(0.9rem,2vw,1rem)] rounded-2xl border border-[#eddccf] bg-white p-[clamp(0.9rem,1.8vw,1rem)] shadow-[0_8px_22px_rgba(90,50,20,0.10)]"
				>
					<p class="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[#c95f2d]">Gekozen afspraak</p>
					<h3 class="mt-[0.3rem] mb-[0.9rem] text-[clamp(1.12rem,2vw,1.3rem)] font-semibold">
						{geselecteerdeAfspraak.klant}
					</h3>
					<div
						class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(clamp(10.5rem,24vw,12rem),1fr))]"
					>
						<p class="m-0 grid gap-[0.2rem]">
							<span class="text-[0.78rem] uppercase tracking-[0.06em] text-[#6f6f6f]">Datum</span
							>{geselecteerdeAfspraak.datum}
						</p>
						<p class="m-0 grid gap-[0.2rem]">
							<span class="text-[0.78rem] uppercase tracking-[0.06em] text-[#6f6f6f]">Tijd</span
							>{geselecteerdeAfspraak.tijd}
						</p>
						<p class="m-0 grid gap-[0.2rem]">
							<span class="text-[0.78rem] uppercase tracking-[0.06em] text-[#6f6f6f]">Dienst</span
							>{geselecteerdeAfspraak.dienst}
						</p>
					</div>
				</article>
			{/if}
		{/if}
	</div>
</section>
