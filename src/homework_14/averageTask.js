(() => {
  const array = ["A", 2, 4, 6, "Hello", true, "c", 46, 1, -5, null];
  const average = getAverage(array);
  console.log(`average = ${average}`);

  function getAverage(arrayParam) {
    let sum = 0;
    let count = 0;
    arrayParam.forEach((e) => {
      if (typeof e === "number") {
        sum += e;
        count++;
      }
    });
    return count ? sum / count : 0;
  }
})();
