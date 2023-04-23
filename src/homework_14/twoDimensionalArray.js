(() => {
  let rowCount = validPositiveNumberInput("рядків");
  let colCount = validPositiveNumberInput("колонок");
  fillArray(rowCount, colCount);

  function fillArray(rows, cols) {
    const array = [];
    for (let i = 0; i < rows; i++) {
      array[i] = [];
      for (let j = 0; j < cols; j++) {
        array[i][j] = prompt(`Введіть значення елементу [${i}][${j}]`);
      }
    }
    console.log(array);
    return array;
  }

  function validPositiveNumberInput(inputValue) {
    let input;
    do {
      input = prompt(`Введіть кількість ${inputValue}:`);
      if (isNaN(input)) {
        alert("Введено невірні дані!");
      }
      if (input === "") {
        alert("Значення пусте!");
      }
      if (input < 0) {
        alert("Значення повинно бути більше 0");
      }
    } while (isNaN(input) || input === "" || input < 0);
    return Number(input);
  }
})();
