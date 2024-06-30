<script>
  import { todos } from '$lib/client/stores/todoStore';
  import Todo from '../components/Todo.svelte';
  import TodoForm from '../components/TodoForm.svelte';
</script>

<main>
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">Todo App</h1>
  <TodoForm />
  {#each $todos as todo}
      <Todo {todo} index={todo.id} />
  {/each}
</main>
