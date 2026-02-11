import { writable } from 'svelte/store';

/**
 * @typedef {{ id: string, title: string }} Task
 */

/** @type {import('svelte/store').Writable<Task[]>} */
export const tasks = writable([]);

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36);
};

/** @param {string} title */
export const addTask = (title) => {
  const trimmed = title.trim();
  if (!trimmed) return;

  tasks.update((items) => [
    ...items,
    {
      id: createId(),
      title: trimmed
    }
  ]);
};

/** @param {string} id */
export const removeTask = (id) => {
  tasks.update((items) => items.filter((task) => task.id !== id));
};
