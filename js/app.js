/*
 * Create a list that holds all of your cards
 */
var array = document.getElementsByClassName("card");
var stars = document.getElementsByClassName("fa fa-star");
var starCount = stars.length-1;
var movesCount = document.getElementById("moves");

movesCount.innerHTML = 0;
array = shuffle(array);

var firstCardOpened = false;
var Starttime = false;
var firstCard,secondCard;
var count = 0;
var winCount = 0;

for (var i = 0; i < array.length; i++) {
    array[i].addEventListener('click',function(){
    if(!Starttime) //start time on first click
    {
      InitTime();
      Starttime = true;
    }

    if(this.className!="card match" & this.className!="card open show") // to stop click on already opened cards
    {
      count = count + 1;
      movesCount.textContent = Math.round(count/2);
      if (starCount > 0) {    // change star counts
        if(count===26)
        {
           stars[starCount--].remove();
        }
        else if(count==36)
        {
           stars[starCount--].remove();
        }
      }
      this.className = "card open show";
      if(!firstCardOpened) // check if its first card of pair
      {
        firstCard = this;
        firstCardOpened = true;
      }else{
       secondCard = this;
       if(firstCard != secondCard){ // to disallow same clicks and matching
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

             // Change model Content
             var List = document.getElementById('rating');
             for (var i = 1; i <= starCount; i++) {
                 var inner = document.createElement('I');
                 inner.setAttribute('class','fa fa-star');
                 var li = document.createElement('LI');
                 li.appendChild(inner);
                 List.append(li);
               }

               document.getElementById("performance").innerHTML="Performance: " + performance;
               document.getElementById("timeTaken").innerHTML= "Time Taken: " + timeTaken.toString();
               setTimeout(function () {
                 modal.style.display = "block";
                 reset();
               },100);
          }
        }
        else{  // reset the cards if not match
          secondCard.className="card open show";
          setTimeout(function() {
            secondCard.className="card";
            firstCard.className="card";
            firstCardOpened = false;
            firstCard = 'undefined';
            secondCard = 'undefined';
          },200);
        }
      }
     }
    }
  });
}



// reset grid
function reset(){
  //reshuffle
  array = shuffle(array);
  for (var i = 0; i < array.length; i++) {
    array[i].className = "card";
  }
  //reset timer
  seconds = 0;
  Starttime = false;
  clearInterval(timer);
  sec.innerHTML = seconds;
  //reset game logic variables
  winCount = 0;
  count = 0;
  firstCardOpened = false;
  movesCount.innerHTML = 0;

  //reset stars
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
        temporaryValue = array[currentIndex].childNodes[1].className;
        array[currentIndex].childNodes[1].className = array[randomIndex].childNodes[1].className;
        array[randomIndex].childNodes[1].className = temporaryValue;
    }
    /*for (var i = 0; i < array.length; i++) {  //to check shuffle
      console.log(array[i].childNodes[1].className);
    }*/
    return array;
}

// Timer
var seconds = 0;
var timer;
var sec;
function InitTime() {
  timer = setInterval(function(){
    sec = document.getElementById('seconds');
    sec.innerHTML = seconds;
    seconds = seconds + 1;
  },1000)
}


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

 //Modal Code
 var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
