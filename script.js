//^^ ^^^^^^^^^^^ ^^//
//^^ DECLARATION ^^//
//^^ ^^^^^^^^^^^ ^^//

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
let clicked, clicked2, timeInt, multi, player;

//^ ^^^^^^^^ ^//
//^ FUNCTION ^//
//^ ^^^^^^^^ ^//

//~~ MASTER FUNCTIONS
//~~~~~~~~~~~~~~~~~~~
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
  multi !== "multi" ? soloHUD() : multiplayerHUD();
}
// ! CORRIGER END GAME
function endGame() {
  multi !== "multi" ? endGameSolo() : endGameMulti();
}

//~ ROOT FUNCTIONS

//~~ CREATE COMPONENTS
//~~~~~~~~~~~~~~~~~~~~
//* Create grid and manage it if multiplayer was chose
function createGrid() {
  document.querySelector("#records").remove();
  game_section = document.createElement("section");
  game_section.setAttribute("id", "grid");
  main.appendChild(game_section);
  main.classList.add("main-flex");

  gamer2 = document.querySelector("main .player:nth-of-type(2)");
  if (gamer2) {
    gamer2.remove();
    main.appendChild(gamer2);
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

//~~ MANAGE COMPONENTS
//~~~~~~~~~~~~~~~~~~~~
//* For flip the cards
function flipCards(card) {
  card.classList.toggle("flip");
  card.classList.toggle("backcard");
}
//* For change the player turn
function changePlayer() {
  player === true ? (player = false) : (player = true);
  manageMultiTimer();
}
//* Manage multi timer and check end game
function manageMultiTimer() {
  gamer = player === true ? (gamer = 1) : (gamer = 2);
  minutes = document.querySelector(`#minutesPlayer${gamer}`);
  seconds = document.querySelector(`#secondsPlayer${gamer}`);

  clearInterval(timeInt);
  timeInt = setInterval(() => {
    if (seconds.textContent == "0" && minutes.textContent == "0") {
      clearInterval(timeInt);
      h2.textContent = `Player ${gamer} loose by time`;
    } else if (seconds.textContent == "00" || seconds.textContent == "0") {
      minutes.textContent--;
      seconds.textContent = "59";
    } else {
      seconds.textContent--;
    }
  }, 1000);
}
//* Add point to the score after player find an even
function addPoint() {
  gamer = player === true ? (gamer = 1) : (gamer = 2);
  document.getElementById(`player${gamer}`).textContent++;
}
//~~ CHECKERS EVENTS
//~~~~~~~~~~~~~~~~~~
//* Check matching cards 1
function checkCard(clicked, clicked2) {
  if (clicked === clicked2) {
    multi === "multi"
      ? addPoint()
      : document.getElementById("left").textContent++;
    for (h = 0; h < 2; h++) {
      cardsFlip[h].classList.remove("flip");
      cardsFlip[h].classList.add("win");
    }
  } else if (clicked !== clicked2) {
    setTimeout(() => {
      flipCards(cardsFlip[0]);
      flipCards(cardsFlip[1]);
    }, 1000);
    multi === "multi" ? changePlayer() : null;
  }
}
//* Check matching cards 2
function checkCliked(card) {
  if (!clicked) {
    clicked = card.srcElement.attributes.value.value;
    multi === "multi" ? manageMultiTimer() : null;
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
//* Manage the logic behind multiplayer buttons
function choosePlayers() {
  const buttons = document.querySelectorAll(".player");

  //! Asset a value to $multi variable and $player
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (multi === "multi") {
        multi = null;
        player = true;
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
function endGameSolo() {
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
//! ENDGAMEMULTI TO FINISH
//! ENDGAMEMULTI TO FINISH
//! ENDGAMEMULTI TO FINISH
function endGameMulti() {
  score1 = parseInt(document.getElementById("player1").textContent);
  score2 = parseInt(document.getElementById("player2").textContent);
  totalEven = score1 + score2;

  if (totalEven === 18) {
    if (score1 < score2) {
      h2.textContent = "Player  win with " + score2 + "even";
    } else if (score1 > score2) {
      h2.textContent = "Player 1 win with " + score1 + "even";
    } else {
      h2.textContent = "Egality";
    }
  }
}
//~~ OTHER FUNCTIONS
//~~~~~~~~~~~~~~~~~~
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

//^^ HUD
//~~ MASTER HUD FUNCTION
//~~~~~~~~~~~~~~~~~~~~~~
//* Generate an different HUD if multiplayer was chose or not
function soloHUD() {
  timerSolo(h2);
  evenLeft();
}
function multiplayerHUD() {
  createContainers();
  generateLogoPlayers();
  generateMultiTimer();
  generateScores();
}

//~~~~ SOLO
//* Timer generator for solo player
function timerSolo() {
  h2.innerHTML =
    "<span class='minutes'></span> : <span class='seconds'></span>";

  let minutes = document.querySelector(".minutes");
  let seconds = document.querySelector(".seconds");
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
//~~~~ MULTI
function createContainers() {
  for (p = 0; p < 2; p++) {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("baby-container");
    main.appendChild(playerContainer);
  }
}
function generateLogoPlayers() {
  const babyContainers = [...document.getElementsByClassName("baby-container")];
  let counter = 1;
  babyContainers.forEach((container) => {
    const player = document.createElement("div");
    player.classList.add("player");
    player.style.opacity = 1;
    player.style.cursor = "default";
    player.textContent = counter;
    counter++;
    container.appendChild(player);
  });
}
function generateMultiTimer() {
  const babyContainers = [...document.getElementsByClassName("baby-container")];

  for (b = 0; b < 2; b++) {
    let timer = document.createElement("h2");
    babyContainers[b].appendChild(timer);

    timer.innerHTML =
      "<span id=" +
      `minutesPlayer${b + 1}` +
      "></span> : <span id=" +
      `secondsPlayer${b + 1}` +
      "></span>";

    let minutes = document.querySelector(`#minutesPlayer${b + 1}`);
    let seconds = document.querySelector(`#secondsPlayer${b + 1}`);

    minutes.textContent = "2";
    seconds.textContent = "00";
  }
  player = true;
}
function generateScores() {
  const babyContainers = [...document.getElementsByClassName("baby-container")];

  for (s = 0; s < 2; s++) {
    let score = document.createElement("h3");
    score.textContent = 0;
    score.setAttribute("id", `player${s + 1}`);
    babyContainers[s].appendChild(score);
  }
}
//^ ^^^^^^^^^^ ^//
//^ EXECUTIONS ^//
//^ ^^^^^^^^^^ ^//

//* Events on start click
startButton.addEventListener("click", (e) => {
  e.preventDefault();

  launchGame();

  gameLogic();
  hud();
  endGame();
});

//* Event on player buttons at the lobby
choosePlayers();
