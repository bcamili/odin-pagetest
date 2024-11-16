let humanScore = 0;
let compScore = 0;

let reset = false;

const buttonRock = document.querySelector("#rock");
buttonRock.addEventListener("click", function (e) {playRound("Rock")});

const buttonPaper = document.querySelector("#paper");
buttonPaper.addEventListener("click", function (e) {playRound("Paper")});

const buttonScissors = document.querySelector("#scissors");
buttonScissors.addEventListener("click", function (e) {playRound("Scissors")});

function getComputerChoice(){
    const choices = ["Rock", "Paper", "Scissors"];
    return choices[Math.floor(Math.random()*3)];
}

function playRound(human){
    if(reset){
        humanScore = 0;
        compScore = 0;
        reset = false;
    }
    const comp = getComputerChoice();
    
    let resultDiv = document.getElementById("result");

    let resultMessage = "";

    if(human == comp){
        resultMessage = "We both chose " + human;
      }else{

        let round = [human, comp];

        if(round.includes("Rock") && round.includes("Scissors")){
            if(human == "Rock"){
                humanScore++;
                resultMessage = "You win!";
            }else{
                compScore++;
                resultMessage = "You lose!";
            }
            resultMessage = resultMessage + "\nRock beats Scissors!";
        }
        if(round.includes("Paper") && round.includes("Scissors")){
            if(human == "Scissors"){
                humanScore++;
                resultMessage = "You win!";
            }else{
                compScore++;
                resultMessage = "You lose!";
            }
            resultMessage = resultMessage + "\nScissors beats Paper!";
        }
        if(round.includes("Paper") && round.includes("Rock")){
            if(human == "Paper"){
                humanScore++;
                resultMessage = "You win!";
            }else{
                compScore++;
                resultMessage = "You lose!";
            }
            resultMessage = resultMessage + "\nPaper beats Rock!";
        }
    }
    let humanScoreSpan = document.getElementById("humanScore");
    humanScoreSpan.textContent = humanScore;
    
    let compScoreSpan = document.getElementById("compScore");
    compScoreSpan.textContent = compScore;
   
    if(humanScore == 5){
        resultMessage = "You win the Game!"
        reset = true;
    }
    if(compScore == 5){
        resultMessage = "You lose the Game!"
        reset = true;
    }
    resultDiv.textContent =resultMessage;
}
