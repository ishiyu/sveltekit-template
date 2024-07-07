// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
  };
}

export type {};
