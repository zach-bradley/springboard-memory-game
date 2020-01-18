const button = document.querySelector('button');
const startScreen = document.querySelector('#startMenu');
const game = document.querySelector('.gameContainer');
const cards = document.querySelectorAll('.card');
const curScore = document.querySelector('.curScore');
const best = document.querySelector('#best');
const finalScore = document.querySelector('#finalScore');
const restartButton = document.querySelector('#endButton');

const start = function() {
  const game = document.querySelector('#game');
  startScreen.style.display = "none";
  game.style.display = 'flex';
}
button.addEventListener('click', start);
//Add event listeners to all cards
for(let card of cards) {
  card.addEventListener('click', handleClick);
}
const setScore = function() {
  score ++;
  curScore.innerHTML = score;
}
let totalCards = cards.length;
let cardOne = null;
let cardTwo =null;
let totalFlips = 0;
let score = 0;

if(!localStorage.getItem('bestScore')) {
  localStorage.setItem('bestScore', '0')
}

let bestScore = localStorage.getItem('bestScore');
best.innerHTML = bestScore;
//Click card
function handleClick(e) {  
  //Keep track of current card
  let card = e.target.parentElement; 
  //Is the clicked card already flipped?
  if(!card.firstElementChild.classList.contains("card-front")) return;

  //Check if card variables are present
  if(!cardOne || !cardTwo) {
    card.classList.add('flip');
    setScore();

    //Assign vard variables
    cardOne = cardOne || card;
    cardTwo = card === cardOne ? null : card;
  }  
  //Two cards are flipped
  if(cardOne && cardTwo) {      
    let compareOne = cardOne.lastElementChild.children[0].src;
    let compareTwo = cardTwo.lastElementChild.children[0].src;
    //Compare flipped cards
    if(compareOne === compareTwo) {
      //If equal add to totalFlips, clear event listeners from those cards, and reset card variables
      totalFlips += 2;
      cardOne.removeEventListener('click', handleClick);
      cardTwo.removeEventListener('click', handleClick);
      cardOne = null;
      cardTwo = null;
    } else {
      //setTimeout for wrong match and reset card variables
      setTimeout(function() {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');      
        cardOne = null;
        cardTwo = null;
      }, 1000); 
    }
  }
  const endGame = function() {
    const endGame = document.querySelector('#endGame');
    const game = document.querySelector('#game');
    game.style.display="none";
    endGame.style.display="flex";
    if(score < bestScore) {
      localStorage.setItem('bestScore', score);
      finalScore.innerHTML = `New Best Score: ${score}`;
    } 
    if(score >= bestScore) {
      finalScore.innerHTML = `Final score: ${score}`;
    }
  }
  if(totalFlips === totalCards) {
    endGame();
  }
}
const restart = function() {  
  const game = document.querySelector('#game');
  endGame.style.display="none";
  game.style.display="flex";
  cards.forEach(function(card){
    card.classList.remove('flip');
    card.addEventListener('click', handleClick);
  });
  score = 0;
  curScore.innerHTML = 0;
  totalFlips = 0;
}

restartButton.addEventListener('click', restart);


