const myLibrary = [];

const libElem = document.querySelector(".table-body");

class Book {
    constructor(title, author, pages, read) {
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
                readStatus = ", not read yet.";
            }
            return this.title + " by " + this.author + ", " + pages + readStatus;
        };

        this.toggleRead = () => {
            this.read = !this.read;
        };
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
        let entry = document.createElement("tr");
        // entry.className = "book-card";
        entry.dataset.index = index;

        let titleCol = document.createElement("td");
        titleCol.textContent = book.title;
        entry.appendChild(titleCol);

        let authorCol = document.createElement("td");
        authorCol.textContent = book.author;
        entry.appendChild(authorCol);

        let pageCol = document.createElement("td");
        pageCol.textContent = book.pages;
        entry.appendChild(pageCol);

        // Add "read" status checkbox
        let readCol = document.createElement("td");
        readCol.className = "td-read";
        if (book.read) {
            readCol.textContent = "Read";
        }
        else {
            readCol.textContent = "Unread";
        }

        entry.appendChild(readCol);

        let actions = document.createElement("td");
        actions.className = "action-buttons";
        
        let delSelf = document.createElement("button");
        delSelf.className = "action-button";
        
        delSelf.dataset.index = index;

        let trashIcon = document.createElement("i");
        trashIcon.className = "fa fa-trash-o";
        delSelf.appendChild(trashIcon);
        delSelf.addEventListener("click", function(e) {
            removeBookFromLibrary(this.getAttribute("data-index"));
        });

        let toggleStatus = document.createElement("button");
        toggleStatus.className = "action-button";
        
        toggleStatus.dataset.index = index;
        toggleStatus.addEventListener("click", function(e) {
            var currBook = myLibrary[this.getAttribute("data-index")];
            currBook.read = !currBook.read;
            renderLibrary();
        });

        let eyeIcon = document.createElement("i");
        if (book.read) {
            eyeIcon.className = "fa fa-eye-slash";
        }
        else {
            eyeIcon.className = "fa fa-eye";
        }
        toggleStatus.appendChild(eyeIcon);

        actions.appendChild(toggleStatus);
        actions.appendChild(delSelf);
        entry.appendChild(actions);

        cardElems.push(entry);
        index++;
    })
    if (index == 0) {
        let empty = document.createElement("tr");
        empty.className = "blank-row";
        
        let blankVals = document.createElement("td");
        blankVals.colSpan = "5";

        empty.appendChild(blankVals);
        cardElems.push(empty);
    }

    libElem.replaceChildren(...cardElems);
}

const newBookForm = document.querySelector(".modal");
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

addBookToLibrary("20,000 Leagues Under the Sea", "Jules Verne", "20000", true);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", "451", true);
addBookToLibrary("Catch-22", "Joseph Heller", "22", true);
addBookToLibrary("Animal Farm", "George Orwell", "300", true);