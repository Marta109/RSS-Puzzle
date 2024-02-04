// document.addEventListener("DOMContentLoaded", () => {

let playerData = [];

// -------------   restart game  -------------'
const gameRestart = () => {
  document.querySelector(".game-prompt-top").innerHTML =
    '<div class="game-board-empty-item"></div>';
  document.querySelector(".main-grid-container").innerHTML =
    '<div class="game-prompt-left"></div><div class="main-game-board"></div>';
};

// -------------   check game status -------------'

const checkGameStatus = (playerData, solution, dataAtt) => {
  console.log("check status");
  console.log("playerData=", playerData);
  console.log("solution=", solution);
  if (JSON.stringify(playerData) === JSON.stringify(solution)) {
    gameRestart();
    const gameModal = document.querySelector(".modal_container"),
      modalContent = document.querySelector(".modal_content"),
      modalTitle = document.querySelector(".modal-title");

    gameModal.classList.add("show");
    modalContent.classList.add("show");
    modalTitle.textContent = "Great! You have solved the nonogram!";
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
  checkGameStatus(playerData, gameData.solution, dataAtt);
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
  const oldData = el.getAttribute(dataAtt);

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

  changePlayerData(el, i, dataAtt, gameData);
};

// -------------  game start -------------'

const startGame = (gameData) => {
  const nonogramItems = document.querySelectorAll(".nonogram-item");

  const handleClick = (e, index) => {
    if (e.button === 0) {
      changeDataAtt(
        e.target,
        "nonogram-item-data",
        1,
        "checked",
        "cross",
        index,
        gameData
      );
    } else if (e.button === 2) {
      changeDataAtt(
        e.target,
        "nonogram-item-data",
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
  console.log("gameData=", gameData);
  console.log("i create board");

  const nonogramSize = Object.keys(gameData.top).length;
  const gameGridPromptRow = document.querySelector(".game-prompt-top"),
    gameGridPromptColumn = document.querySelector(".main-game-board"),
    leftColumn = document.querySelector(".game-prompt-left");

  playerData = Array.from({length: nonogramSize}, () =>
    Array(nonogramSize).fill(0)
  );

  console.log("playerData=", playerData);
  // console.log(gameGridPromptColumn);
  // console.log(leftColumn);
  gameGridPromptRow.style.gridTemplateColumns = `repeat(${
    nonogramSize + 1
  },  minmax(5%, 1fr)`;
  gameGridPromptRow.style.gridTemplateRows = `repeat(1,  minmax(5%, 1fr)`;

  gameGridPromptColumn.style.gridTemplateColumns = `repeat(${nonogramSize},minmax(5%, 1fr)`;
  gameGridPromptColumn.style.gridTemplateRows = `repeat(${nonogramSize}, minmax(5%, 1fr)`;

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
      nonogramItem.classList.add("game-board-cell", "nonogram-item");
      nonogramItem.setAttribute("nonogram-item-data", [i, 0]);
      gameGridPromptColumn.appendChild(nonogramItem);
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
