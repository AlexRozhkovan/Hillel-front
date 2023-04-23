(() => {
  let stringInput = prompt("Введіть строку");
  let symbolsInput = validSymbols();

  deleteSymbols(stringInput, symbolsInput);
  
  function deleteSymbols(string, symbols) {
    let textArray = string.split("");
    for (let i = 0; i < textArray.length; i++) {
      for (let j = 0; j < symbols.length; j++) {
        if (textArray[i] === symbols[j]) {
          textArray.splice(i, 1);
          i--;
        }
      }
    }

    console.log(textArray.join(""));
    return textArray.join("");
  }

  function validSymbols() {
    let input;
    let separatedInputArray;
    do {
      input = prompt(`Введіть видаляємі символи через кому:`);
      let length = input.length;
      if (length > 1 && !input.includes(",")) {
        alert("Символи вводяться через кому!");
      } else if (length === 0) {
        alert("Значення пусте!");
      } else if (input.length > 1) {
        separatedInputArray = input.split(",").map((elem) => elem.trim());
        if (separatedInputArray.some((elem) => elem.length > 1)) {
          alert("Вводіть кожен символ окремо");
          separatedInputArray = undefined;
        }
      } else {
        separatedInputArray = [input];
      }
    } while (input === "" || !separatedInputArray);
    return separatedInputArray;
  }
})();
