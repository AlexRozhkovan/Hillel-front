const form = document.getElementById("registration-form");

form.addEventListener("submit", (event) => {
event.preventDefault();

const firstName = document.getElementById("first-name").value;
const lastName = document.getElementById("last-name").value;
const birthdate = document.getElementById("birthdate").value;
const gender = document.querySelector('input[name="gender"]:checked').parentElement.textContent.trim();
const city = document.getElementById("city").selectedOptions[0].textContent;
const address = document.getElementById("address").value;
const languages = [];
const checkboxes = document.querySelectorAll('input[name="languages"]:checked');
checkboxes.forEach((checkbox) => {
  languages.push(checkbox.parentElement.textContent.trim());
});

const table = document.createElement("table");
  const data = {
    "Ім'я:": firstName,
    "Прізвище:": lastName,
    "Дата народження:": birthdate,
    "Стать:": gender,
    "Місто:": city,
    "Адреса:": address,
    "Мови, якими володіє:": languages.join(", "),
  };

  for (const [key, value] of Object.entries(data)) {
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    cell1.innerHTML = key;
    cell2.innerHTML = value;
  }

  const output = document.getElementById("result");
  output.innerHTML = "";
  output.appendChild(table);

  form.style.display = "none";
});







