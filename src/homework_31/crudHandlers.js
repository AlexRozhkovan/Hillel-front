const createEditButtonHandler = function (action, index, user) {
  cancelHandler();
  let btn;
  if (action === "create") {
    btn = document.getElementById("createBtn");
    handleCreationForm();
  } else {
    btn = document.getElementById(`edit${index}`);
    handleCreationForm(user);
  }
  const button = document.getElementById("save");
  button.addEventListener("click", () => saveHandler());
};

const saveHandler = function () {
  const main = document.getElementById("main");
  const userContainer = document.getElementById("users");
  let storage = getStorage();
  const elements = Array.from(form.getElementsByTagName("input"));
  const data = elements.reduce((acc, input) => {
    acc[input.id] = input.value;
    return acc;
  }, {});
  const [isValid, validationMessage] = formValidator(data);
  if (!isValid) {
    alert(validationMessage);
    return;
  }
  const existingIndex = storage.findIndex(item => item.email === data.email);
  if (existingIndex >= 0) {
    storage[existingIndex] = data;
  } else {
    storage.push(data);
  }
  setToStorage(storage);
  main.removeChild(form);
  if (userContainer) {
    main.removeChild(userContainer);
  }
  getActualUserList();
}

const cancelHandler = function(){
  const form = document.getElementById("form");
  if (form) {
    form.remove();
  }
}

const getActualUserList = function () {
  const main = document.getElementById("main");
  const storage = getStorage();
  let userContainer = document.getElementById("users");
  const userDetailsContainer = document.getElementById("userDetails");

  if (userContainer) {
    userContainer.remove();
  }

  if (userDetailsContainer) {
    userDetailsContainer.remove();
  
  }

  userContainer = createEl(
    "ul",
    { id: "users", classList: "userContainer" },
    null,
    null,
    main
  );

  storage.forEach((user, index) => {
    createDataToRead(userContainer, user, index);
  });
};

function createDataToRead(userContainer, user, index) {
  createEl(
    "li",
    { id: `user${index + 1}` },
    `${user["email"]}`,
    null,
    userContainer
  );

  createEl(
    "input",
    { id: `view${index + 1}`, type: "button", value: "View" },
    null,
    {
      click: function () {
        viewButtonHandler(user);
      },
    },
    userContainer
  );
  let el = createEl(
    "input",
    {
      id: `edit${index + 1}`,
      type: "button",
      value: "Edit",
    },
    null,
    {
      click: () => createEditButtonHandler("edit", `${index + 1}`, user),
    },
    userContainer
  );

  createEl(
    "input",
    { id: `delete${index + 1}`, type: "button", value: "Delete" },
    null,
    {
      click: function () {
        deleteButtonHandler(user["email"], index);
      },
    },
    userContainer
  );
}

function viewButtonHandler(user) {
  const main = document.getElementById("main");
  let userDetailsContainer = document.getElementById("userDetails");
  if (userDetailsContainer) {
    main.removeChild(userDetailsContainer);
  }
  userDetailsContainer = createEl(
    "ul",
    { id: "userDetails" },
    null,
    null,
    main
  );
  Object.entries(user).forEach(([key, value]) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${key}: ${value}`;
    userDetailsContainer.appendChild(listItem);
  });
}

function deleteButtonHandler(userName, index) {
  const confirmation = confirm(
    `Are you sure you want to delete user ${userName}?`
  );
  if (confirmation) {
    const storage = getStorage();
    storage.splice(index, 1);
    setToStorage(storage);
    getActualUserList();
  }
}
