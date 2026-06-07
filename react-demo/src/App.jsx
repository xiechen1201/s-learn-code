import BaseReducer from "./components/BaseReducer";
import BaseSyncExternal from "./components/BaseSyncExternal";
import BasePending from "./components/BasePending";
import BasePedingTabCase from "./components/BasePedingTabCase";
import BaseStore from "./components/BaseStore"
import BaseState from "./components/BaseState";

function App() {
  return (
    <div>
      <BaseReducer />
      <hr />

      <BaseSyncExternal />
      <hr />

      <BasePending />
      <hr />

      <BasePedingTabCase />
      <br />

      <BaseStore />
      <br />

      <BaseState />
    </div>
  );
}

export default App;
