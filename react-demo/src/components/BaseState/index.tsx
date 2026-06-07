import { useState } from "react";

function BaseState() {
  
  const [toasts, setToasts] = useState<string[]>([]);
  console.log("组件更新了",toasts)

  function handleClickBtn() {
    const id = new Date().toString();
    setToasts([...toasts, id]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter(el => el !== id));
  }

  return (
    <div>
      <button onClick={handleClickBtn}>新增</button>
      {
        toasts.map(el=> <li>{el}</li>)
      }
    </div>
  );
}

export default BaseState;
