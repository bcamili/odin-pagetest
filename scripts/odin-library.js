const libContainer = document.createElement("div");
libContainer.classList = "libContainer";
document.body.appendChild(libContainer);

const header = document.createElement("div");
header.classList = "header";
const titleDiv = document.createElement("div");
titleDiv.textContent = "Library";
titleDiv.classList = "libTitle";

header.appendChild(titleDiv);

const addButton = document.createElement("div");
addButton.classList = "addButton";
addButton.textContent = "+";
addButton.addEventListener("click",function (e){
    openAddDialogue(e);
});

header.appendChild(addButton);

libContainer.appendChild(header);

const bookshelf = document.createElement("div");
bookshelf.classList = "bookshelf";
libContainer.appendChild(bookshelf);

const overlayContainer = document.createElement("div");
overlayContainer.classList = "overlayContainer";

const overlayBG = document.createElement("div");
overlayBG.classList = "overlayBG";

overlayContainer.appendChild(overlayBG);

const formTitle = document.createElement("form");
formTitle.textContent = "Add a new book";

const addForm = document.createElement("div");
addForm.classList = "addForm";


const titleInputDiv = document.createElement("div");
titleInputDiv.id = "titleInputDiv";
const titleInput = document.createElement("input");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("id", "titleInput");
titleInput.setAttribute("name", "titleInput");
titleInput.setAttribute("placeholder", "Title");
titleInputDiv.appendChild(titleInput);

const authorInputDiv = document.createElement("div");
authorInputDiv.id = "authorInputDiv";
const authorInput = document.createElement("input");
authorInput.setAttribute("type", "text");
authorInput.setAttribute("name", "authorInput");
authorInput.setAttribute("id", "authorInput");
authorInput.setAttribute("placeholder", "Author");
authorInputDiv.appendChild(authorInput);

const pagesInputDiv = document.createElement("div");
pagesInputDiv.id = "pagesInputDiv";
const pagesInput = document.createElement("input");
pagesInput.setAttribute("type", "number");
pagesInput.setAttribute("name", "pagesInput");
pagesInput.setAttribute("id", "pagesInput");
pagesInput.setAttribute("value", "1");
pagesInput.setAttribute("min", "1");
pagesInputDiv.appendChild(pagesInput);
const pagesInputLabel = document.createElement("div");
pagesInputLabel.textContent = " pages";
pagesInputDiv.appendChild(pagesInputLabel);

const readInputDiv = document.createElement("div");
readInputDiv.id = "readInputDiv";
const readInput = document.createElement("input");
readInput.setAttribute("type", "checkbox");
readInput.setAttribute("id", "readInput");
readInput.setAttribute("name", "readInput");
readInput.checked = "checked";
readInputDiv.appendChild(readInput);
const readInputLabel = document.createElement("div");
readInputLabel.textContent = " Read";
readInputDiv.appendChild(readInputLabel);

const submitBtnDiv = document.createElement("div");
submitBtnDiv.id = "submitBtnDiv";
const submitBtn = document.createElement("button");
submitBtn.setAttribute("id", "submitBtn")
submitBtn.setAttribute("type", "button");
submitBtn.textContent="Add book";
submitBtn.addEventListener("click", function (e){
    submitBook(e);
})
submitBtnDiv.appendChild(submitBtn);

addForm.appendChild(titleInputDiv);
addForm.appendChild(authorInputDiv);
addForm.appendChild(pagesInputDiv);
addForm.appendChild(readInputDiv);
addForm.appendChild(submitBtnDiv);

overlayBG.appendChild(addForm);

const library = []

addBookToLibrary("Sun Tzu", "The Art of War", "112", (Math.random()>0.5));
addBookToLibrary("Yuval Noah Harari","Sapiens: A Brief History of Humankind", "512", (Math.random()>0.5));
addBookToLibrary("James Clear", "Atomic Habits", "320", (Math.random()>0.5));
addBookToLibrary("George Orwell", "1984", "328", (Math.random()>0.5));
addBookToLibrary("Eric Ries", "The Lean Startup", "336", (Math.random()>0.5));
addBookToLibrary("Sun Tzu", "The Art of War", "112", (Math.random()>0.5));
addBookToLibrary("Yuval Noah Harari","Sapiens: A Brief History of Humankind", "512", (Math.random()>0.5));
addBookToLibrary("James Clear", "Atomic Habits", "320", (Math.random()>0.5));
addBookToLibrary("George Orwell", "1984", "328", (Math.random()>0.5));
addBookToLibrary("Eric Ries", "The Lean Startup", "336", (Math.random()>0.5));

displayBooks();


//________FUNCTIONS__________//

function displayBooks(){
    library.forEach(element => {
        displayBook(element);
    });
}

function Book(author, title, numPages, read, color){
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
    this.color = color;
}

function addBookToLibrary(author, title, numPages, read){
    const colors = ["#4f5f9c", "#774f9c", "#4f9b9c", "#4f9c5c", "#859c4f", "#9c854f", "#9c614f"]
    
    let color = colors[Math.floor(Math.random() * colors.length)];

    const book = new Book(
        author, 
        title, 
        numPages, 
        read,
        color,
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
    numPagesDiv.textContent = book.numPages + " pages";
    
    let readDiv = document.createElement("input");
    readDiv.setAttribute("type", "checkbox");
    readDiv.classList = "read";
    readDiv.checked = book.read;

    let bottomRow = document.createElement("div");
    bottomRow.classList = "bottomRow";
    
    let deleteButton = document.createElement("div");
    deleteButton.classList = "deleteButton";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function (e){
        removeBook(library.indexOf(book));
    })
    
    bottomRow.appendChild(readDiv);
    bottomRow.appendChild(numPagesDiv);
    bottomRow.appendChild(deleteButton);
    
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(bottomRow);
    
    bookshelf.appendChild(bookDiv);
}

function openAddDialogue(e){
    if(document.getElementsByClassName("overlayContainer").length>0){
        overlayContainer.remove();
        addButton.textContent = "+"
    }else{
        libContainer.appendChild(overlayContainer);
        addButton.textContent = "X"
    }
}

function submitBook(e){
    addBookToLibrary(authorInput.value, titleInput.value, pagesInput.value, readInput.checked);
    titleInput.value = "";
    authorInput.value = ""
    pagesInput.value = "1"
    readInput.checked = true;
    bookshelf.innerHTML="";
    displayBooks();
    overlayContainer.remove();
    addButton.textContent = "+"
}

function removeBook(index){
    library.splice(index,1);
    bookshelf.innerHTML="";
    displayBooks();
}
