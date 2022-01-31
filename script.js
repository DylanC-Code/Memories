let fruits = [];
let cardsFlip = [];
let longueur = fruits.length;
let clicked, clicked2, elements;

//? ???????? ?//
//? FUNCTION ?//
//? ???????? ?//

// * An algorythm for shuffle an array
// * Create by myself

function randomizeArray(array) {
  let l = array.length;

  for (i = 0; i !== 200; i++) {
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
  console.log(card);
}

// ! No stress for write this
// ! No stress for write this

function checkCards(card) {
  if (!clicked) {
    clicked = card.srcElement.attributes.value.value;
  } else if (clicked && !clicked2) {
    clicked2 = card.srcElement.attributes.value.value;

    if (clicked === clicked2) {
      for (h = 0; h < 2; h++) {
        cardsFlip[h].classList.remove("flip");
        cardsFlip[h].classList.add("win");
      }
    } else if (clicked !== clicked2) {
      setTimeout(() => {
        flipCards(cardsFlip[0]);
        flipCards(cardsFlip[1]);
      }, 1500);
    }
    setTimeout(() => {
      cardsFlip = [];
      clicked = null;
      clicked2 = null;
    }, 1600);
  }
}

// TODO EXECUTIONS
// TODO EXECUTIONS
// TODO EXECUTIONS

generateCards();

fruits.forEach((fruit) => {
  fruit.addEventListener("click", (e) => {
    if (cardsFlip.length < 2) {
      cardsFlip.push(fruit);
      flipCards(fruit);
      checkCards(e);
    }
  });
});
