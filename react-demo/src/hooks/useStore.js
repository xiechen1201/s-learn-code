import { useSyncExternalStore } from "react";

export function useStore(key = "data", defaultValue = "") {
  function subscribe(callback) {
    window.addEventListener("storage", () => {
      console.log("storage changed");
      callback();
    });

    return () => window.removeEventListener("storage", callback);
  }

  function getSnapshot() {
    return (
      (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))) ||
      defaultValue
    );
  }

  function setStore(value) {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  }

  const res = useSyncExternalStore(subscribe, getSnapshot);

  return [res, setStore];
}
