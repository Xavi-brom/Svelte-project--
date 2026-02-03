<script>
  import Welcome from "$lib/components/Welcome.svelte";
  import Card from "$lib/components/infoCard.svelte";

  const cards = [
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4"
  ];
</script>

<div class="max-w-5xl mx-auto px-4 py-10">
  <Welcome />

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each cards as title}
      <Card title={title} />
    {/each}
  </div>
</div>
