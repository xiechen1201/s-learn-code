import { useReducer } from "react";

function BaseReducer() {
  function reducer(state, action) {
    if (action.type === "add_age") {
      return {
        ...state,
        age: state.age + 1
      };
    }
    return state;
  }

  const [state, dispatch] = useReducer(reducer, { age: 0 });

  function handleClickBtn() {
    dispatch({ type: "add_age" });
  }

  return (
    <div>
      <button onClick={handleClickBtn}>点击更新值</button>
      <p>Hello! You are {state.age}.</p>
    </div>
  );
}

export default BaseReducer;
