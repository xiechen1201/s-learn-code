import { startTransition } from "react";

export default function Item({ action }) {
  function handleChange(event) {
    startTransition(async () => {
      await action(event.target.value);
    });
  }
  
  return (
    <div className='item'>
      <span>Eras Tour Tickets</span>
      <label htmlFor='name'>Quantity: </label>
      <input type='number' onChange={handleChange} defaultValue={1} min={1} />
    </div>
  );
}
