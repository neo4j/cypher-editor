import { get, writable } from "svelte/store";

type HistoryStoreEvents = "EXECUTED" | "STEP_BACK" | "STEP_FORWARD";

export function historyStore(initValue: string = "", stackSize: number = 20) {
  let stackIndex: number | null = null;
  let stack = [];
  let editBuffer = "";

  const store = writable<string>(initValue);

  const send = (event: HistoryStoreEvents): void => {
    switch (event) {
      case "EXECUTED":
        stack.push(get(store));
        stack = stack.slice(-1 * stackSize);
        stackIndex = null;
        store.set("");
        break;
      case "STEP_BACK":
        if (stackIndex === null && stack.length) {
          editBuffer = get(store);
          stackIndex = stack.length;
        }
        if (stackIndex > 0) {
          stackIndex--;
          store.set(stack[stackIndex]);
        }
        break;
      case "STEP_FORWARD":
        if (stackIndex < stack.length - 1 && stackIndex !== null) {
          stackIndex++;
          store.set(stack[stackIndex]);
        } else if (stackIndex === stack.length - 1) {
          stackIndex = null;
          store.set(editBuffer);
        }
        break;
      default:
        break;
    }
  };

  return { subscribe: store.subscribe, set: store.set, send };
}
