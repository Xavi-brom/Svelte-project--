<script>
  import TaskItem from './TaskItem.svelte';
  import { tasks, removeTask } from '../../stores/taskStore.js';

  /** @param {string} id */
  const handleRemove = (id) => {
    removeTask(id);
  };
</script>

{#if $tasks.length > 0}
  <div class="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">
    <div class="border-b border-gray-100 px-4 py-3">
      <h2 class="text-base font-semibold text-gray-900">Taken</h2>
      <p class="text-sm text-gray-500">Open taken</p>
    </div>
    <ul class="divide-y divide-gray-100">
    {#each $tasks as task (task.id)}
      <li class="px-4 py-3">
        <TaskItem {task} remove={handleRemove} />
      </li>
    {/each}
    </ul>
  </div>
{:else}
  <div class="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm">
    <p class="text-sm font-medium text-gray-700">Alles is gedaan!</p>
  </div>
{/if}
