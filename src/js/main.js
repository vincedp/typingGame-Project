"use-strict";

const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-btn");
const playAgainBtn = document.querySelector(".play-again-btn");
const typeTxt = document.querySelector(".type-txt");

const startGame = () => {
  screens[0].classList.toggle("hide");
  screens[1].classList.toggle("hide");
};

typeTxt.addEventListener("click", () => {
  screens[1].classList.toggle("hide");
  screens[2].classList.toggle("hide");
});
playAgainBtn.addEventListener("click", () => {
  screens[1].classList.toggle("hide");
  screens[2].classList.toggle("hide");
});
startBtn.addEventListener("click", startGame);
