import { usePersonStore } from "../../store/fullname";

function BaseStore() {
  const age = usePersonStore((state) => state.age);
  const addAge = usePersonStore((state) => state.addAge);
  const firstName = usePersonStore((state) => state.firstName);
  const updateFirstName = usePersonStore((state) => state.updateFirstName);
  const reset = usePersonStore((state) => state.reset);

  return (
    <div>
      <p>{firstName}/{age}</p>
      <button onClick={() => updateFirstName("John")}>change</button>
      <button onClick={addAge}>add</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}

export default BaseStore;
