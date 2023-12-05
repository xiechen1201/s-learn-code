class User {
  name: string;
  age: number;
  gender: "男" | "女" = "男";
  pid?: string;

  constructor(name: string, age: number, pid?: string) {
    this.name = name;
    this.age = age;
    this.pid = pid;
  }
}