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
  const order = document.getElementById("order-form");
  order.style.display = "block";
  order.addEventListener("submit", submitBtnHandler);
}

function submitBtnHandler(event) {
  event.preventDefault();
  const productName = detailsContainer.childNodes[0].textContent;
  const productPrice = detailsContainer.childNodes[1].textContent;
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const np = document.getElementById("np").value;
  const paymentType = document.getElementById("payment").value;
  const quantity = document.getElementById("quantity").value;
  const comment = document.getElementById("comment").value;

  const table = document.createElement("table");
  const data = {
    "Товар": productName,
    "Ціна": productPrice,
    "ПІБ": name,
    "Місто": city,
    "Відділення НП": np,
    "Вид оплати": paymentType,
    "Кількість": quantity,
    "Комментар": comment === null ? comment : "Нема",
  };

  for (const [key, value] of Object.entries(data)) {
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    cell1.innerHTML = key;
    cell2.innerHTML = value;
  }

  document.getElementById("order").appendChild(table);
}

showCategories();
