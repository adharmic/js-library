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
        bookTitle.textContent = book.title;
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
            console.dir(myLibrary);
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

addBookToLibrary("20000 leagues under teh sesa", "Jules Verne", "300", true);
addBookToLibrary("alpha", "Jules Verne", "300", true);
addBookToLibrary("beta leagues", "Jules Verne", "300", true);
addBookToLibrary("charlie leagues", "Jules Verne", "300", true);