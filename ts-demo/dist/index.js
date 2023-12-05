let key = Symbol("sayHi");

class User {
  constructor(name, age, pid) {
    this.gender = "男";
    this.name = name;
    this.age = age;
    this.pid = pid;
    this[key] = "sayHi";
  }
}

console.log(new User("xiechen", 22, "1234567"));
