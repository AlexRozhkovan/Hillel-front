const hamburger = new Hamburger(
  Hamburger.SIZE_SMALL,
  Hamburger.STUFFING_CHEESE
);
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

console.log("Calories: " + hamburger.calculateCalories());
console.log("Price: " + hamburger.calculatePrice());

hamburger.addTopping(Hamburger.TOPPING_MAYO);

console.log("Price with topping: " + hamburger.calculatePrice());
console.log("Calories with topping: " + hamburger.calculateCalories());
