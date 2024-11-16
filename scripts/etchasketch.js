const game = document.getElementById("etchasketch");
game.style.display = "flex";
game.style.flexDirection = "column";
game.style.alignItems = "center";
game.style.marginTop = "5%";

const gameTitle = document.createElement("h1");
gameTitle.textContent="Etch-A-Sketch";
game.appendChild(gameTitle);

const newGridButton = document.createElement("button");
newGridButton.textContent = "New Grid"
newGridButton.addEventListener("click", newGrid)
newGridButton.style.marginBottom = "2%";
game.appendChild(newGridButton);

const gameBox = document.createElement("div");
game.appendChild(gameBox);

gameBox.style.width = "750px";
gameBox.style.height = "750px";
gameBox.style.border = "12px solid black";
gameBox.style.marginBottom = "10%";
gameBox.style.display = "flex";
gameBox.style.flexDirection = "column"
gameBox.style.justifyItems = "center";

createGrid(16);

// --- Functions ---//

function createGrid(num){
    for(let i = 0; i<num;i++){
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.flex ="1";
        for(let j = 0; j<num; j++){
            const item = document.createElement("div");
            item.style.flex = "1";
            item.style.background = "black";
            item.style.opacity = "0";
            item.addEventListener("mouseover", function (e) {
                e.target.style.background = rgb(0, 0, Math.random()*255);
                e.target.style.opacity = String(Number(e.target.style.opacity) + 0.1);
            });
            row.appendChild(item);
        }
        gameBox.appendChild(row);
    }
}

function newGrid(){
    const num = prompt("Enter a gridsize between 1 and 100:");

    if(num > 0 && num<101){
        gameBox.replaceChildren();
        createGrid(num);
    }else{
        newGrid();
    }
}

function rgb(r,g,b){
    return "rgba(" + r + ", " + g + ", " + b + ")";
}

function getRGB(s){
    let sSplit = s.substring(5,s.length-1).split(", ");
    let r = [0,0,0]
    for(let i=0; i<3;i++){
        r[i] = Number(sSplit[i])
    }
    return r;
}