// document.addEventListener("DOMContentLoaded", () => {
import {gameData} from "./data.js";
import {timer} from "./timer.js";

let playerData = [];
let nonogramSize = 5;
let timerStart = false;
let gameSolution = [];

//  show nonogram solution
const showNonogram = () => {
  const nonogramItems = document.querySelectorAll(".nonogram-item"),
    mainBoard = document.querySelector(".main-game-board"),
    showSolutionBtn = document.querySelector("#solution");

  let index = 0;
  saveGame.classList.add("btn-disabled");
  mainBoard.style.pointerEvents = "none";

  timerStart = false;
  timer(timerStart);

  gameSolution.forEach((arr) => {
    arr.forEach((el) => {
      if (el === 1) {
        nonogramItems[index].classList.add("checked");
      } else {
        nonogramItems[index].classList.add("cross");
      }
      index++;
    });
  });

  // for (let i = 0; i < gameSolution.length; i++) {
  //   for (let j = 0; j < gameSolution[i].length; j++) {
  //     if (gameSolution[i][j] == 1) {
  //       nonogramItems[index].classList.add("checked");
  //     } else {
  //       nonogramItems[index].classList.add("cross");
  //     }
  //     index++;
  //   }
  // }
  showSolutionBtn.removeEventListener("click", showNonogram);
};

// -------------   restart game  -------------'
const gameRestart = () => {
  const showSolutionBtn = document.querySelector("#solution");

  timerStart = false;
  timer(timerStart);

  document.querySelector("#saveGame").classList.remove("btn-disabled");
  document
    .querySelector(".main-game-board")
    .classList.remove("btn-disabled");

  showSolutionBtn.addEventListener("click", showNonogram);

  document.querySelector(".game-board-container").innerHTML =
    '<div class="game-board-empty-item"></div><div class="game-prompt-top"></div><div class="game-prompt-left"></div><div class="main-game-board"></div>';
};

const changeNonogram = () => {
  document
    .querySelector("#changeNonogram")
    .addEventListener("click", () => {
      document.querySelector(".modal_container").classList.add("show");
      document.querySelector(".modal_content").classList.add("show");
      gameRestart();
    });
};

// -------------   check game status -------------'
const checkGameStatus = (playerData, solution) => {
  if (JSON.stringify(playerData) === JSON.stringify(solution)) {
    const audio = document.querySelector("#audio");
    audio.src = "./sound/win.mp3";
    audio.addEventListener("loadeddata", function () {
      audio.play();
    });

    const gameModal = document.querySelector(".modal_container"),
      modalContent = document.querySelector(".modal_content"),
      modalTitle = document.querySelector(".modal-title"),
      timerTime = document.querySelector(".timer");

    gameModal.classList.add("show");
    modalContent.classList.add("show");
    modalTitle.textContent = `Great! You have solved the nonogram in ${timerTime.textContent} seconds!`;

    gameRestart();
  }
};

// -------------   change  player  game data  -------------'
const changePlayerData = (el, itemIndex, dataAtt, gameData) => {
  const index = +el.getAttribute(dataAtt)[0];
  if (index === 0) {
    playerData[index][itemIndex] = +el.getAttribute(dataAtt)[2];
  } else {
    playerData[index][itemIndex - nonogramSize * index] =
      +el.getAttribute(dataAtt)[2];
  }
  checkGameStatus(playerData, gameData.solution);
};

/// ------------- change data attribute -------------'
const changeDataAtt = (
  el,
  dataAtt,
  value,
  className,
  lastClassName,
  i,
  gameData
) => {
  const oldData = el.getAttribute(dataAtt),
    audio = document.querySelector("#audio");

  el.classList.contains(lastClassName)
    ? el.classList.remove(lastClassName)
    : "";

  if (el.classList.contains(className)) {
    el.classList.remove(className);
    el.setAttribute(dataAtt, [oldData[0], 0]);
  } else {
    el.classList.add(className);
    el.setAttribute(dataAtt, [oldData[0], value]);
  }

  //  ---- add audio ---------
  audio.src =
    !el.classList.contains("checked") && !el.classList.contains("cross")
      ? "./sound/blank.mp3"
      : el.classList.contains("cross")
      ? "./sound/cross.mp3"
      : "./sound/checked.mp3";

  audio.addEventListener("loadeddata", function () {
    audio.play();
  });

  changePlayerData(el, i, dataAtt, gameData);
};

// -------------  game reset -------------'
const resetGame = (el, dataAtt) => {
  const resetBtn = document.querySelector("#resetBtn"),
    mainBoard = document.querySelector(".main-game-board"),
    showSolutionBtn = document.querySelector("#solution"),
    saveGameBtn = document.querySelector("#saveGame");

  resetBtn.addEventListener("click", () => {
    saveGameBtn.classList.remove("btn-disabled");
    mainBoard.style.pointerEvents = "auto";

    showSolutionBtn.addEventListener("click", showNonogram);

    playerData = Array.from({length: nonogramSize}, () =>
      Array(nonogramSize).fill(0)
    );
    el.forEach((el) => {
      const oldData = el.getAttribute(dataAtt);
      el.setAttribute(dataAtt, [oldData[0], 0]);
      el.classList.remove("cross");
      el.classList.remove("checked");
    });
  });
};

// const showSolution = (gameSolution) => {
//   const showSolutionBtn = document.querySelector("#solution"),
//     saveGame = document.querySelector("#saveGame"),
//     mainBoard = document.querySelector(".main-game-board"),
//     nonogramItems = document.querySelectorAll(".nonogram-item");

//   showSolutionBtn.addEventListener("click", () => {
//     saveGame.classList.add("btn-disabled");
//     mainBoard.classList.add("btn-disabled");
//     timerStart = false;
//     timer(timerStart);
//     gameSolution.forEach((arr, column) => {
//       arr.forEach((el, index) => {
//         if (el === 1) {
//           if (column === 0) {
//             nonogramItems[index].classList.add("checked");
//           } else {
//             nonogramItems[index + nonogramSize * column].classList.add(
//               "checked"
//             );
//           }
//         } else {
//           if (column === 0) {
//             nonogramItems[index].classList.add("cross");
//           } else {
//             nonogramItems[index + nonogramSize * column].classList.add(
//               "cross"
//             );
//           }
//         }
//       });
//     });
//   });
// };

const showSolution = () => {
  const showSolutionBtn = document.querySelector("#solution");
  showSolutionBtn.addEventListener("click", showNonogram);
};

// -------------  game start -------------'
const startGame = (gameData) => {
  const nonogramItems = document.querySelectorAll(".nonogram-item");
  const dataAtt = "nonogram-item-data";
  gameSolution = gameData.solution;
  resetGame(nonogramItems, dataAtt);
  showSolution();
  changeNonogram();

  const handleClick = (e, index) => {
    if (!timerStart) {
      timerStart = true;
      timer(timerStart);
    }

    if (e.button === 0) {
      changeDataAtt(
        e.target,
        dataAtt,
        1,
        "checked",
        "cross",
        index,
        gameData
      );
    } else if (e.button === 2) {
      changeDataAtt(
        e.target,
        dataAtt,
        0,
        "cross",
        "checked",
        index,
        gameData
      );
    }
  };

  nonogramItems.forEach((el, index) => {
    el.addEventListener("mousedown", (e) => handleClick(e, index));

    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });
};

//  -------------------- create game board -------------------------------
const createBoard = (gameData) => {
  nonogramSize = Object.keys(gameData.top).length;
  const gameBoardContainer = document.querySelector(
      ".game-board-container"
    ),
    gameGridPromptRow = document.querySelector(".game-prompt-top"),
    leftColumn = document.querySelector(".game-prompt-left"),
    mainGameBoard = document.querySelector(".main-game-board");

  playerData = Array.from({length: nonogramSize}, () =>
    Array(nonogramSize).fill(0)
  );
  gameBoardContainer.style.gridTemplateColumns = `repeat(${
    nonogramSize + 1
  },  minmax(5%, 1fr)`;

  gameGridPromptRow.style.gridTemplateColumns = `repeat(${nonogramSize},  minmax(5%, 1fr)`;
  gameGridPromptRow.style.gridTemplateRows = `repeat(1,  minmax(5%, 1fr)`;
  gameGridPromptRow.style.gridColumn = `2/${nonogramSize + 2}`;

  mainGameBoard.style.gridTemplateColumns = `repeat(${nonogramSize}, 1fr`;
  mainGameBoard.style.gridTemplateRows = `repeat(${nonogramSize},  1fr`;
  mainGameBoard.style.gridColumn = `2/${nonogramSize + 2}`;

  leftColumn.style.gridTemplateColumns = `repeat(1,  minmax(5%, 1fr)`;
  leftColumn.style.gridTemplateRows = `repeat(${nonogramSize},  minmax(5%, 1fr)`;

  for (let i = 0; i < nonogramSize; i++) {
    const gamePromptRowItem = document.createElement("div");
    gamePromptRowItem.classList.add("game-board-cell");
    gameGridPromptRow.appendChild(gamePromptRowItem);

    for (const data of gameData.top[i]) {
      const span = document.createElement("span");
      span.textContent = data;
      gamePromptRowItem.appendChild(span);
    }

    for (let j = 0; j < nonogramSize; j++) {
      const nonogramItem = document.createElement("div");
      nonogramItem.classList.add("nonogram-item");
      if (i < nonogramSize - 1 && (i === 4 || i === 9)) {
        nonogramItem.classList.add("nonogram-item-divider");
      }
      nonogramItem.setAttribute("nonogram-item-data", [i, 0]);
      mainGameBoard.appendChild(nonogramItem);
    }

    const leftColumnItem = document.createElement("div");
    leftColumnItem.classList.add("game-board-cell", "left-prompt-item");
    leftColumn.appendChild(leftColumnItem);
    for (const data of gameData.left[i]) {
      const span = document.createElement("span");
      span.textContent = data;
      leftColumnItem.appendChild(span);
    }
  }

  startGame(gameData);
};
// });

export {createBoard};
