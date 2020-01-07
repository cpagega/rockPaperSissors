const game = document.querySelector('.grid-container');
const buttons = document.querySelectorAll('input');
var playerScore = 0;
var computerScore = 0;

buttons.forEach(button => button.addEventListener('click',beginRound));        


function beginRound(e){

    let playerSelection = e.originalTarget.value;
    let computerSelection = computerPlay();
    let roundResult = playRound(playerSelection, computerSelection);
    incrementScore(roundResult);
    htmlRound(roundResult,playerSelection,computerSelection);
    if (playerScore === 5 || computerScore === 5) htmlGameEnd();   
}

function incrementScore(roundResult){
    if (roundResult === 1)
        playerScore += 1;
    else    
        computerScore += 1;
}


function playRound(playerSelection, computerSelection)

{
    switch(computerSelection){
        case "Rock":
            if (playerSelection === "Paper")
                return 1;
            if (playerSelection === "Scissors")
                return 2;
            if (playerSelection === "Rock")
                return 3;
        case "Paper":
            if (playerSelection === "Scissors")
                return 1;
            if (playerSelection === "Rock")
                return 2;
            if (playerSelection === "Paper")
                return 3;
        case "Scissors":
            if (playerSelection === "Rock")
                return 1;
            if (playerSelection === "Paper")
                return 2;
            if (playerSelection === "Scissors")
                return 3;
        default:
            return -1;
    }
}    
function computerPlay()
//maps random number 1 - 3 to "rock", "paper", "scissors"
{
    const numToObject = {
        1: "Rock",
        2: "Paper",
        3: "Scissors"
    }; 
    n = Math.floor(Math.random()*3)+1;
    return numToObject[n];
}

function htmlRound(roundResult, playerSelection, computerSelection)
{
    const pcScore = document.querySelector('#pc-score');
    const npcScore = document.querySelector('#npc-score');
    const pcChoice = document.querySelector('#pc-choice');
    const npcChoice = document.querySelector('#npc-choice');
    const pcIcon = document.createElement('img');
    const npcIcon = document.createElement('img');
    const nodes = [pcChoice, npcChoice];

    pcIcon.setAttribute('src', './'+playerSelection+'.svg');
    pcIcon.setAttribute('class', 'img-size');

    npcIcon.setAttribute('src', './'+computerSelection+'.svg');
    npcIcon.setAttribute('class', 'img-size');

    nodes.forEach(function(node){    
        if(node.firstChild)node.removeChild(node.firstChild);         
    });

    pcChoice.appendChild(pcIcon);
    npcChoice.appendChild(npcIcon);

    pcScore.textContent = "Your Score: "+playerScore;  
    npcScore.textContent = "Computer Score: "+computerScore;  
}

function htmlGameEnd(){
        removeAllChildren(game);
        var h1 = document.createElement('h1');
        h1.setAttribute('class', 'gameover');
        if (playerScore > computerScore)
            h1.textContent = "You Win!";
        else
            h1.textContent = "Computer Wins.";
        game.appendChild(h1);

        var button = document.createElement('button');
        button.textContent = "Play Again.";
        button.setAttribute('onclick', "window.location.href = './index.html';");
        button.setAttribute('class', 'reload');
        game.appendChild(button);
}

function removeAllChildren(node){
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}