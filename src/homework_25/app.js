const categoriesContainer = document.querySelector(".categories");
const productsContainer = document.querySelector(".products");
const detailsContainer = document.querySelector(".details");
const orderContainer = document.querySelector(".order");
const main = document.getElementById("backBtn");
const orderForm = document.getElementById("order-form");
const myOrders = document.getElementById("myOrders");

main.addEventListener("click", showDefaultPage);
myOrders.addEventListener("click", showMyOrders);

function showDefaultPage() {
  cleanData([categoriesContainer, productsContainer, detailsContainer]);
  orderForm.style.display = "none";
  showCategories();
}

function showMyOrders() {
  cleanData([categoriesContainer, productsContainer, detailsContainer]);
  orderContainer.style.display = "none";
  let localData = JSON.parse(localStorage.getItem("orderList")) || [];
  localData.forEach((ld, index) => {
    const el = document.createElement("div");
    el.textContent = `Дата: ${ld["Дата замовлення"]} || Ціна: ${ld["Ціна"]}$`;
    el.addEventListener("click", function () {
      showOrderDetails(ld, index);
    });
    categoriesContainer.appendChild(el);
  });
}

function showOrderDetails(data, index) {
  cleanData([productsContainer]);
  Object.entries(data).forEach(([key, value]) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${key}: ${value}`;
    productsContainer.appendChild(listItem);
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Видалити замовлення";
  productsContainer.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function () {
    const localData = JSON.parse(localStorage.getItem("orderList")) || [];
    localData.splice(index, 1);
    localStorage.setItem("orderList", JSON.stringify(localData));
    showMyOrders();
  });
}

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
  const categoryIndex = event.target.dataset.category;
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
  orderContainer.style.display = "block";
  orderForm.style.display = "block";
  orderForm.addEventListener("submit", submitBtnHandler);
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

  let localData = JSON.parse(localStorage.getItem("orderList")) || [];
  const table = document.createElement("table");

  const data = {
    Товар: productName,
    Ціна: productPrice,
    ПІБ: name,
    Місто: city,
    "Відділення НП": np,
    "Вид оплати": paymentType,
    Кількість: quantity,
    Комментар: comment === null ? comment : "Нема",
    "Дата замовлення": new Date().toLocaleString("en-GB"),
  };

  localData.push(data);
  localStorage.setItem("orderList", JSON.stringify(localData));

  for (const [key, value] of Object.entries(data)) {
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    cell1.innerHTML = key;
    cell2.innerHTML = value;
  }

  orderContainer.appendChild(table);
  orderForm.style.display = "none";
}

function cleanData(elements) {
  elements.forEach((el) => {
    if (el != null) el.innerHTML = "";
  });
}

showCategories();
