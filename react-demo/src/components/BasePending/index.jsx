import { useState, useTransition } from "react";
import { updateQuantity } from "../../api";

import Item from "./Item"
import Total from "./Total";

function BasePending() {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const updateQuantityAction = async (newQuantity) => {
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <div>
      <Item action={updateQuantityAction} />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  );
}

export default BasePending;
