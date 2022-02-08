//~ ~~~~~~~~~~~ ~//
//~ DECLARATION ~//
//~ ~~~~~~~~~~~ ~//
const header = document.querySelector("header");
const h2 = document.querySelector("header > h2");
const h3 = document.querySelector("header > h3");
const main = document.querySelector("main");
const startButton = document.querySelector("button");
const multiplayer = document.querySelectorAll(".player");
const player1 = document.querySelector(".player:nth-of-type(1)");
const player2 = document.querySelector(".player:nth-of-type(2)");

let fruits = [];
let cardsFlip = [];
let longueur = fruits.length;
let clicked, clicked2, timeInt, multi;

//^ ^^^^^^^^ ^//
//^ FUNCTION ^//
//^ ^^^^^^^^ ^//

//~ MASTER FUNCTIONS
function launchGame() {
  createGrid();
  generateCards();
}
function gameLogic() {
  fruits.forEach((fruit) => {
    fruit.addEventListener("click", (e) => {
      if (cardsFlip.length < 2) {
        cardsFlip.push(fruit);
        flipCards(fruit);
        checkCliked(e);
      }
    });
  });
}
function hud() {
  timer();
  evenLeft();
}
function endGame() {
  fruits.forEach((fruit) => {
    fruit.addEventListener("click", () => {
      const spanLeft = document.getElementById("left").textContent;
      if (spanLeft === "1") {
        clearInterval(timeInt);
        location.assign(
          `index.php?date=${recordAndDate()[0]}&record=${recordAndDate()[1]}`
        );
      }
    });
  });
}

//~ ROOT FUNCTIONS
// * An algorythm for shuffle an array(create by myself)
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
  fruits = [];
  for (let i = 0; i < 18; i++) {
    card = document.createElement("div");
    card.setAttribute("value", i + 1);
    card.style.background = `0% ${
      100 * -i
    }px no-repeat url(./assets/image/cards.png)`;
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

//* Check matching cards 1
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
//* Check matching cards 2
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
    }, 1005);
  }
}

//* Create grid and manage it if multiplayer was chose
function createGrid() {
  document.querySelector("#records").remove();
  game_section = document.createElement("section");
  game_section.setAttribute("id", "grid");
  main.appendChild(game_section);
  main.classList.add("main-flex");

  div2 = document.querySelector("main .player:nth-of-type(2)");
  if (div2) {
    div2.remove();
    main.appendChild(div2);
  }
}
//* Timer generator
function timer() {
  h2.innerHTML = "<span id='minutes'></span> : <span id='seconds'></span>";

  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  timeInt = setInterval(() => {
    seconds.textContent++;
    maxSec = parseInt(seconds.textContent);

    if (maxSec === 60) {
      seconds.textContent = 0;
      minutes.textContent++;
    }
  }, 1000);
}
//* Even cards left generator
function evenLeft() {
  h3.innerHTML = "<span id='left'></span> / 18";

  cardLeft = document.getElementById("left");
  cardLeft.textContent = 0;
}
//* Edit and manage date and record for the INSERT request
function recordAndDate() {
  //! Manage seconds timer
  if (seconds.textContent < 10) {
    seconds.textContent = "0" + parseInt(seconds.textContent);
  }

  //! Manage minutes timer
  if (minutes.textContent < 1) {
    minutes.textContent = "00";
  } else if (minutes.textContent > 0 && minutes.textContent < 10) {
    minutes.textContent = "0" + parseInt(minutes.textContent);
  }

  record = `${minutes.textContent}.${seconds.textContent}`;

  let date = Date.now();
  date = new Date(date);
  let option = { year: "numeric", month: "long", day: "numeric" };
  date = date.toLocaleDateString("fr-FR", option);
  return [date, record];
}

function multiplayerOptions() {
  multiplayerHUD();
}
//* Manage the logic behind multiplayer buttons
function choosePlayers() {
  const buttons = document.querySelectorAll(".player");

  //! Asset a value to $multi variable
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (multi === "multi") {
        multi = null;
      } else {
        multi = e.target.getAttribute("value");
      }

      //! Toggle the active class on clicked button
      document.querySelectorAll(".player").forEach((button) => {
        button.classList.toggle("active");
      });
    });
  });
}
//* Generate an different HUD if multiplayer was chose
function multiplayerHUD() {
  if (multi === "multi") {
    main.appendChild(player1);
    main.appendChild(player2);
    player1.classList.add("active");
    player2.classList.remove("active");
    player1.style.pointerEvents = "none";
    player2.style.pointerEvents = "none";
  }
}
//~ ~~~~~~~~~~ ~//
//~ EXECUTIONS ~//
//~ ~~~~~~~~~~ ~//

//* Events on start click
startButton.addEventListener("click", (e) => {
  e.preventDefault();

  multiplayerOptions();

  launchGame();
  gameLogic();
  hud();
  endGame();
});

choosePlayers();
