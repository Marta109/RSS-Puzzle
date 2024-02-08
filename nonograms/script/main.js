// document.addEventListener("DOMContentLoaded", () => {
// import {gameData} from "./data.js";
import {timer} from "./timer.js";

let receiveGameData = [];
let gameSolution = receiveGameData.solution;
let playerData = [];
let nonogramSize = 5;

let timerStart = false;

//  show nonogram solution
const showNonogram = () => {
  const nonogramItems = document.querySelectorAll(".nonogram-item"),
    mainBoard = document.querySelector(".main-game-board"),
    showSolutionBtn = document.querySelector("#solution"),
    saveGame = document.querySelector("#saveGame");

  let index = 0;
  saveGame.classList.add("btn-disabled");
  mainBoard.style.pointerEvents = "none";

  timerStart = false;
  timer(timerStart);
  console.log(gameSolution);
  gameSolution.forEach((arr) => {
    arr.forEach((el) => {
      nonogramItems[index].classList.remove("cross", "checked");
      if (el === 1) {
        nonogramItems[index].classList.add("checked");
      } else {
        nonogramItems[index].classList.add("cross");
      }
      index++;
    });
  });

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
// -------------   continue game  -------------'

const getData = () => {
  const continueGameBtn = document.querySelector("#continueGame");
  const gameData = JSON.parse(localStorage.getItem("savedGameData"));
  const playerData = JSON.parse(localStorage.getItem("savedPlayerData"));

  gameRestart();
  createBoard(gameData);
  const nonogramItems = document.querySelectorAll(".nonogram-item");
  // mainBoard = document.querySelector(".main-game-board"),
  // showSolutionBtn = document.querySelector("#solution");

  let index = 0;
  // saveGame.classList.add("btn-disabled");
  // mainBoard.style.pointerEvents = "none";

  timerStart = false;
  timer(timerStart);

  playerData.forEach((arr) => {
    arr.forEach((el) => {
      if (el === 1) {
        nonogramItems[index].classList.add("checked");
      } else if (el === 2) {
        nonogramItems[index].classList.add("cross");
      }
      {
      }
      // else {
      //   nonogramItems[index].classList.add("cross");
      // }
      index++;
    });
  });

  // continueGameBtn.removeEventListener("click", getData);
};

const continueGame = () => {
  const continueGameBtn = document.querySelector("#continueGame");

  continueGameBtn.addEventListener("click", getData);
};

// -------------   save game  -------------'
const saveGame = () => {
  const saveGameBtn = document.querySelector("#saveGame"),
    continueGameBtn = document.querySelector("#continueGame");

  saveGameBtn.addEventListener("click", () => {
    const gameDataString = JSON.stringify(receiveGameData);
    const playerDataString = JSON.stringify(playerData);

    localStorage.setItem("savedGameData", gameDataString);
    localStorage.setItem("savedPlayerData", playerDataString);

    continueGameBtn.classList.remove("btn-disabled");
    // isSaveGame = true;
    continueGame();
  });
};

const updateTable = (data) => {
  let sortedData = data.flat();

  sortedData.sort((a, b) => {
    let timeA = parseInt(a.time.replace(/\D/g, ""));
    let timeB = parseInt(b.time.replace(/\D/g, ""));
    return timeA - timeB;
  });

  const table = document.querySelectorAll("tr");
  // console.log(table);

  sortedData.forEach((obj, i) => {
    // console.log(el[0]);
    const tableItem = table[i + 1].querySelectorAll("td");
    Object.values(obj).forEach((el, i) => {
      tableItem[i].textContent = el;
      // console.log(el);
    });
  });
};

// -------------   check game status -------------'
const checkGameStatus = () => {
  if (
    JSON.stringify(playerData).replace("2", "0") ===
    JSON.stringify(gameSolution)
  ) {
    const audio = document.querySelector("#audio");
    audio.src = "./sound/win.mp3";
    audio.addEventListener("loadeddata", function () {
      audio.play();
    });

    const gameModal = document.querySelector(".modal_container"),
      modalContent = document.querySelector(".modal_content"),
      modalTitle = document.querySelector(".modal-title"),
      timerTime = document.querySelector(".timer").textContent,
      nonogramInfo = document.querySelector(".game-title").textContent;

    const savedData = JSON.parse(localStorage.getItem("scoreTable"));

    const newData = [
      {
        time: timerTime,
        level: nonogramInfo
          .substring(
            nonogramInfo.indexOf("Level") + "Level".length,
            nonogramInfo.indexOf("Nonogram")
          )
          .trim(),
        name: nonogramInfo
          .substring(nonogramInfo.lastIndexOf("-") + 1)
          .trim(),
      },
    ];

    if (savedData) {
      if (savedData.length === 5) {
        savedData.shift();
      }
      savedData.push(newData);
      localStorage.setItem("scoreTable", JSON.stringify(savedData));
      updateTable(savedData);
    } else {
      localStorage.setItem("scoreTable", JSON.stringify(newData));
      updateTable(newData);
    }

    gameModal.classList.add("show");
    modalContent.classList.add("show");
    modalTitle.textContent = `Great! You have solved the nonogram in ${timerTime} seconds!`;

    gameRestart();
  }
};

// -------------   change  player  game data  -------------'
const changePlayerData = (el, itemIndex, dataAtt) => {
  const index = +el.getAttribute(dataAtt)[0];
  if (index === 0) {
    playerData[index][itemIndex] = +el.getAttribute(dataAtt)[2];
  } else {
    playerData[index][itemIndex - nonogramSize * index] =
      +el.getAttribute(dataAtt)[2];
  }

  checkGameStatus();
};

/// ------------- change data attribute -------------'
const changeDataAtt = (
  el,
  dataAtt,
  value,
  className,
  lastClassName,
  i
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

  changePlayerData(el, i, dataAtt);
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

const showSolution = () => {
  const showSolutionBtn = document.querySelector("#solution");
  showSolutionBtn.addEventListener("click", showNonogram);
};

// -------------  game start -------------'
const startGame = () => {
  const nonogramItems = document.querySelectorAll(".nonogram-item"),
    dataAtt = "nonogram-item-data";

  gameSolution = receiveGameData.solution;
  resetGame(nonogramItems, dataAtt);
  showSolution();
  changeNonogram();
  saveGame();

  const handleClick = (e, index) => {
    if (!timerStart) {
      timerStart = true;
      timer(timerStart);
    }

    if (e.button === 0) {
      changeDataAtt(e.target, dataAtt, 1, "checked", "cross", index);
    } else if (e.button === 2) {
      changeDataAtt(e.target, dataAtt, 2, "cross", "checked", index);
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
  receiveGameData = gameData;
  startGame();
};
// });

export {createBoard};
