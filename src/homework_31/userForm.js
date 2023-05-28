let formConfig = [
  {
    tagName: "input",
    attr: {
      type: "text",
      id: "name",
      dataName: "Ім'я",
      placeholder: `Ім'я...`,
    },
    textContent: null,
    handlers: null,
  },
  {
    tagName: "input",
    attr: {
      type: "password",
      id: "password",
      dataName: "Пароль",
      placeholder: `Пароль...`,
    },
    textContent: null,
    handlers: null,
  },
  {
    tagName: "input",
    attr: {
      type: "number",
      id: "age",
      dataName: "Вік",
      placeholder: `Вік...`,
    },
    textContent: null,
    handlers: null,
  },
  {
    tagName: "input",
    attr: {
      type: "email",
      id: "email",
      dataName: "Пошта",
      placeholder: `Пошта...`,
    },
    textContent: null,
    handlers: null,
  },
  {
    tagName: "input",
    attr: {
      type: "tel",
      id: "phone",
      dataName: "Номер телефону",
      placeholder: `Номер телефону...`,
    },
    textContent: null,
    handlers: null,
  },
  {
    tagName: "input",
    attr: {
      type: "number",
      id: "card",
      dataName: "Номер картки",
      placeholder: `Карта...`,
    },
    textContent: null,
    handlers: null,
  },
];

function handleCreationForm(user) {
  const main = document.getElementById("main");
  let fieldIndex = 0;
  const form = createEl(
    "form",
    { id: "form", classList: "form" },
    null,
    null,
    main
  );

  for (let value of formConfig) {
    let attrs = value.attr;
    if (user) {
      if (attrs.id === "email") {
        attrs.disabled = "true";
      }
      let a = Object.values(user)[fieldIndex];
      attrs.value = Object.values(user)[fieldIndex];
      fieldIndex++;
    } else {
      delete attrs.value;
    }
    createEl("label", { for: value.attr.id }, value.attr.dataName, null, form);
    createEl(value.tagName, attrs, value.textContent, value.handlers, form);
  }
  createEl(
    "input",
    { id: "save", type: "button", value: "Save" },
    null,
    null,
    form
  );
  createEl(
    "input",
    { id: "cancel", type: "button", value: "Cancel" },
    null,
    { click: cancelHandler },
    form
  );
  main.appendChild(form);
}

const formValidator = function (data) {
  let message = "";

  if (!/^(?:[A-ZА-Я][a-zа-я]{2,})$/.test(data.name)) {
    message +=
      "Ім'я: Повинно починатися з великої літери та містити мінімум 3 символи\n";
  }

  if (!/^(?=.*[A-Z])(?=.*\d).{5,}$/.test(data.password)) {
    message +=
      "Пороль: Має містити мінімум одну заголовну літеру та одну цифру\n";
  }

  if (data.age < 14 || !Number.isInteger(Number(data.age))) {
    message += "Вік: Старше 14 років\n";
  }

  if (
    data.email === "" &&
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)
  ) {
    message += "Введіть актуальну адресу електронної пошти\n";
  }

  if (!/^\+380\d{9}$/.test(data.phone)) {
    message += "Номер телефону: Формат(+380xxxxxxxxx)\n";
  }

  if (!/^\d{16}$/.test(data.card)) {
    message += "Недійсний номер картки\n";
  }

  return [message.length === 0, message];
};
