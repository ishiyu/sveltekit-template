import { writable } from "svelte/store";

const STORAGE_KEY = "svelte-template-storage";

function createStore() {
  const storage = writable(
    {} as Record<string, string | number | boolean | object>,
  );

  return {
    // $ で監視できるように subscribe を継承
    subscribe: storage.subscribe,

    load() {
      const json = window.localStorage.getItem(STORAGE_KEY);
      if (json !== null) {
        storage.set(JSON.parse(json));
      } else {
        storage.set({});
      }
    },

    set(key: string, value: string | number | boolean | object) {
      storage.update((s) => {
        s[key] = value;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
        return s;
      });
    },
  };
}

export const localStorage = createStore();
