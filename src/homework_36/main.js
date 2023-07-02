function searchPost() {
  const postIdInput = document.getElementById("postIdInput");
  const postId = postIdInput.value;
  const postContainer = document.getElementById("postContainer");

  if (!postId) {
    postContainer.innerHTML = "";
    postIdInput.setAttribute("empty", "true");
    return;
  }
  if (postId < 1 || postId > 100) {
    console.error("Введіть номер від 1 до 100");
    return;
  }

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then((post) => {
      postContainer.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        `;
    })
    .catch((error) => {
      console.error("Виникла помилка:", error);
    });
}

function getComments() {
  const postIdInput = document.getElementById("postIdInput");
  const postId = postIdInput.value;

  if (!postId || postIdInput.getAttribute("empty") === "false") {
    return;
  }

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((comments) => {
      const postContainer = document.getElementById("postContainer");
      const commentsList = document.createElement("ul");
      comments.forEach((comment) => {
        const listItem = document.createElement("li");
        listItem.textContent = comment.body;
        commentsList.appendChild(listItem);
      });
      postContainer.appendChild(commentsList);
      postIdInput.setAttribute("empty", "false");
    })
    .catch((error) => {
      console.error("Виникла помилка:", error);
    });
}
