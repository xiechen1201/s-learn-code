import { useStore } from "../hooks/useStore";

function BaseSyncExternal() {
  const [res, setStore] = useStore("data", "123");

  return (
    <div>
      <button onClick={()=> setStore(new Date().getTime())}>更新 Store</button>
      <p>当前：{res}</p>
    </div>
  );
}

export default BaseSyncExternal;
