function getStorage() {
  let storage = JSON.parse(localStorage.getItem("users"));
  if (!storage) {
    storage = users;
    setToStorage(storage);
  }
  return storage;
}

function setToStorage(storage) {
  localStorage.setItem("users", JSON.stringify(storage));
}
