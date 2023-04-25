function Person(name, age) {
  this.name = name;
  this.age = age;
  this.getNameAndAge = function () {
    console.log(`  Name: ${this.name},
  Age: ${this.age}`);
  };
}

function Car(brand, model, year, number) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.number = number;
  this.setOwner = function (owner) {
    if (owner.age >= 18) {
      this.owner = owner;
    } else {
      console.log("You elder than 18");
    }
  };
  this.getInfo = function () {
    console.log(`Brand: ${this.brand},
Model: ${this.model}
Year: ${this.year}
Number: ${this.number}`);
    if (this.owner) {
      this.owner.getNameAndAge();
    } else {
      console.log(`Nobody`);
    }
  };
}

// Создаем экземпляры класса Person
const p1 = new Person("Alex", 25);
const p2 = new Person("Victor", 16);
const p3 = new Person("Vlad", 40);

// Создаем экземпляры класса Car
const c1 = new Car("Ford", "Mondeo", 1997, "BH0000AB");
const c2 = new Car("BMW", "M3", 2015, "BH0020AB");
const c3 = new Car("Renault", "Logan", 2005, "BH3000AB");

c1.setOwner(p1);
c2.setOwner(p2);
c3.setOwner(p3);

c1.getInfo();
c2.getInfo();
c3.getInfo();
