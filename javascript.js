const buttonRock     = document.querySelector("#rock");
const buttonPaper    = document.querySelector("#paper");
const buttonScissors = document.querySelector("#scissors");
const buttonReset    = document.querySelector("#reset");

const paraSign1      = document.querySelector("#humanSign");
const paraSign2      = document.querySelector("#computerSign");
const paraScore1     = document.querySelector("#humanScore");
const paraScore2     = document.querySelector("#computerScore");

const paraRound      = document.querySelector("#roundMessage");
const paraVictory    = document.querySelector("#winnerMessage");

setGame();

// FUNCTIONS

function setGame() {

    humanScore       = 0;
    computerScore    = 0;

    paraScore1.textContent = humanScore;
    paraScore2.textContent = computerScore;
    paraSign1.textContent  = "✨";
    paraSign2.textContent  = "✨";
    paraRound.textContent = "";
    paraVictory.textContent = "";

    buttonRock.addEventListener("click", playMatch);
    buttonPaper.addEventListener("click", playMatch);
    buttonScissors.addEventListener("click", playMatch);
    buttonReset.removeEventListener("click", setGame);
}

function playMatch(clickedButton) {

    if ((humanScore < 5) && (computerScore < 5)) {

        const humanChoice      = getHumanChoice(clickedButton);
        const computerChoice   = getComputerChoice();

        paraSign1.textContent  = humanChoice;
        paraSign2.textContent  = computerChoice;
        
        playRound(humanChoice, computerChoice);
        
        paraScore1.textContent = humanScore;
        paraScore2.textContent = computerScore;
    }

    if (matchOver()) {

        announceVictory();

        buttonRock.removeEventListener("click", playMatch);
        buttonPaper.removeEventListener("click", playMatch);
        buttonScissors.removeEventListener("click", playMatch);

        resetGame();
    }
}

function getHumanChoice(choice) {
    
    let target = choice.target;

    switch (target.id) {
        case "rock":     return "🤜"; break;
        case "paper":    return "🫱"; break;
        case "scissors": return "👉"; break;
        default:         return  "☠️"; break;
    }
}

function getComputerChoice() {
    
    // trying to add more randomness, don't know if it works though
    let random = Math.floor( Math.random()*30 ) % 3;

    switch(random) {
        case 0:  return "🤛"; break;
        case 1:  return "🫲"; break;
        case 2:  return "👈"; break;
        default: return  "☠️"; break;
    }
}

function playRound(human, computer) {
        
    if      ( (human === "🤜" && computer === "🤛") ||
              (human === "🫱" && computer === "🫲") ||
              (human === "👉" && computer === "👈") ) {
            
            return paraRound.textContent = "Tie! " + iconToText(human) + " and " + iconToText(computer) + ".";
    }
    else if ( (human === "🤜" && computer === "👈") ||
              (human === "🫱" && computer === "🤛") ||
              (human === "👉" && computer === "🫲") ) {
            
            humanScore++;
            return paraRound.textContent = "Yes! " + iconToText(human) + " beats " + iconToText(computer) + ".";
    }
    else if ( (human === "🤜" && computer === "🫲") ||
              (human === "🫱" && computer === "👈") ||
              (human === "👉" && computer === "🤛") ) {
            
            computerScore++;
            return paraRound.textContent = "No! " + iconToText(computer) + " beats " + iconToText(human) + ".";
    }
    else    return paraRound.textContent = "Something went wrong.";
}

function iconToText (icon) {
    if      (icon === "🤜" || icon === "🤛") return "Rock";
    else if (icon === "🫱" || icon === "🫲") return "Paper";
    else if (icon === "👉" || icon === "👈") return "Scissors";
    else                                     return "Error";
}

function matchOver() {
    return ((humanScore === 5) || (computerScore === 5))
}

function announceVictory() {
    if (humanScore > computerScore) return (paraVictory.textContent = "You win!");
    else                            return (paraVictory.textContent = "You lose!");
}

function resetGame() {
    buttonReset.addEventListener("click", setGame);
}