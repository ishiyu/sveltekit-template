<script>
  import { todoStore } from '$lib/client/stores/todoStore';
  import { onMount } from "svelte";
  import Todo from '../components/Todo.svelte';
  import TodoForm from '../components/TodoForm.svelte';

  onMount(() => {
    todoStore.load();
  });
</script>

<main>
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">Todo App</h1>
  <TodoForm />
  {#each $todoStore as todo}
      <Todo {todo} />
  {/each}
</main>
