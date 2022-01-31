let fruits = [];
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
    card.setAttribute("value", i);
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

// ! No stress for write this
// ! No stress for write this

function checkCards(card) {
  if (!clicked) {
    clicked = card.srcElement.attributes.value.value;
    // console.log(clicked);
  } else if (clicked && !clicked2) {
    clicked2 = card.srcElement.attributes.value.value;
    win = [...document.querySelectorAll(`*[value='${clicked}']`)];
    // console.log(clicked2);

    if (clicked !== clicked2) {
      // console.log("pas pareil");
      elements = [...document.querySelectorAll(".flip")];
      setTimeout(() => {
        flipCards(elements[0]);
        flipCards(elements[1]);
      }, 1500);
    } else {
      setTimeout(() => {
        for (b = 0; b < win.length; b++) {
          win[b].style.background();
        }
      }, 2000);
    }
    clicked = null;
    clicked2 = null;

    // clicked = null;
    // clicked2 = null;
  }
}

// TODO EXECUTIONS
// TODO EXECUTIONS
// TODO EXECUTIONS
generateCards();

fruits.forEach((fruit) => {
  fruit.addEventListener("click", (e) => {
    flipCards(fruit);
    checkCards(e);
  });
});
