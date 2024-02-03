// document.addEventListener("DOMContentLoaded", () => {

let playerData = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

// -------------   restart game  -------------'
const gameRestart = (gameModal, modalContent, dataAtt) => {
  gameModal.classList.remove("show");
  modalContent.classList.remove("show");
  playerData = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  // console.log(document.querySelectorAll(".nonogram-item"));
  document.querySelectorAll(".nonogram-item").forEach((el) => {
    el.setAttribute(dataAtt, "0");
    el.classList.remove("cross");
    el.classList.remove("checked");
  });
};

// -------------   check game status -------------'

const checkGameStatus = (playerData, solution, dataAtt) => {
  console.log("playerData=", playerData);
  console.log("solution=", solution);
  const gameModal = document.querySelector(".modal_container"),
    modalContent = document.querySelector(".modal_content"),
    modalButton = document.querySelector(".modal-btn");
  if (JSON.stringify(playerData) === JSON.stringify(solution)) {
    gameModal.classList.add("show");
    modalContent.classList.add("show");
    modalButton.addEventListener("click", () =>
      gameRestart(gameModal, modalContent, dataAtt)
    );
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
  nonogramItems.forEach((el, i) => {
    el.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        changeDataAtt(
          e.target,
          "nonogram-item-data",
          1,
          "checked",
          "cross",
          i,
          gameData
        );
      } else if (e.button === 2) {
        changeDataAtt(
          e.target,
          "nonogram-item-data",
          0,
          "cross",
          "checked",
          i,
          gameData
        );
      }
    });

    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });
};

//  -------------------- create game board -------------------------------
const createBoard = (gameData) => {
  const nonogramSize = Object.keys(gameData.row).length;
  const gameGridPromptRow = document.querySelector(
      ".game-board-grid-prompt-row"
    ),
    gameGridPromptColumn = document.querySelector(
      ".game-board-grid-prompt-column"
    ),
    leftColumn = document.querySelector(".left-column");

  console.log(nonogramSize);
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

    for (const data of gameData.row[i]) {
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
    leftColumnItem.classList.add(
      "game-board-cell",
      "game-board-left-prompt"
    );
    leftColumn.appendChild(leftColumnItem);
    for (const data of gameData.column[i]) {
      const span = document.createElement("span");
      span.textContent = data;
      leftColumnItem.appendChild(span);
    }
  }

  const leftWidth = leftColumn
    .querySelector(".game-board-left-prompt")
    .getBoundingClientRect().width;
  const emptyItemWidth = document
    .querySelector(".game-board-cell-empty")
    .getBoundingClientRect().width;

  if (leftWidth > 30 && leftWidth > emptyItemWidth) {
    document.querySelector(".game-board-cell-empty").style.width =
      leftWidth + "px";
  } else if (emptyItemWidth > 30) {
    document.querySelector(".game-board-left-prompt").style.width =
      emptyItemWidth + "px";
  } else {
    document.querySelector(".game-board-left-prompt").style.width =
      40 + "px";
    document.querySelector(".game-board-cell-empty").style.width =
      40 + "px";
  }

  startGame(gameData);
};
// });

export {createBoard};
