// document.addEventListener("DOMContentLoaded", () => {
import {timer} from "./timer.js";

let playerData = [];
let nonogramSize = 5;
let timerStart = false;

// -------------   restart game  -------------'
const gameRestart = () => {
  document.querySelector(".game-prompt-top").innerHTML =
    '<div class="game-board-empty-item"></div>';
  document.querySelector(".main-grid-container").innerHTML =
    '<div class="game-prompt-left"></div><div class="main-game-board"></div>';
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
    timerStart = !timerStart;
    timer(timerStart);
  }
};

// -------------   change  player data -------------'
const changePlayerData = (el, itemIndex, dataAtt, gameData) => {
  const index = +el.getAttribute(dataAtt)[0];
  if (index === 0) {
    playerData[index][itemIndex] = +el.getAttribute(dataAtt)[2];
  } else {
    playerData[index][itemIndex - 5 * index] =
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
  const resetBtn = document.querySelector(".reset-game-btn");

  resetBtn.addEventListener("click", () => {
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

// -------------  game start -------------'
const startGame = (gameData) => {
  const nonogramItems = document.querySelectorAll(".nonogram-item");
  const dataAtt = "nonogram-item-data";
  resetGame(nonogramItems, dataAtt);

  const handleClick = (e, index) => {
    if (!timerStart) {
      timerStart = !timerStart;
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
  const gameGridPromptRow = document.querySelector(".game-prompt-top"),
    mainGameBoard = document.querySelector(".main-game-board"),
    leftColumn = document.querySelector(".game-prompt-left");

  playerData = Array.from({length: nonogramSize}, () =>
    Array(nonogramSize).fill(0)
  );

  gameGridPromptRow.style.gridTemplateColumns = `repeat(${
    nonogramSize + 1
  },  minmax(5%, 1fr)`;
  gameGridPromptRow.style.gridTemplateRows = `repeat(1,  minmax(5%, 1fr)`;

  mainGameBoard.style.gridTemplateColumns = `repeat(${nonogramSize}, 1fr`;
  mainGameBoard.style.gridTemplateRows = `repeat(${nonogramSize},  1fr`;

  leftColumn.style.gridTemplateColumns = `repeat(${1},  minmax(5%, 1fr)`;
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

  const leftWidth = leftColumn
    .querySelector(".left-prompt-item")
    .getBoundingClientRect().width;
  const emptyItemWidth = document
    .querySelector(".game-board-empty-item")
    .getBoundingClientRect().width;

  if (leftWidth > 30 && leftWidth > emptyItemWidth) {
    document.querySelector(".game-board-empty-item").style.width =
      leftWidth + "px";
  } else if (emptyItemWidth > 30) {
    document.querySelector(".left-prompt-item").style.width =
      emptyItemWidth + "px";
  } else {
    document.querySelector(".left-prompt-item").style.width = 40 + "px";
    document.querySelector(".game-board-empty-item").style.width =
      40 + "px";
  }

  startGame(gameData);
};
// });

export {createBoard};
