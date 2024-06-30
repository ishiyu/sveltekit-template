import { writable } from "svelte/store";

export type Todo = {
  id: number;
  body: string;
  completed: boolean;
  createdAt: number;
};

let id = 0;

function createStore() {
  const todos = writable([] as Todo[]);

  return {
    // $ で監視できるように subscribe を継承
    subscribe: todos.subscribe,

    add(body: string) {
      todos.update((todos) => {
        const newTodos = [
          ...todos,
          { id: ++id, body, completed: false, createdAt: Date.now() },
        ];
        return newTodos;
      });
    },
    delete(id: number) {
      todos.update((todos) => todos.filter((todo) => todo.id !== id));
    },
    complete(id: number) {
      todos.update((todos) => {
        let index = -1;
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id === id) {
            index = i;
            break;
          }
        }
        if (index !== -1) {
          todos[index].completed = !todos[index].completed;
        }
        return todos;
      });
    },
  };
}

export const todoStore = createStore();
