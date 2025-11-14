import { Profiler } from "react";
import BaseReducer from "./components/BaseReducer";
import BaseSyncExternal from "./components/BaseSyncExternal";
import BasePending from "./components/BasePending";
import BasePedingTabCase from "./components/BasePedingTabCase";
import BaseStore from "./components/BaseStore";

function App() {
  const onRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
  };

  return (
    <Profiler id='test-profiler' onRender={onRender}>
      <BaseReducer />
      <hr />

      <BaseSyncExternal />
      <hr />

      <BasePending />
      <hr />

      <BasePedingTabCase />
      <br />

      <BaseStore />
    </Profiler>
  );
}

export default App;
