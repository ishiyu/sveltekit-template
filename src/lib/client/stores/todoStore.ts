import type { TodoCreateType, TodoType } from "$lib/schema/TodoSchema";
import { writable } from "svelte/store";
import { TodoResource } from "../resources/TodoResource";

function createStore() {
  const todos = writable([] as TodoType[]);

  return {
    // $ で監視できるように subscribe を継承
    subscribe: todos.subscribe,

    load() {
      TodoResource.get().then((dbTodos) => {
        todos.update(() => {
          return [...dbTodos];
        });
      });
    },
    // 追加処理
    async add(body: string) {
      const inputTodo: TodoCreateType = { body };
      const todo = await TodoResource.create(inputTodo);
      todos.update((todos) => {
        const newTodos = [...todos, todo];
        return newTodos;
      });
    },

    // 削除処理
    async delete(id: number) {
      await TodoResource.delete(id);
      todos.update((todos) => todos.filter((todo) => todo.id !== id));
    },

    // 完了処理
    async complete(id: number) {
      await TodoResource.complete(id);
      todos.update((todos) => {
        const todo = todos.find((todo_1) => todo_1.id === id);
        if (todo) {
          todo.isCompleted = true;
        }
        return todos;
      });
    },

    // 未完了処理
    async incomplete(id: number) {
      await TodoResource.incomplete(id);
      todos.update((todos) => {
        const todo = todos.find((todo_1) => todo_1.id === id);
        if (todo) {
          todo.isCompleted = false;
        }
        return todos;
      });
    },
  };
}

export const todoStore = createStore();
