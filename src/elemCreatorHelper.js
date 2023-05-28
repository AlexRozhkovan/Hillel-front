function createEl(tagName, attr, textContent, handlers, parent) {
  const el = document.createElement(tagName);
  for (let key in attr) {
    if (key === "classList") {
      el.setAttribute("class", attr[key]);
    } else {
      el.setAttribute(key, attr[key]);
    }
  }

  el.textContent = textContent;
  for (let key in handlers) {
    el.addEventListener(key, handlers[key]);
  }

  parent.appendChild(el);
  return el;
}
