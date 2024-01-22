const myLibrary = [];

const libElem = document.querySelector("#book-cards");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        let readStatus = "";
        if (this.read) {
            readStatus = ", read.";
        }
        else {
            readStatus = ", not read yet."
        }
        return this.title + " by " + this.author + ", " + pages + readStatus;
    }

    this.toggleRead = () => {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.unshift(new Book(title, author, pages, read));
    renderLibrary();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    renderLibrary();
}

function renderLibrary() {
    let cardElems = [];
    let index = 0;
    myLibrary.forEach((book) => {
        // Create header and p tags for book information
        let card = document.createElement("div");
        card.className = "book-card";
        card.dataset.index = index;

        // Add card header
        let header = document.createElement("div");
        header.className = "card-header";
        let bookTitle = document.createElement("h1");
        bookTitle.textContent = book.title.toUpperCase();
        let authorName = document.createElement("h2");
        authorName.textContent = book.author;
        
        header.appendChild(bookTitle);
        header.appendChild(authorName);
        card.appendChild(header);

        // Add card info
        let bookInfo = document.createElement("div");
        bookInfo.className = "card-body";
        let numPages = document.createElement("p");
        numPages.textContent = book.pages + " pages";

        bookInfo.appendChild(numPages);
        card.appendChild(bookInfo);

        // Add "read" status checkbox
        let readDiv = document.createElement("div");
        let readLabel = document.createElement("label");
        let readBox = document.createElement("input");
        
        readDiv.className = "read-div";
        readLabel.className = "slider";
        readBox.id = "read-box-" + index;
        readLabel.htmlFor = readBox.id;
        readBox.type = "checkbox";
        readBox.checked = book.read;
        readLabel.textContent = "Read?";

        readBox.addEventListener("change", function(e) {
            myLibrary[e.target.parentElement.parentElement.parentElement.getAttribute("data-index")].read = e.target.checked;
        });

        readDiv.appendChild(readLabel);
        readDiv.appendChild(readBox);
        bookInfo.appendChild(readDiv);

        
        let delSelf = document.createElement("button");
        delSelf.textContent = "Delete Book";
        delSelf.addEventListener("click", function(e) {
            removeBookFromLibrary(e.target.parentElement.getAttribute("data-index"));
        });

        card.appendChild(delSelf);

        cardElems.push(card);
        index++;
    })

    libElem.replaceChildren(...cardElems);
}

const newBookForm = document.querySelector(".new-book-form");
function showForm() {
    newBookForm.classList.remove("hidden");
}

function hideForm() {
    newBookForm.classList.add("hidden");
}

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let bookTitle = document.querySelector("#book-title");
    let bookAuthor = document.querySelector("#book-author");
    let numPages = document.querySelector("#book-pages");
    let bookRead = document.querySelector("#book-status");

    if (!bookTitle.value) {
        bookTitle.value = "Untitled";
    }
    if (!bookAuthor.value) {
        bookAuthor.value = "Anonymous";
    }
    if (!numPages.value || (!isNaN(numPages.value) && !isNaN(parseFloat(numPages.value))) || Number(numPages.value) < 0) {
        numPages.value = "0";
    }
    
    addBookToLibrary(bookTitle.value, bookAuthor.value, numPages.value, bookRead.checked);

    bookTitle.value = "";
    bookAuthor.value = "";
    numPages.value = "";
    bookRead.checked = false;
    hideForm();
});

addBookToLibrary("20000 leagues under teh sesa", "Jules Verne", "300", true);
addBookToLibrary("alpha", "Jules Verne", "300", true);
addBookToLibrary("beta leagues", "Jules Verne", "300", true);
addBookToLibrary("charlie leagues", "Jules Verne", "300", true);