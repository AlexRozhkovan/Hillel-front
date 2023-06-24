const numberImages = {};

function preloadImages() {
  for (let i = 0; i < 10; i++) {
    numberImages[i] = new Image();
    numberImages[i].src = `dist/images/${i}.png`;
  }
}

function updateDigitGroup(group, value) {
  group[0].style.backgroundImage = `url('${
    numberImages[Math.floor(value / 10)].src
  }')`;
  group[1].style.backgroundImage = `url('${numberImages[value % 10].src}')`;
}

function updateClock() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const digitGroups = [
    document.querySelectorAll(".hour-tens, .hour-ones"),
    document.querySelectorAll(".minute-tens, .minute-ones"),
    document.querySelectorAll(".second-tens, .second-ones"),
  ];

  digitGroups.forEach((group, index) => {
    updateDigitGroup(group, [hours, minutes, seconds][index]);
  });
}

function startClock() {
  preloadImages();
  updateClock();
  setInterval(updateClock, 1000);
}

startClock();
