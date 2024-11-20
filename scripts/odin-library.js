const library = []

function Book(author, title, numPages){
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = false;
}

function addBookToLibrary(author, title, numPages){
    const book = new Book(author, title, numPages);;
    library.push(book);
}

function displayBook(book){
    let bookDiv = document.createElement("div");
    bookDiv.classList = "book";
    let authorDiv = document.createElement("div");
    authorDiv.classList = "author";
    authorDiv.textContent = book.author;
    let titleDiv = document.createElement("div");
    titleDiv.classList = "title";
    titleDiv.textContent = book.title;
    let numPagesDiv = document.createElement("div");
    numPagesDiv.classList = "numPages";
    numPagesDiv.textContent = book.numPages;
    let readDiv = document.createElement("div");
    readDiv.classList = "read";
    readDiv.textContent = book.read;
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(numPagesDiv);
    bookDiv.appendChild(readDiv);
    document.body.appendChild(bookDiv);
}


addBookToLibrary("Sun Tzu", "The Art of War", "112");
addBookToLibrary("Yuval Noah Harari","Sapiens: A Brief History of Humankind", "512");
addBookToLibrary("James Clear", "Atomic Habits", "320");
addBookToLibrary("George Orwell", "1984", "328");
addBookToLibrary("Eric Ries", "The Lean Startup", "336");
console.log(document.body);
library.forEach(element => {
    displayBook(element);
});