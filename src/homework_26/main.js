const imageNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const imageArrayLength = imageNames.length;
let currentImageIndex = 0;

function showImage() {
  const image = document.querySelector(".img");
  const prevBtn = document.querySelector(".btn-prev");
  const nextBtn = document.querySelector(".btn-next");

  image.src = `./images/${imageNames[currentImageIndex]}.jpeg`;
  switch (currentImageIndex) {
    case 0:
      prevBtn.disabled = true;
      break;
    case imageLength - 1:
      nextBtn.disabled = true;
      break;
    default:
      prevBtn.disabled = false;
      nextBtn.disabled = false;
  }
}

function showNextImage() {
  if (currentImageIndex < imageArrayLength - 1) {
    currentImageIndex++;
    showImage();
  }
}

function showPrevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    showImage();
  }
}

function initSlider() {
  showImage();
  document.querySelector(".btn-prev").addEventListener("click", showPrevImage);
  document.querySelector(".btn-next").addEventListener("click", showNextImage);
}

initSlider();
