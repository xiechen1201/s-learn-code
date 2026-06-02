function App() {
  return (
    <>
      <button
        type='button'
        onClick={() => {
          throw new Error("Sentry Test Error");
        }}>
        打破这个世界
      </button>
    </>
  );
}

export default App;
