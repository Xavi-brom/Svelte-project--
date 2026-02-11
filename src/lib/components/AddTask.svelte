<script>
  import { addTask } from '../../stores/taskStore.js';

  let title = '';
  let error = '';

  const handleSubmit = () => {
    if (!title.trim()) {
      error = 'Voer een taak in.';
      return;
    }

    addTask(title);
    title = '';
    error = '';
  };
</script>

<div class="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">
  <form class="flex flex-col gap-3 px-4 py-4" on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col gap-2">
      <label class="text-sm font-semibold text-gray-800" for="task-title">Nieuwe taak</label>
      <input
        id="task-title"
        class="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        type="text"
        placeholder="Bijv. Afspraak maken"
        bind:value={title}
        on:input={() => {
          if (error && title.trim()) error = '';
        }}
      />
    </div>

    {#if error}
      <p class="text-xs font-medium text-red-600">{error}</p>
    {/if}

    <button
      type="submit"
      class="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
    >
      Taak toevoegen
    </button>
  </form>
</div>
