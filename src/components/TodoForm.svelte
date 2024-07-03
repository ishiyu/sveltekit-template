<script lang="ts">
  import { todoStore } from "$lib/client/stores/todoStore";
  import { TodoCreateSchema } from "$lib/schema/TodoSchema";
  import * as v from "valibot";

  const inputTodo = { body: '' };
  const handleSubmit = async () => {
    try {
      const validData = v.parse(TodoCreateSchema, inputTodo);
      await todoStore.add(validData.body);
      // 消しておく
      inputTodo.body = '';
    } catch (e) {
        if (v.isValiError(e)) alert(e.message);
    }
  };
</script>

<form class="my-6 mx-3" on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-col text-sm mb-2">
      <label for="todo" class="font-bold mb-2 text-gray-800">Todo:</label>
      <input
          type="text"
          name="todo"
          bind:value={inputTodo.body}
          placeholder="What's on your mind?"
          class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
      />
  </div>
  <button
      type="submit"
      class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Add</button
  >
</form>
