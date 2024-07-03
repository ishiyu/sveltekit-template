import { fetchApi } from "$lib/client/utils/ky";
import type { TodoCreateType, TodoType } from "$lib/schema/TodoSchema";

export const TodoResource = {
  async get() {
    const promise = fetchApi.get("todos", {});
    return await promise.json<TodoType[]>();
  },

  async create(todo: TodoCreateType) {
    console.log(todo);

    const promise = fetchApi.post("todos", { body: JSON.stringify(todo) });
    return await promise.json<TodoType>();
  },

  async update(todo: TodoType) {
    const promise = fetchApi.put(`todos/${todo.id}`, {
      body: JSON.stringify(todo),
    });
    return await promise.json<TodoType>();
  },

  async complete(id: number) {
    const promise = fetchApi.put(`todos/${id}/complete`);
    return await promise.json<TodoType>();
  },

  async incomplete(id: number) {
    const promise = fetchApi.put(`todos/${id}/incomplete`);
    return await promise.json<TodoType>();
  },

  async delete(id: number) {
    const promise = fetchApi.delete(`todos/${id}`);
    return await promise.json<TodoType>();
  },
};
