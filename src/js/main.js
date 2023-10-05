"use-strict";

const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-btn");
const playAgainBtn = document.querySelector(".play-again-btn");
const textContainer = document.querySelector(".type-txt");
const textInput = document.querySelector(".txt-input");
const letterElement = document.querySelector(".type-txt").children;

const STARTING_SCREEN = 0;
const GAME_SCREEN = 1;
const GAME_OVER_SCREEN = 2;

let currentParagraph;
let wordsArray = [];
let textToTypeMarkup = "";
let currentWordIndex = 0;
let currentLetterIndex = 0;
let currentText;
let userInput;
// let letterMax;
// let isExecuted = false;

const paragraphsArray = [
  `try project`,
  `It was hidden under the log beside the stream. It had been there for as long as Jerry had been alive. He wasn't sure if anyone besides him and his friends knew of its existence. He knew that anyone could potentially find it, but it was well enough hidden that it seemed unlikely to happen. The fact that it had been there for more than 30 years attested to this. So it was quite a surprise when he found the item was missing.`,
  `She was in a hurry. Not the standard hurry when you're in a rush to get someplace, but a frantic hurry. The type of hurry where a few seconds could mean life or death. She raced down the road ignoring speed limits and weaving between cars. She was only a few minutes away when traffic came to a dead standstill on the road ahead.`,
  `The red line moved across the page. With each millimeter it advanced forward, something changed in the room. The actual change taking place was difficult to perceive, but the change was real. The red line continued relentlessly across the page and the room would never be the same.`,
  `"It doesn't take much to touch someone's heart," Daisy said with a smile on her face. "It's often just the little things you do that can change a person's day for the better." Daisy truly believed this to be the way the world worked, but she didn't understand that she was merely a robot that had been programmed to believe this.`,
  `It probably seemed trivial to most people, but it mattered to Tracey. She wasn't sure why it mattered so much to her, but she understood deep within her being that it mattered to her. So for the 365th day in a row, Tracey sat down to eat pancakes for breakfast.`,
  `Matt told her to reach for the stars, but Veronica thought it was the most ridiculous advice she'd ever received. Sure, it had been well-meaning when he said it, but she didn't understand why anyone would want to suggest something that would literally kill you if you actually managed to achieve it.`,
  `The irony of the situation hadn't escaped her. She had taken years to sculpt the perfect persona with the perfect look that she shared on Instagram. She knew her hundreds of thousands of followers envied that life she showed and stayed engaged with her because they wanted that life too. The truth was that she wanted the perfect life she portrayed more than any of her fans. The fact was that despite all the perfection she shared on social media, her life was actually more of a mess than most.`,
  `Her hand was balled into a fist with her keys protruding out from between her fingers. This was the weapon her father had shown her how to make when she walked alone to her car AFTER work. She wished that she had something a little more potent than keys between her fingers. It would have been nice to have some mace or pepper spray. He had been meaning to buy some but had never gotten around to it. As the mother bear took another step forward with her cubs in tow, she knew her fist with keys wasn't going to be an adequate defense for this situation.`,
  `Debbie had taken George for granted for more than fifteen years now. He wasn't sure what exactly had made him choose this time and place to address the issue, but he decided that now was the time. He looked straight into her eyes and just as she was about to speak, turned away and walked out the door.`,
  `There were only two ways to get out of this mess if they all worked together. The problem was that neither was all that appealing. One would likely cause everyone a huge amount of physical pain while the other would likely end up with everyone in jail. In Sam's mind, there was only one thing to do. He threw everyone else under the bus and he secretly sprinted away leaving the others to take the fall without him.`,
];

// const paragraphsArray = [
//   `The program would generate a lot of new jobs.`,
//   `A dynamo is used to generate electricity.`,
//   `The Employment Minister said the reforms would generate new jobs.`,
//   `He plans to barnstorm across the state to generate public support.`,
//   `This book will continue to generate excitement for a long time.`,
// ];

const toggleScreens = (fromScreen, toScreen) => {
  screens[fromScreen].classList.toggle("hide");
  screens[toScreen].classList.toggle("hide");
};

const generateRandomText = () =>
  paragraphsArray[
    Math.floor(Math.random() * paragraphsArray.length)
  ].toLowerCase();

const generateHTMLMarkUp = () => {
  currentParagraph = generateRandomText();

  wordsArray = [...currentParagraph.split(" ")];

  currentText = wordsArray[currentWordIndex];

  wordsArray.forEach((word) => {
    textToTypeMarkup += `
      <span class="word">
        ${[...word]
          .map((letter) => `<span class="letter">${letter}</span>`)
          .join("")}
      </span>`;
  });

  textContainer.innerHTML = textToTypeMarkup;
  letterElement?.[currentWordIndex]?.classList.toggle("active");

  textToTypeMarkup = "";
};

const toggleUnderlineWord = (wordIndex) =>
  letterElement[wordIndex]?.classList.toggle("active");

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

const evaluateInput = () => {
  // text input key down event

  // textInput.addEventListener("input", (e) => {
  var keyEnabledArray = Array(222).fill(true);
  //   word = e.target.value;
  // });

  // gets input when out of focus
  // textInput.addEventListener("change", (e) => {
  //   console.log(e.target.value);
  // });
  textInput.addEventListener("input", (e) => {
    // if (e.data === " ") return false;
    userInput = e.target.value.trim();
  });

  textInput.addEventListener("keydown", (e) => {
    if (e.shiftKey || e.code === "ShiftLeft") {
      // e.preventDefault();
      return false;
    }

    // if (e.code === "Backspace") {
    //   // prevent entry of empty string from user "space bar"
    //   // e.preventDefault();
    //   // return false;
    // }
    if (e.repeat) {
      e.preventDefault();
      return false;
    }

    if (e.code === "Space") {
      // prevent entry of empty string from user "space bar"
      e.preventDefault();
      return false;
    }

    if (e.code === "Backspace") {
      // if (
      //   currentLetterIndex >= 1 &&
      //   textInput.value.length < currentText.length &&
      //   textInput.value[currentLetterIndex] ==
      //     currentLetterIndex[currentLetterIndex]
      // )

      console.log(`\n\nletter index BEFORE: `, currentLetterIndex);
      // currentLetterIndex = currentLetterIndex - 1;
      console.log(`INPUT`, userInput);
      console.log(
        letterElement[currentWordIndex].querySelectorAll(".letter")?.[
          currentLetterIndex
        ]
      );

      console.log(`\nBACKSPACE`);
      console.log(`removing red bg or green text...`);
      // console.log(`letter index BEFORE: `, currentLetterIndex);
      console.log(`current letter: `, userInput[currentLetterIndex]); // userInput[3] but userInput[3] is already undefined
      // console.log(`current letter: `, textInput.value[currentLetterIndex]);
      console.log(`current text index: `, currentText[currentLetterIndex]);
      if (userInput.length <= currentText.length && currentLetterIndex > 0)
        --currentLetterIndex;
      console.log(`current text: `, currentText);
      console.log(`letter index AFTER: `, currentLetterIndex);

      letterElement[currentWordIndex]
        .querySelectorAll(".letter")
        [currentLetterIndex]?.classList?.remove("correct-letter");

      letterElement[currentWordIndex]
        .querySelectorAll(".letter")
        [currentLetterIndex]?.classList?.remove("wrong-letter");

      // console.log(
      //   textInput.value[currentLetterIndex],
      //   currentText[currentLetterIndex],
      //   currentText
      // );
      // --currentLetterIndex;

      // isExecuted = false;

      // console.log("backspace");
      // console.log(currentLetterIndex);
    }

    textInput.addEventListener("keyup", (e) => {
      // console.log(e.target.value);
      // console.log(e.code);
      // textInput.addEventListener("input", (e) => {
      //   userInput = e.target.value;
      // });

      // if (e.repeat) return false;

      // if (e.shiftKey || e.code === "ShiftLeft") {
      //   // return false;
      //   e.preventDefault();
      // }

      if (e.code === "Backspace") {
        // prevent entry of empty string from user "space bar"
        // e.preventDefault();
        // return false;
      }

      // if (e.code === "Space") {
      //   // prevent entry of empty string from user "space bar"
      //   e.preventDefault();
      //   // return false;
      // }

      // if ()

      // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
      // cant get this to work
      if (
        // userInput[currentLetterIndex] === currentText[currentLetterIndex]
        // textInput.value[currentLetterIndex] === currentText[currentLetterIndex] // ---- original
        userInput[currentLetterIndex] === currentText[currentLetterIndex] &&
        // userInput != undefined &&
        // currentText != undefined &&
        e.code != "Backspace"
        // && textInput.value.trim() === currentText &&
        // textInput.value[currentLetterIndex] != undefined &&
        // currentText[currentLetterIndex] != undefined
      ) {
        // isExecuted = true;

        letterElement[currentWordIndex]
          .querySelectorAll(".letter")
          [currentLetterIndex]?.classList.add("correct-letter");

        console.log(`INPUT`, userInput);

        console.log(`\nCORRECT`);
        console.log(`adding green text...`);
        console.log(`letter index BEFORE: `, currentLetterIndex);
        console.log(`current letter: `, textInput.value[currentLetterIndex]);
        console.log(`current text index: `, currentText[currentLetterIndex]);
        if (currentLetterIndex < currentText.length) ++currentLetterIndex;
        // ++currentLetterIndex;
        console.log(`current text: `, currentText);
        console.log(`letter index AFTER: `, currentLetterIndex);
      }

      // else {
      //   console.log(
      //     textInput.value[currentLetterIndex],
      //     currentText[currentLetterIndex]
      //   );
      //   console.log(currentText);

      //   ++currentLetterIndex;
      //   // letterElement[currentWordIndex]
      //   //   .querySelectorAll(".letter")
      //   //   [currentLetterIndex]?.classList.add("wrong-letter");

      //   console.log(currentLetterIndex);
      //   console.log("failed to insert css class");
      // }

      // -------------------------------------

      // need to change this condition
      if (
        // textInput.value[currentLetterIndex] !== currentText[currentLetterIndex] && // original
        userInput[currentLetterIndex] !== currentText[currentLetterIndex] &&
        textInput.value[currentLetterIndex] &&
        e.code != "Space"
        // && !isExecuted
      ) {
        // console.log(
        //   textInput.value[currentLetterIndex],
        //   currentText[currentLetterIndex],
        //   currentText
        // );
        letterElement[currentWordIndex]
          .querySelectorAll(".letter")
          [currentLetterIndex]?.classList.add("wrong-letter");

        console.log(`INPUT`, userInput);

        console.log(`\nWRONG`);
        console.log(`adding red bg...`);
        console.log(`letter index BEFORE: `, currentLetterIndex);
        console.log(`current letter: `, userInput[currentLetterIndex]);
        // console.log(`current letter: `, textInput.value[currentLetterIndex]);
        console.log(`current text index: `, currentText[currentLetterIndex]);
        if (currentLetterIndex < currentText.length) ++currentLetterIndex;
        // ++currentLetterIndex;
        console.log(`current text: `, currentText);
        console.log(`letter index AFTER: `, currentLetterIndex);

        // ++currentLetterIndex;
        // console.log(currentLetterIndex);
        // console.log("Add red bg");
      }
      // -------------------------------------

      // if (e.code === "Backspace") {
      //   // if (
      //   //   currentLetterIndex >= 1 &&
      //   //   textInput.value.length < currentText.length &&
      //   //   textInput.value[currentLetterIndex] ==
      //   //     currentLetterIndex[currentLetterIndex]
      //   // )

      //   console.log(`\n\nletter index BEFORE: `, currentLetterIndex);
      //   // currentLetterIndex = currentLetterIndex - 1;
      //   console.log(`INPUT`, userInput);
      //   console.log(
      //     letterElement[currentWordIndex].querySelectorAll(".letter")?.[
      //       currentLetterIndex
      //     ]
      //   );

      //   console.log(`\nBACKSPACE`);
      //   console.log(`removing red bg or green text...`);
      //   // console.log(`letter index BEFORE: `, currentLetterIndex);
      //   console.log(`current letter: `, userInput[currentLetterIndex]); // userInput[3] but userInput[3] is already undefined
      //   // console.log(`current letter: `, textInput.value[currentLetterIndex]);
      //   console.log(`current text index: `, currentText[currentLetterIndex]);
      //   if (userInput.length < currentText.length && currentLetterIndex > 0)
      //     --currentLetterIndex;
      //   console.log(`current text: `, currentText);
      //   console.log(`letter index AFTER: `, currentLetterIndex);

      //   letterElement[currentWordIndex]
      //     .querySelectorAll(".letter")
      //     [currentLetterIndex]?.classList?.remove("correct-letter");

      //   letterElement[currentWordIndex]
      //     .querySelectorAll(".letter")
      //     [currentLetterIndex]?.classList?.remove("wrong-letter");

      //   // console.log(
      //   //   textInput.value[currentLetterIndex],
      //   //   currentText[currentLetterIndex],
      //   //   currentText
      //   // );
      //   // --currentLetterIndex;

      //   // isExecuted = false;

      //   // console.log("backspace");
      //   // console.log(currentLetterIndex);
      // }

      // console.log(userInput[0]);
      // console.log(userInput[1]);
      // console.log(userInput[2]);
      // console.log(userInput[3]);
      // console.log(userInput[4]);

      // ----------------------------------------------------------------------------------------------------------------------------------------------------------------

      // user input and current text matches
      if (currentText === textInput.value.trim() && e.code === "Space") {
        // remove current underline
        toggleUnderlineWord(currentWordIndex);

        ++currentWordIndex;

        // add underline to current text
        toggleUnderlineWord(currentWordIndex);

        // user finish text
        if (currentText === wordsArray[wordsArray.length - 1]) {
          // display game over screen
          toggleScreens(GAME_SCREEN, GAME_OVER_SCREEN);

          // reset index to zero to play again
          currentWordIndex = 0;
        }

        // next text
        currentText = wordsArray[currentWordIndex];
        currentLetterIndex = 0;
        // empty text input for every  word
        textInput.value = "";
      }
    });
  });

  // textInput.addEventListener("keyup", (e) => {
  //   // console.log(e.target.value);
  //   // console.log(e.code);
  //   // textInput.addEventListener("input", (e) => {
  //   //   userInput = e.target.value;
  //   // });

  //   // if (e.repeat) return false;

  //   if (e.shiftKey || e.code === "ShiftLeft") {
  //     // return false;
  //     e.preventDefault();
  //   }

  //   if (e.code === "Backspace") {
  //     // prevent entry of empty string from user "space bar"
  //     // e.preventDefault();
  //     // return false;
  //   }
  //   if (e.code === "Space") {
  //     // prevent entry of empty string from user "space bar"
  //     e.preventDefault();
  //     // return false;
  //   }

  //   // if ()

  //   // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //   // cant get this to work
  //   if (
  //     // userInput[currentLetterIndex] === currentText[currentLetterIndex]
  //     // textInput.value[currentLetterIndex] === currentText[currentLetterIndex] // ---- original
  //     userInput[currentLetterIndex] === currentText[currentLetterIndex] &&
  //     // userInput != undefined &&
  //     // currentText != undefined &&
  //     e.code != "Backspace"
  //     // && textInput.value.trim() === currentText &&
  //     // textInput.value[currentLetterIndex] != undefined &&
  //     // currentText[currentLetterIndex] != undefined
  //   ) {
  //     // isExecuted = true;

  //     letterElement[currentWordIndex]
  //       .querySelectorAll(".letter")
  //       [currentLetterIndex]?.classList.add("correct-letter");

  //     console.log(`INPUT`, userInput);

  //     console.log(`\nCORRECT`);
  //     console.log(`adding green text...`);
  //     console.log(`letter index BEFORE: `, currentLetterIndex);
  //     console.log(`current letter: `, textInput.value[currentLetterIndex]);
  //     console.log(`current text index: `, currentText[currentLetterIndex]);
  //     if (currentLetterIndex < currentText.length) ++currentLetterIndex;
  //     // ++currentLetterIndex;
  //     console.log(`current text: `, currentText);
  //     console.log(`letter index AFTER: `, currentLetterIndex);
  //   }

  //   // else {
  //   //   console.log(
  //   //     textInput.value[currentLetterIndex],
  //   //     currentText[currentLetterIndex]
  //   //   );
  //   //   console.log(currentText);

  //   //   ++currentLetterIndex;
  //   //   // letterElement[currentWordIndex]
  //   //   //   .querySelectorAll(".letter")
  //   //   //   [currentLetterIndex]?.classList.add("wrong-letter");

  //   //   console.log(currentLetterIndex);
  //   //   console.log("failed to insert css class");
  //   // }

  //   // -------------------------------------

  //   // need to change this condition
  //   if (
  //     // textInput.value[currentLetterIndex] !== currentText[currentLetterIndex] && // original
  //     userInput[currentLetterIndex] !== currentText[currentLetterIndex] &&
  //     textInput.value[currentLetterIndex] &&
  //     e.code != "Space"
  //     // && !isExecuted
  //   ) {
  //     // console.log(
  //     //   textInput.value[currentLetterIndex],
  //     //   currentText[currentLetterIndex],
  //     //   currentText
  //     // );
  //     letterElement[currentWordIndex]
  //       .querySelectorAll(".letter")
  //       [currentLetterIndex]?.classList.add("wrong-letter");

  //     console.log(`INPUT`, userInput);

  //     console.log(`\nWRONG`);
  //     console.log(`adding red bg...`);
  //     console.log(`letter index BEFORE: `, currentLetterIndex);
  //     console.log(`current letter: `, userInput[currentLetterIndex]);
  //     // console.log(`current letter: `, textInput.value[currentLetterIndex]);
  //     console.log(`current text index: `, currentText[currentLetterIndex]);
  //     if (currentLetterIndex < currentText.length) ++currentLetterIndex;
  //     // ++currentLetterIndex;
  //     console.log(`current text: `, currentText);
  //     console.log(`letter index AFTER: `, currentLetterIndex);

  //     // ++currentLetterIndex;
  //     // console.log(currentLetterIndex);
  //     // console.log("Add red bg");
  //   }
  //   // -------------------------------------

  //   if (e.code === "Backspace") {
  //     // if (
  //     //   currentLetterIndex >= 1 &&
  //     //   textInput.value.length < currentText.length &&
  //     //   textInput.value[currentLetterIndex] ==
  //     //     currentLetterIndex[currentLetterIndex]
  //     // )

  //     console.log(`\n\nletter index BEFORE: `, currentLetterIndex);
  //     // currentLetterIndex = currentLetterIndex - 1;
  //     console.log(`INPUT`, userInput);
  //     console.log(
  //       letterElement[currentWordIndex].querySelectorAll(".letter")?.[
  //         currentLetterIndex
  //       ]
  //     );

  //     console.log(`\nBACKSPACE`);
  //     console.log(`removing red bg or green text...`);
  //     // console.log(`letter index BEFORE: `, currentLetterIndex);
  //     console.log(`current letter: `, userInput[currentLetterIndex]); // userInput[3] but userInput[3] is already undefined
  //     // console.log(`current letter: `, textInput.value[currentLetterIndex]);
  //     console.log(`current text index: `, currentText[currentLetterIndex]);
  //     if (userInput.length < currentText.length && currentLetterIndex > 0)
  //       --currentLetterIndex;
  //     console.log(`current text: `, currentText);
  //     console.log(`letter index AFTER: `, currentLetterIndex);

  //     letterElement[currentWordIndex]
  //       .querySelectorAll(".letter")
  //       [currentLetterIndex]?.classList?.remove("correct-letter");

  //     letterElement[currentWordIndex]
  //       .querySelectorAll(".letter")
  //       [currentLetterIndex]?.classList?.remove("wrong-letter");

  //     // console.log(
  //     //   textInput.value[currentLetterIndex],
  //     //   currentText[currentLetterIndex],
  //     //   currentText
  //     // );
  //     // --currentLetterIndex;

  //     // isExecuted = false;

  //     // console.log("backspace");
  //     // console.log(currentLetterIndex);
  //   }

  //   // console.log(userInput[0]);
  //   // console.log(userInput[1]);
  //   // console.log(userInput[2]);
  //   // console.log(userInput[3]);
  //   // console.log(userInput[4]);

  //   // ----------------------------------------------------------------------------------------------------------------------------------------------------------------

  //   // user input and current text matches
  //   if (currentText === textInput.value.trim() && e.code === "Space") {
  //     // remove current underline
  //     toggleUnderlineWord(currentWordIndex);

  //     ++currentWordIndex;

  //     // add underline to current text
  //     toggleUnderlineWord(currentWordIndex);

  //     // user finish text
  //     if (currentText === wordsArray[wordsArray.length - 1]) {
  //       // display game over screen
  //       toggleScreens(GAME_SCREEN, GAME_OVER_SCREEN);

  //       // reset index to zero to play again
  //       currentWordIndex = 0;
  //     }

  //     // next text
  //     currentText = wordsArray[currentWordIndex];
  //     currentLetterIndex = 0;
  //     // empty text input for every  word
  //     textInput.value = "";
  //   }
  // });
};

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

// TODO
const startGame = () => {
  toggleScreens(STARTING_SCREEN, GAME_SCREEN);
  textInput.focus();
  generateHTMLMarkUp();
  evaluateInput();
};

// TODO
const game = () => {
  toggleScreens(GAME_SCREEN, GAME_OVER_SCREEN);
};

// TODO
const gameOver = () => {
  toggleScreens(GAME_OVER_SCREEN, GAME_SCREEN);

  generateHTMLMarkUp();
};

// welcome screen to game screen
startBtn.addEventListener("click", startGame);

// game screen to game over screen
// textContainer.addEventListener("click", game);

// game over screen to game over screen
playAgainBtn.addEventListener("click", gameOver);
