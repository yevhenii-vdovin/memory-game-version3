let countFunction = 0;
startInnerGame(2);

function startInnerGame(countNumber) {
  countFunction++;
  console.log(countFunction);
  let arrayCard = [];
  const test = document.querySelector(".memory-game");

  for (let i = 1; i < countNumber; i++) {
    if (i > 8) {
      break;
      // alert("game over");
      // return startInnerGame(2);
    }
    let currentText = `<div class="memory-card" data-photo="${i}">
    <img class="front-face box__face" src="images/${i}.jpeg" alt="photo" />
    <img
      class="back-face box__face"
      src="images/back-font.png"
      alt="photo"
    />
    <div class="box__face box__face--right"></div>
    <div class="box__face box__face--left"></div>
    <div class="box__face box__face--top"></div>
    <div class="box__face box__face--bottom"></div>
  </div>
  <div class="memory-card" data-photo="${i}">
    <img class="box__face front-face" src="images/${i}.jpeg" alt="photo" />
    <img
      class="box__face back-face"
      src="images/back-font.png"
      alt="photo"
    />
    <div class="box__face box__face--right"></div>
    <div class="box__face box__face--left"></div>
    <div class="box__face box__face--top"></div>
    <div class="box__face box__face--bottom"></div>
  </div>`;
    arrayCard.push(currentText);
    test.innerHTML = arrayCard.join("");
  }
  const cards = document.querySelectorAll(".memory-card");

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard;
  let secondCard;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle("flip");

    if (!hasFlippedCard) {
      //first click
      hasFlippedCard = true;
      firstCard = this;

      return;
    }

    //second card
    // hasFlippedCard = false;
    secondCard = this;

    // do cards match ?
    // console.log(firstCard.dataset.photo);
    // console.log(secondCard.dataset.photo);

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.photo === secondCard.dataset.photo;
    isMatch ? disableCards() : unFlipCards();
  }
  myFuncCalls = 0;
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    const testFlip = document.querySelectorAll(".flip");
    myFuncCalls++;
    console.log(arrayCard.length);
    console.log(myFuncCalls);
    if (arrayCard.length === myFuncCalls) {
      setTimeout(() => {
        startInnerGame(countFunction + 2);
      }, 1100);
    }
    // countFunction--;

    resetBoard();

    // myFuncCalls++;
    // console.log(myFuncCalls);
    // setTimeout(() => {
    //   if (myFuncCalls == countFunction) {
    //   startInnerGame(countFunction + 2);
    //   }
    // }, 500);
  }

  function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach((cards) => {
      let randomPos = Math.floor(Math.random() * 16);
      cards.style.order = randomPos;
    });
  })();

  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}
