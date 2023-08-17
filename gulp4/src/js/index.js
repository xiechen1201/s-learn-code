[1, 2, 3, 4, 5].forEach((el) => {
  console.log(el);
});

const person = {
  name: "张三",
  age: 20
};
new Proxy(person, {
  get(key) {
    return person[key];
  }
});
