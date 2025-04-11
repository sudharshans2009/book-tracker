const bookGrid = document.getElementById("bookGrid");

function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  bookGrid.innerHTML = "";
  books.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author || "Unknown"}</p>
      ${book.description ? `<p>${book.description}</p>` : ""}
      <p><strong>Category:</strong> ${book.category || "Uncategorized"}</p>
      ${
        book.cover
          ? `<img src="${book.cover}" alt="${book.title} cover" class="book-cover">`
          : ""
      }
      <div class="btn-container">
        <button class="btn" onclick="editBook(${index})">Edit</button>
        <button class="btn" style="background-color: red;" onclick="deleteBook(${index})">Delete</button>
      </div>
    `;
    bookGrid.appendChild(card);
  });
}

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const description = document.getElementById("description").value.trim();
  const cover = document.getElementById("cover").files[0];
  const currentCover = document.getElementById("currentCover").value;
  const category = document.getElementById("category").value.trim();

  if (!title) {
    alert("Title is required.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookData = {
      title,
      author,
      description,
      cover: e.target.result || currentCover,
      category,
    };

    if (editIndex !== null) {
      books[editIndex] = bookData;
    } else {
      books.push(bookData);
    }

    localStorage.setItem("books", JSON.stringify(books));
    hidePopup();
    loadBooks();
  };

  if (cover) {
    reader.readAsDataURL(cover);
  } else {
    reader.onload({ target: { result: null } });
  }
}

function editBook(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = books[index];

  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("description").value = book.description;
  document.getElementById("category").value = book.category || "";
  document.getElementById("cover").value = "";
  document.getElementById("currentCover").value = book.cover || "";

  const imagePreview = document.getElementById("imagePreview");
  if (book.cover) {
    imagePreview.src = book.cover;
    imagePreview.style.display = "block";
  } else {
    imagePreview.style.display = "none";
  }

  editIndex = index;
  showPopup();
}

function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
  }
}