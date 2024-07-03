<script lang="ts">
  import { todoStore } from "$lib/client/stores/todoStore";
  import type { TodoType } from "$lib/schema/TodoSchema";

  export let todo: TodoType;

  function toggleComplete(todoId: number, checked: boolean) {
    if (checked) {
      todoStore.complete(todoId);
    } else {
      todoStore.incomplete(todoId);
    }
  }
</script>

<li
  class="bg-white flex items-center shadow-sm border border-gray-200 rounded-md my-2 mx-3 py-2 px-4"
>
  <input
      name="completed"
      type="checkbox"
      checked={todo.isCompleted}
      on:change={() => toggleComplete(todo.id, !todo.isCompleted)}
      class="mr-2 form-checkbox h-5 w-5"
  />
  <span class={`flex-1 text-gray-800 ${todo.isCompleted ? 'line-through' : ''}`}>{todo.body}</span>
  {#if todo.isCompleted}
      <button
          type="button"
          class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          on:click={() => todoStore.delete(todo.id)}>Delete</button
      >
  {/if}
</li>
