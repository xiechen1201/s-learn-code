self.onmessage = ({ data }) => {
  const view = new Uint8Array(data);
  console.log(`buffer value before worker modification: ${view[0]}`);
  view[0] += 1;
  self.postMessage(null);
};
