const myLibrary = [];

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
}

function addBookToLibrary() {
    
}