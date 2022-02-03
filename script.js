//* *********** *//
//* DECLARATION *//
//* *********** *//
const header = document.querySelector("header");
const startButton = document.querySelector("button");

let fruits = [];
let cardsFlip = [];
let longueur = fruits.length;
let clicked, clicked2, elements;
let timeInt;

//? ???????? ?//
//? FUNCTION ?//
//? ???????? ?//

// * An algorythm for shuffle an array
// * Create by myself
function launchGame() {
  game_section = document.createElement("section");
  game_section.setAttribute("id", "grid");
  document.querySelector("body").appendChild(game_section);
  document.querySelector("#records").remove();
}
function randomizeArray(array) {
  let l = array.length;

  for (i = 0; i !== 1000; i++) {
    let ud = Math.random() > 0.5 ? true : false;
    let hm = Math.ceil(Math.random() * l);
    let oi = Math.floor(Math.random() * l);
    let ni = ud ? oi + hm : oi - hm;

    if (ni <= l - oi - 1 && ni > -1) {
      v1 = array[oi];
      v2 = array[ni];
      array[ni] = v1;
      array[oi] = v2;
    }
  }
}
// * Create and generate memories cards
function generateCards() {
  for (let i = 0; i < 18; i++) {
    card = document.createElement("div");
    card.setAttribute("value", i + 1);
    card.style.background = `0% ${
      100 * -i
    }px no-repeat url(./assets/medias/fruits/cards.png)`;
    card.classList.add("card");
    card.classList.add("backcard");
    fruits.push(card);

    longueur = fruits.length;
    if (i === 17 && longueur < 35) {
      i = -1;
    }
  }
  randomizeArray(fruits);

  for (j = 0; j < longueur; j++) {
    document.getElementById("grid").appendChild(fruits[j]);
  }
}
//* For flip the cards
function flipCards(card) {
  card.classList.toggle("flip");
  card.classList.toggle("backcard");
}

// ! No stress for read this

function checkCard(clicked, clicked2) {
  if (clicked === clicked2) {
    document.getElementById("left").textContent++;
    for (h = 0; h < 2; h++) {
      cardsFlip[h].classList.remove("flip");
      cardsFlip[h].classList.add("win");
    }
  } else if (clicked !== clicked2) {
    setTimeout(() => {
      flipCards(cardsFlip[0]);
      flipCards(cardsFlip[1]);
    }, 1000);
  }
}

function checkCliked(card) {
  if (!clicked) {
    clicked = card.srcElement.attributes.value.value;
  } else if (clicked && !clicked2) {
    clicked2 = card.srcElement.attributes.value.value;

    checkCard(clicked, clicked2);
    setTimeout(() => {
      cardsFlip = [];
      clicked = null;
      clicked2 = null;
    }, 1600);
  }
}
function timer() {
  const timer = document.createElement("h2");
  timer.innerHTML = "<span id='minutes'></span> : <span id='seconds'></span>";
  header.appendChild(timer);

  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  timeInt = setInterval(() => {
    seconds.textContent++;
    maxSec = parseInt(seconds.textContent);

    if (maxSec === 60) {
      seconds.textContent = 0;
      minutes.textContent++;
    }
  }, 1000);
}
function evenLeft() {
  var scores = document.createElement("h3");
  scores.innerHTML = "<span id='left'></span> / 18";
  header.appendChild(scores);

  cardLeft = document.getElementById("left");
  cardLeft.textContent = 0;
}
function endGame() {
  clearInterval(timeInt);
  document.querySelector("header > h1").style.color = "#ffc700";
}
// TODO EXECUTIONS
// TODO EXECUTIONS
// TODO EXECUTIONS
// Create game section and remove records section
startButton.addEventListener("click", (e) => {
  e.preventDefault();

  launchGame();
  generateCards();
});
// Create timer & scoresbord
startButton.addEventListener("click", () => {
  fruits.forEach((fruit) => {
    fruit.addEventListener("click", (e) => {
      if (cardsFlip.length < 2) {
        cardsFlip.push(fruit);
        flipCards(fruit);
        checkCliked(e);
        document.getElementById("left").textContent === "18" ? endGame() : null;
      }
    });
  });
  timer();
  evenLeft();
  document.getElementById("left").addEventListener("click", (e) => {
    console.log(e);
  });
});

