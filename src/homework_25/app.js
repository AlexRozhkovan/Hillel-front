const categoriesContainer = document.querySelector(".categories");
const productsContainer = document.querySelector(".products");
const detailsContainer = document.querySelector(".details");

function showCategories() {
  data.forEach((category, index) => {
    const el = document.createElement("div");
    el.textContent = category.name;
    el.dataset.category = index;
    el.addEventListener("click", showProductsHandler);
    categoriesContainer.appendChild(el);
  });
}

function showProductsHandler(event) {
  productsContainer.innerHTML = "";
  const el = event.target;
  const categoryIndex = el.dataset.category;
  const categoryProducts = data[categoryIndex].products;
  categoryProducts.forEach((product, index) => {
    const el = document.createElement("div");
    el.textContent = product.name;
    el.dataset.category = categoryIndex;
    el.dataset.product = index;
    el.addEventListener("click", showDetailsHandler);
    productsContainer.appendChild(el);
  });
}

function showDetailsHandler(event) {
  detailsContainer.innerHTML = "";
  const el = event.target;
  const categoryIndex = el.dataset.category;
  const productIndex = el.dataset.product;
  const productDetails = data[categoryIndex].products[productIndex];
  Object.values(productDetails).forEach((value) => {
    const el = document.createElement("div");
    el.textContent = value;
    detailsContainer.appendChild(el);
  });
  const button = document.createElement("button");
  button.textContent = "КУПИТИ";
  detailsContainer.appendChild(button);
  button.addEventListener("click", buyButtonHandler);
}

function buyButtonHandler() {
  alert("Товар успішно придбанний");
  cleanData([productsContainer, detailsContainer]);
}

function cleanData(elements) {
  elements.forEach((el) => {
    el.innerHTML = "";
  });
}

showCategories();
