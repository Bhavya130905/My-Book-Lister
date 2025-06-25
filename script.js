let form = document.querySelector("#book-form");
const list = document.querySelector("#book-list");

function createList(title, author, isbn) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="book-title">${title}</td>
        <td class="book-author">${author}</td>
        <td class="book-isbn">${isbn}</td>
        <td class="btn btn-danger float-right delete">
            <a type="button">X</a>
        </td>
    `;
    list.appendChild(row);
}

function addBookToStorage(title, author, isbn) {
    let books;
    if (localStorage.getItem("books") === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }
    books.push({ title, author, isbn });
    localStorage.setItem("books", JSON.stringify(books));
}

function clearAllFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
}

function showAlert(msg, className) {
    let div = document.createElement("div");
    div.className = "alert alert-" + className;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    container.insertBefore(div, form);
    setTimeout(function () {
        if (document.querySelector(".alert")) {
            document.querySelector(".alert").remove();
        }
    }, 3000);
}

function removeBookFromStorage(isbn) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let newbooks = books.filter(book => book.isbn !== isbn);
    localStorage.setItem("books", JSON.stringify(newbooks));
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let title = document.querySelector("#title").value.trim();
    let author = document.querySelector("#author").value.trim();
    let isbn = document.querySelector("#isbn").value.trim();

    if (title.length === 0 || author.length === 0 || isbn.length === 0) {
        showAlert("Please fill all the fields", "danger");
        return;
    }
    createList(title, author, isbn);
    showAlert("Book Added Successfully", "success");
    clearAllFields();
    addBookToStorage(title, author, isbn);
});

list.addEventListener('click', function (e) {
    if (e.target.parentElement.classList.contains("delete")) {
        let parentElement = e.target.parentElement.parentElement;
        let isbn = e.target.parentElement.previousElementSibling.textContent;
        list.removeChild(parentElement);
        removeBookFromStorage(isbn);
        showAlert("Book Deleted Successfully", "success");
    }
});

window.addEventListener("DOMContentLoaded", function () {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    for (let i = 0; i < books.length; i++) {
        createList(books[i].title, books[i].author, books[i].isbn);
    }
});
