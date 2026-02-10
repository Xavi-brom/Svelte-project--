<script>
  import Welcome from "$lib/components/Welcome.svelte";
  import Card from "$lib/components/infoCard.svelte";
  import TaskList from "$lib/components/TaskList.svelte";
</script>

<div class="flex flex-col items-center justify-center mt-5 gap-3">
  <Welcome />

  <div class="mt-8">
      <Card />
  </div>

  <div class="mt-8 mb-8">
    <TaskList />
  </div>
</div>
