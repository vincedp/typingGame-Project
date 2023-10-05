"use-strict";

const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-btn");
const playAgainBtn = document.querySelector(".play-again-btn");
const textContainer = document.querySelector(".type-txt");
const textInput = document.querySelector(".txt-input");
const timeElement = document.querySelector(".time");
const finalScoreElement = document.querySelector(".final-score");
const scoreElement = document.querySelector(".score");
const progressBarElement = document.querySelector(".progress-bar");
const letterElement = document.querySelector(".type-txt").children;

const STARTING_SCREEN = 0;
const GAME_SCREEN = 1;
const GAME_OVER_SCREEN = 2;
const SECONDS_IN_MINUTE = 60;
const WORD_LENGTH = 5;
const PROGRESS_MAX_VALUE = 100;

let totalTime, startTimer, currentText;
let wordsArray = [];
let userTotalInputs = [];
let currentWordIndex = 0;
let time = 0;

const paragraphsArray = [
  `It was hidden under the log beside the stream. It had been there for as long as Jerry had been alive. He wasn't sure if anyone besides him and his friends knew of its existence. He knew that anyone could potentially find it, but it was well enough hidden that it seemed unlikely to happen. The fact that it had been there for more than 30 years attested to this. So it was quite a surprise when he found the item was missing.`,
  `She was in a hurry. Not the standard hurry when you're in a rush to get someplace, but a frantic hurry. The type of hurry where a few seconds could mean life or death. She raced down the road ignoring speed limits and weaving between cars. She was only a few minutes away when traffic came to a dead standstill on the road ahead.`,
  `The red line moved across the page. With each millimeter it advanced forward, something changed in the room. The actual change taking place was difficult to perceive, but the change was real. The red line continued relentlessly across the page and the room would never be the same.`,
  `Matt told her to reach for the stars, but Veronica thought it was the most ridiculous advice she'd ever received. Sure, it had been well-meaning when he said it, but she didn't understand why anyone would want to suggest something that would literally kill you if you actually managed to achieve it.`,
  `The irony of the situation hadn't escaped her. She had taken years to sculpt the perfect persona with the perfect look that she shared on Instagram. She knew her hundreds of thousands of followers envied that life she showed and stayed engaged with her because they wanted that life too. The truth was that she wanted the perfect life she portrayed more than any of her fans. The fact was that despite all the perfection she shared on social media, her life was actually more of a mess than most.`,
  `Her hand was balled into a fist with her keys protruding out from between her fingers. This was the weapon her father had shown her how to make when she walked alone to her car AFTER work. She wished that she had something a little more potent than keys between her fingers. It would have been nice to have some mace or pepper spray. He had been meaning to buy some but had never gotten around to it. As the mother bear took another step forward with her cubs in tow, she knew her fist with keys wasn't going to be an adequate defense for this situation.`,
  `Debbie had taken George for granted for more than fifteen years now. He wasn't sure what exactly had made him choose this time and place to address the issue, but he decided that now was the time. He looked straight into her eyes and just as she was about to speak, turned away and walked out the door.`,
  `There were only two ways to get out of this mess if they all worked together. The problem was that neither was all that appealing. One would likely cause everyone a huge amount of physical pain while the other would likely end up with everyone in jail. In Sam's mind, there was only one thing to do. He threw everyone else under the bus and he secretly sprinted away leaving the others to take the fall without him.`,
];

// use for development phase
// const paragraphsArray = [
//   `Try project input.`,
//   `The program would generate a lot of new jobs.`,
//   `A dynamo is used to generate electricity.`,
//   `The Employment Minister said the reforms would generate new jobs.`,
//   `He plans to barnstorm across the state to generate public support.`,
//   `This book will continue to generate excitement for a long time.`,
// ];

// TODO Event handler
const startGame = () => {
  toggleScreens(STARTING_SCREEN, GAME_SCREEN);
  generateText();
  generateHTMLMarkUp();
  evaluateInput();
  startTimer = setInterval(timer, 1000);
};

// TODO Event handler
const gameOver = () => {
  toggleScreens(GAME_OVER_SCREEN, GAME_SCREEN);
  generateText();
  generateHTMLMarkUp();
  startTimer = setInterval(timer, 1000);
};

// TODO Event listeners
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", gameOver);

// HELPER FUNCTIONS
const toLowerCase = (str) => str.charAt(0).toLowerCase() + str.slice(1);

const getLastIndex = (item) => item[item.length - 1];

const _2digitTimeFormat = (time) => (time < 10 ? `0${time}` : `${time}`);

const randomizeText = () =>
  paragraphsArray[Math.floor(Math.random() * paragraphsArray.length)];

const toggleUnderlineWord = (wordIndex) =>
  letterElement[wordIndex]?.classList.toggle("active");

const toggleScreens = (fromScreen, toScreen) => {
  screens[fromScreen].classList.toggle("hide");
  screens[toScreen].classList.toggle("hide");
};

// APPLICATION FUNCTIONS
const generateText = () => {
  const currentParagraph = randomizeText();

  const firstWordInArray = currentParagraph.split(" ")[0];

  wordsArray = [
    toLowerCase(firstWordInArray),
    ...currentParagraph.split(" ").slice(1),
  ];
};

const generateHTMLMarkUp = () => {
  let textHTML = "";

  wordsArray.forEach((word) => {
    textHTML += `
      <span class="word">
        ${[...word]
          .map((letter) => `<span class="letter">${letter}</span>`)
          .join("")}
      </span>`;
  });

  currentText = wordsArray[currentWordIndex];
  textContainer.innerHTML = textHTML;
  letterElement[0].classList.toggle("active");
  textInput.focus();
};

const timer = () => (timeElement.innerHTML = ` ${_2digitTimeFormat(++time)}`);

const calculateWPM = () => {
  const userTotalWordNumber = userTotalInputs.length / WORD_LENGTH;
  const timeInMinutesElapsed = +(totalTime / SECONDS_IN_MINUTE).toFixed(1);
  finalScoreElement.innerHTML = `${Math.trunc(
    userTotalWordNumber / timeInMinutesElapsed
  )}`;
};

const progressBar = () => {
  const textMaxValue = PROGRESS_MAX_VALUE / wordsArray.length;
  const progress = currentWordIndex * textMaxValue;
  progressBarElement.setAttribute("value", progress);
};

const evaluateInput = () => {
  let userInput;
  let currentLetterIndex = 0;

  textInput.addEventListener("input", (e) => {
    const wpm = Math.trunc(
      userTotalInputs.length /
        WORD_LENGTH /
        +(time / SECONDS_IN_MINUTE).toFixed(1)
    );

    userInput = e.target.value.trim();

    scoreElement.innerHTML = `${wpm == "Infinity" ? 0 : wpm}`;
  });

  textInput.addEventListener(
    "select",
    (e) => (textInput.selectionStart = textInput.selectionEnd)
  );

  textInput.addEventListener("keydown", (e) => {
    if (
      e.key !== ` ` &&
      e.key !== `Backspace` &&
      e.key !== `Control` &&
      e.key !== `Shift` &&
      e.key !== `Tab` &&
      e.key !== `Alt` &&
      e.key !== `Meta` &&
      e.key !== `Escape` &&
      e.key !== `CapsLock` &&
      e.key !== `ArrowUp` &&
      e.key !== `ArrowDown` &&
      e.key !== `ArrowLeft` &&
      e.key !== `ArrowRight` &&
      e.key !== `Delete` &&
      e.key !== `End` &&
      e.key !== `PageDown` &&
      e.key !== `Insert` &&
      e.key !== `Home` &&
      e.key !== `PageUp` &&
      e.key !== `ScrollLock` &&
      e.key !== `Pause` &&
      e.key !== `F1` &&
      e.key !== `F2` &&
      e.key !== `F3` &&
      e.key !== `F4` &&
      e.key !== `F5` &&
      e.key !== `F6` &&
      e.key !== `F7` &&
      e.key !== `F8` &&
      e.key !== `F9` &&
      e.key !== `F10` &&
      e.key !== `F11` &&
      e.key !== `F12`
    )
      userTotalInputs.push(e.code);

    if (e.shiftKey || e.code == "ShiftLeft") return false;

    if (e.code === "Space" || e.code === "ControLLeft" || e.repeat) {
      e.preventDefault();
      return false;
    }

    // REMOVE INPUT
    if (
      e.code === "Backspace" &&
      userInput.length <= currentText.length &&
      currentLetterIndex > 0
    ) {
      --currentLetterIndex;
      letterElement[currentWordIndex]
        .querySelectorAll(".letter")
        [currentLetterIndex]?.classList?.remove("correct-letter");
      letterElement[currentWordIndex]
        .querySelectorAll(".letter")
        [currentLetterIndex]?.classList?.remove("wrong-letter");
    }

    textInput.addEventListener("keyup", (e) => {
      if (e.shiftKey || e.code === "ControLLeft") return false;

      // CORRECT INPUT
      if (
        userInput[currentLetterIndex] === currentText[currentLetterIndex] &&
        e.code != "Backspace"
      ) {
        letterElement[currentWordIndex]
          .querySelectorAll(".letter")
          [currentLetterIndex]?.classList.add("correct-letter");

        if (currentLetterIndex < currentText.length) ++currentLetterIndex;
      }

      // WRONG INPUT
      if (
        userInput[currentLetterIndex] !== currentText[currentLetterIndex] &&
        textInput.value[currentLetterIndex] &&
        e.code != "Space"
      ) {
        letterElement[currentWordIndex]
          .querySelectorAll(".letter")
          [currentLetterIndex]?.classList.add("wrong-letter");
        if (currentLetterIndex < currentText.length) ++currentLetterIndex;
      }

      // SUBMIT INPUT
      if (
        currentText === textInput.value.trim() &&
        (e.code === "Space" || getLastIndex(currentText) === ".")
      ) {
        toggleUnderlineWord(currentWordIndex);
        toggleUnderlineWord(++currentWordIndex);

        // update progress bar value
        progressBar();

        if (currentText === getLastIndex(wordsArray)) {
          toggleScreens(GAME_SCREEN, GAME_OVER_SCREEN);

          // progress bar resets
          progressBarElement.setAttribute("value", 0);

          // wpm resets
          totalTime = time;
          calculateWPM();
          userTotalInputs = [];

          // stop timer
          clearInterval(startTimer);

          // time resets
          timeElement.innerHTML = `00`;
          scoreElement.innerHTML = `0`;
          time = 0;

          // current word reset to 1st word in the paragraph
          currentWordIndex = 0;
        }

        currentText = wordsArray[currentWordIndex];
        currentLetterIndex = 0;
        textInput.value = "";
      }
    });
  });
};
