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
        card.textContent = book.title;
        card.dataset.index = index;
        
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

addBookToLibrary("20000 leagues", "Jules Verne", "300", true);
addBookToLibrary("alpha", "Jules Verne", "300", true);
addBookToLibrary("beta leagues", "Jules Verne", "300", true);
addBookToLibrary("charlie leagues", "Jules Verne", "300", true);