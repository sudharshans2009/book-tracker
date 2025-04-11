function searchBooks() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      (book.author && book.author.toLowerCase().includes(query)) ||
      (book.category && book.category.toLowerCase().includes(query))
  );
  displayBooks(filteredBooks);
}

function sortBooks() {
  const sortOption = document.getElementById("sortOptions").value;
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.sort((a, b) =>
    (a[sortOption] || "").localeCompare(b[sortOption] || "")
  );
  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();
}

function displayBooks(books) {
  bookGrid.innerHTML = "";
  books.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author || "Unknown"}</p>
      <p>${book.description || ""}</p>
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