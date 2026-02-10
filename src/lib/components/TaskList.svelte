<script>
  import TaskItem from './TaskItem.svelte';

  let tasks = [
    { id: 1, title: 'Boodschappen doen', done: false },
    { id: 2, title: 'Huiswerk maken', done: false },
    { id: 3, title: 'Hond uitlaten', done: false },
    { id: 4, title: 'De planten water geven', done: false }
  ];

  const markDone = (/** @type {number} */ id) => {
    tasks = tasks.map((t) => (t.id === id ? { ...t, done: true } : t));
  };

  $: openTasks = tasks.filter((t) => !t.done);
</script>

{#if openTasks.length > 0}
  <div class="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">
    <div class="border-b border-gray-100 px-4 py-3">
      <h2 class="text-base font-semibold text-gray-900">Taken</h2>
      <p class="text-sm text-gray-500">Open taken</p>
    </div>
    <ul class="divide-y divide-gray-100">
    {#each openTasks as task (task.id)}
      <li class="px-4 py-3">
        <TaskItem {task} {markDone} />
      </li>
    {/each}
    </ul>
  </div>
{:else}
  <div class="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm">
    <p class="text-sm font-medium text-gray-700">Alles is gedaan!</p>
  </div>
{/if}
