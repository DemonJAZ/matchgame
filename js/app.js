/*
 * Create a list that holds all of your cards
 */
var array = document.getElementsByClassName("card");
var stars = document.getElementsByClassName("fa fa-star");
var starCount = stars.length-1;
var movesCount = document.getElementById("moves");
movesCount.innerHTML = 0;
var newarray = shuffle(array);

for (var i = 0; i < array.length; i++) {
  array[i].replaceWith(newarray[i]);
}

var firstCardOpened = false;
var firstCard,secondCard;
var count = 0;
var winCount = 0;
for (var i = 0; i < array.length; i++) {
    array[i].addEventListener('click',function(){
    count = count + 1;
    movesCount.textContent = count;
    if (starCount > 0) {    // change star counts
      if(count===18)
      {
         stars[starCount--].remove();
      }
      else if(count==24)
      {
         stars[starCount--].remove();
      }
    }

    this.className = "card open show";
    if(!firstCardOpened)
    {
      firstCard = this;
      firstCardOpened = true;
    }else{
      secondCard = this;
      if(firstCard.childNodes[1].className === secondCard.childNodes[1].className) // check if cards match
      {
        secondCard.className = "card match";
        firstCard.className = "card match";
        firstCardOpened = false;
        firstCard = 'undefined';
        secondCard = 'undefined';
        winCount = winCount+2;
        if(winCount === 16) // Win condition Game Over
        {
           var performance;
           var timeTaken = seconds;
           if(starCount === 3)
           {
             performance = "Exellent!!";
           }else if (starCount === 2) {
             performance = "Good!!";
           }else{
             performance = "you can do better";
           }

           alert("WON!! \n Performance =" + performance + "\n Time Taken:" + timeTaken + "secs");
           reset();
        }
      }
      else{  // reset th cards if not match
        secondCard.className="card open show";
        setTimeout(function() {
          secondCard.className="card";
          firstCard.className = "card";
          firstCardOpened = false;
          firstCard = 'undefined';
          secondCard = 'undefined';
        },200);
      }
    }
  });
}



// reset grid
function reset(){
  array = shuffle(array);
  for (var i = 0; i < array.length; i++) {
    array[i].className = "card";
  }
  seconds = 0;
  winCount = 0;
  count = 0;
  movesCount.innerHTML = 0;
  while(stars.length<3)
  {
    var a = stars[stars.length-1].cloneNode(true);
    stars[stars.length-1].append(a);
  }
  starCount = stars.length - 1;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Timer
var seconds = 0;
setInterval(function(){
  var sec = document.getElementById('seconds');
  sec.innerHTML = seconds;
  seconds = seconds + 1;
},1000)


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
