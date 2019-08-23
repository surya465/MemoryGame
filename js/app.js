// Create a list that holds all of your cards
let card = document.getElementsByClassName("card");
let cards = [...card];
//deck contain all the cards
const deck = document.querySelector(".deck");
//counting the number of moves player moved
let moves = 0;
let counter = document.querySelector(".moves");
//variable matchedCards for that cards are matchedCard
let matchedCards = document.getElementsByClassName("match");
//creating an array for the opened cards to campare them
var cardsOpened = [];

//stars List
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
//close icon in model
let closeIcon = document.getElementById("play-again");
//congratulation model
let modal = document.getElementById("popup");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//getting new deck of cards for playing everytime
window.onload = startGame();

function startGame() {
  var shuffledCards = shuffle(cards);
  //removing all existing classes from each card
  for (var i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(item) {
      deck.appendChild(item);
    });
    //setting all the cards to be disabled like opened, matched cards
    cards[i].classList.remove("show", "open", "match", "disabled");
  }

  //reset moves to zero
  moves = 0;
  counter.innerHTML = moves;
  //reset star rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.visibility = "visible";
  }
  //reset Timer
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 Mins 0 Secs";
  clearInterval(interval);
}
//counter function counts the number of moves that the player has taken
function movesCounter() {
  moves++;
  counter.innerHTML = moves;
  //star rating based on the number of moves taken by the player
  if (moves > 12 && moves < 23) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves >= 23) {
    for (var i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
  //start timer on first moves
  if (moves == 1) {
    startTimer();
  }
}
//
// toggles open and show class to display cards
var displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};
//cardOpen function pushes to an array and check if cards are matched or not
function cardOpen() {
  cardsOpened.push(this);
  //  check length of array and moves to movesCounter function and increment movesCounter
  var len = cardsOpened.length;
  if (len == 2) {
    movesCounter();
    //checking opened cards
    if (cardsOpened[0].type === cardsOpened[1].type) {
      matched();
    } else {
      unmatched();

    }
  }

};
// for when cards are matched
function matched() {
  cardsOpened[0].classList.add("match");
  cardsOpened[1].classList.add("match");
  cardsOpened[0].classList.remove("show", "open");
  cardsOpened[1].classList.remove("show", "open");
  //array again intialize to zero
  cardsOpened = [];

}
// for cards are not matched
function unmatched() {
  cardsOpened[0].classList.add("unmatched");
  cardsOpened[1].classList.add("unmatched");
  disabled();
  setTimeout(function() {
    cardsOpened[0].classList.remove("show", "open", "unmatched");
    cardsOpened[1].classList.remove("show", "open", "unmatched");
    enable();
    cardsOpened = [];
  }, 900);
}
//disable cards temporarily
function disabled() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add("disabled");
  });
}

//enable cards and disable matched Cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCards.length; i++) {
      matchedCards[i].classList.add("disabled");
    }
  });
}
//game Timer
var hour = 0,
  minute = 0,
  second = 0;
var timer = document.querySelector(".timer");
var interval;
//setting the timer
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "Mins " + second + "Secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 900);
}
//close icon on congratulation modal
function closeModal() {
  closeIcon.addEventListener("click", function() {
    modal.classList.remove("show");
    startGame();
  });
}
//conguratulations when all cards are matched
function congratulations() {
  if (matchedCards.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    //show congratulation modal
    modal.classList.add("show");
    //declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;
    //show moves rating time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("star-rating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeIcon on modal
    closeModal();
  };
}


// function for player to play playAgain
function playAgain() {
  modal.classList.remove("show");
  startGame();
}


// loop to add event listners to each card to display by clicking on it
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", displayCard);
  cards[i].addEventListener("click", cardOpen);
  cards[i].addEventListener("click", congratulations);
};
