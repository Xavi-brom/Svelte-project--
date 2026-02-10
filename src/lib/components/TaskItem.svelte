<script>
  export let task;
  export let markDone;
</script>

<div class="flex items-center justify-between gap-3">
  <span class="text-sm font-medium text-gray-800">{task.title}</span>
  <button
    type="button"
    class="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100"
    on:click={() => markDone(task.id)}
  >
    Afgerond
  </button>
</div>
