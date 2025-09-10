export async function updateQuantity(newQuantity) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newQuantity);
    }, 2000);
  });
}
