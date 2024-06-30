import { writable } from "svelte/store";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
};

export const todos = writable([] as Todo[]);

let id = 0;

export const addTodo = (text: string) => {
  todos.update((todos) => {
    const newTodos = [
      ...todos,
      { id: ++id, text, completed: false, createdAt: Date.now() },
    ];
    return newTodos;
  });
};

export const deleteTodo = (id: number) => {
  todos.update((todos) => todos.filter((todo) => todo.id !== id));
};

export const completeTodo = (id: number) => {
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
};
