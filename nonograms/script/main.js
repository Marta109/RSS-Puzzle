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
    );

  // gameGrid.style.gridTemplateColumns = `repeat(${nonogramSize}, 80px)`;
  // gameGrid.style.gridTemplateRows = `repeat(${nonogramSize}, 80px)`;
  for (let i = 0; i < nonogramSize; i++) {
    //  ------------- create nonogram prompt Row
    const gamePromptRowItem = document.createElement("div");
    gamePromptRowItem.classList.add("game-board-cell");
    gameGridPromptRow.appendChild(gamePromptRowItem);

    for (const data of gameData.row[i]) {
      const span = document.createElement("span");
      span.textContent = data;
      gamePromptRowItem.appendChild(span);
    }

    // ------------- create nonogram prompt column
    const gamePromptColumnItem = document.createElement("div");
    gamePromptColumnItem.classList.add("game-board-cell", "cell-column");
    // gamePromptColumnItem.setAttribute("nonogram-column-data", i);
    gameGridPromptColumn.appendChild(gamePromptColumnItem);
    for (const data of gameData.column[i]) {
      const span = document.createElement("span");
      span.textContent = data;
      gamePromptColumnItem.appendChild(span);
    }

    for (let j = 0; j < nonogramSize; j++) {
      const nonogramItem = document.createElement("div");
      nonogramItem.classList.add("game-board-cell", "nonogram-item");
      nonogramItem.setAttribute("nonogram-item-data", [i, 0]);
      gameGridPromptColumn.appendChild(nonogramItem);
    }
  }

  startGame(gameData);
};
// });

export {createBoard};
