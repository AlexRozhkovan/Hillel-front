(() => {
  const firstNumber = validNumberInput("перше");
  const operation = validOperationInput();
  const secondNumber = validNumberInput("друге");

  if (firstNumber && secondNumber && operation) {
    let result = doMath(firstNumber, operation, secondNumber);
    console.log(result);
  }

  function validNumberInput(stringNumber) {
    let input;
    do {
      input = prompt(`Введіть ${stringNumber} число:`);
      if (isNaN(input)) {
        alert("Введено невірні дані!");
      }
      if (input === "") {
        alert("Значення пусте!");
      }
    } while (isNaN(input) || input === "");
    return Number(input);
  }

  function validOperationInput() {
    let input;
    let inputValues = ["+", "-", "*", "/", "%", "^"];
    do {
      input = prompt("Введіть знак операції:");
      if ((!inputValues.includes(input) || input == "") && input !== null) {
        alert("Невідомий знак операції");
      }
    } while (!inputValues.includes(input) && input !== null);
    return input;
  }

  function doMath(x, znak, y) {
    switch (znak) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      case "/":
        return x / y;
      case "%":
        return x % y;
      case "^":
        return Math.pow(x, y);
    }
  }
})();
