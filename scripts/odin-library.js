const libContainer = document.createElement("div");
libContainer.classList = "libContainer";
document.body.appendChild(libContainer);

const titleDiv = document.createElement("div");
titleDiv.textContent = "Library";
titleDiv.classList = "libTitle";
libContainer.appendChild(titleDiv);

const bookshelf = document.createElement("div");
bookshelf.classList = "bookshelf";
libContainer.appendChild(bookshelf);

const library = []

function Book(author, title, numPages, read, color){
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
    this.color = color;
}

function addBookToLibrary(author, title, numPages){
    const colors = ["#4f5f9c", "#774f9c", "#4f9b9c", "#4f9c5c", "#859c4f", "#9c854f", "#9c614f"]
    
    let color = colors[Math.floor(Math.random() * colors.length)];
    console.log(color);

    const book = new Book(
        author, 
        title, 
        numPages, 
        (Math.floor(Math.random() * 100)%2==0),
        color
    );

    library.push(book);
}

function displayBook(book){
    let bookDiv = document.createElement("div");
    bookDiv.classList = "book";
    bookDiv.style.background = book.color;
    
    let titleDiv = document.createElement("div");
    titleDiv.classList = "title";
    titleDiv.textContent = book.title;
    
    let authorDiv = document.createElement("p");
    authorDiv.classList = "author";
    authorDiv.innerHTML = "by <br>" + book.author;
    
    let numPagesDiv = document.createElement("div");
    numPagesDiv.classList = "numPages";
    numPagesDiv.textContent = book.numPages + "pages";
    
    let readDiv = document.createElement("input");
    readDiv.setAttribute("type", "checkbox");
    readDiv.classList = "read";
    readDiv.checked = book.read;

    let bottomRow = document.createElement("div");
    bottomRow.classList = "bottomRow";
    
    let deleteButton = document.createElement("div");
    deleteButton.classList = "deleteButton";
    deleteButton.textContent = "X";
    
    bottomRow.appendChild(readDiv);
    bottomRow.appendChild(numPagesDiv);
    bottomRow.appendChild(deleteButton);
    
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(bottomRow);
    
    bookshelf.appendChild(bookDiv);
}


addBookToLibrary("Sun Tzu", "The Art of War", "112");
addBookToLibrary("Yuval Noah Harari","Sapiens: A Brief History of Humankind", "512");
addBookToLibrary("James Clear", "Atomic Habits", "320");
addBookToLibrary("George Orwell", "1984", "328");
addBookToLibrary("Eric Ries", "The Lean Startup", "336");
addBookToLibrary("Sun Tzu", "The Art of War", "112");
addBookToLibrary("Yuval Noah Harari","Sapiens: A Brief History of Humankind", "512");
addBookToLibrary("James Clear", "Atomic Habits", "320");
addBookToLibrary("George Orwell", "1984", "328");
addBookToLibrary("Eric Ries", "The Lean Startup", "336");

library.forEach(element => {
    displayBook(element);
});