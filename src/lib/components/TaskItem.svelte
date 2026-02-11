<script>
  export let task;
  export let remove;
</script>

<div class="flex items-center justify-between gap-3">
  <span class="text-sm font-medium text-gray-800">{task.title}</span>
  <button
    type="button"
    class="rounded-md border px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
    on:click={() => remove(task.id)}
  >
    Gedaan
  </button>
</div>
