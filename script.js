'use strict';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let currentScore, activePlayer, scores, playing;
const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  document.getElementById(`name--${activePlayer}`).textContent =
    activePlayer == 0 ? 'Lố thúi' : 'Ken Pro';
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  document.getElementById(`name--${activePlayer}`).textContent =
    activePlayer == 0 ? 'Tới Lố thúi' : 'Tới Ken Pro';
};
const init = function () {
  btnHold.disabled = false;
  btnRoll.disabled = false;
  btnHold.style.cursor = 'pointer';
  btnRoll.style.cursor = 'pointer';
  scores = [0, 0];
  playing = true;
  activePlayer = 0;

  score0El.textContent = score1El.textContent = 0;
  current0El.textContent = current1El.textContent = currentScore = 0;

  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active', 'player--winner');
  player0.classList.remove('player--winner');
  document.getElementById(`name--0`).textContent = 'Tới Lố thúi';
  document.getElementById(`name--1`).textContent = 'Ken Pro';
};
init();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add('player--active');
    } else {
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');
      changePlayer();
    }
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
btnHold.addEventListener('click', function () {
  if (playing) {
    //add currentScore vao score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      btnHold.disabled = true;
      btnRoll.disabled = true;
      btnHold.style.cursor = 'not-allowed';
      btnRoll.style.cursor = 'not-allowed';
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent =
        activePlayer == 0 ? 'Lố thúi WIN' : 'Ken Pro WIN';
    } else {
      changePlayer();
    }
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
btnNew.addEventListener('click', init);
