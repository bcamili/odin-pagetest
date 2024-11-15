let humanScore = 0;
let compScore = 0;

function getComputerChoice(){
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random()*3)];
}

function getHumanChoice(){
    choice = String(prompt("What's your choice?")).toLowerCase();
    if(choice == "rock" || choice == "paper" || choice == "scissors"){
        return choice;
    }else{
        return "That's not a thing.";
    }
}

function playRound(human, comp){
    if(human == comp){
        console.log("We both chose " + human);
        return
    }

    let round = [human, comp];

    if(round.includes("rock") && round.includes("scissors")){
        if(human == "rock"){
            humanScore++;
            console.log("You win!");
        }else{
            compScore++;
            console.log("You lose!");
        }
        console.log("Rock beats Scissors!");
    }
    if(round.includes("paper") && round.includes("scissors")){
        if(human == "scissors"){
            humanScore++;
            console.log("You win!");
        }else{
            compScore++;
            console.log("You lose!");
        }
        console.log("Scissors beats Paper!");
    }
    if(round.includes("paper") && round.includes("rock")){
        if(human == "paper"){
            humanScore++;
            console.log("You win!");
        }else{
            compScore++;
            console.log("You lose!");
        }
        console.log("Paper beats Rock!");
    }
}

function playGame(){
    console.log("Let's play Rock Paper Scissors!");

    for(let i = 0; i<5; i++){
        playRound(getHumanChoice(), getComputerChoice());
        console.log("Score: " + humanScore + ":" + compScore);
    }

    if(humanScore == compScore){
        console.log("Welp, no winner, I guess...");
    }else if(humanScore>compScore){
        console.log("Congrats! You are the winner!");
    }else{
        console.log("Sorry, you are the loser.");
    }
}

playGame();