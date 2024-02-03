document.addEventListener("DOMContentLoaded", () => {
  // ----------- wrapper ------------------
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  document.body.appendChild(wrapper);
  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("game-title");
  gameTitle.textContent = "Nonograms";
  wrapper.appendChild(gameTitle);

  // ------------- add game modal-----------
  const gameModal = document.createElement("div");
  gameModal.classList.add("modal_container");
  wrapper.appendChild(gameModal);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal_content");
  gameModal.appendChild(modalContent);

  const modalTitle = document.createElement("h3");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = "Welcome to the game! Nonogram";
  // modalTitle.textContent = "Great! You have solved the nonogram!";
  modalContent.appendChild(modalTitle);

  //  *******form options*******
  const selectLevel = document.createElement("select");
  selectLevel.classList.add("select-level");
  modalContent.appendChild(selectLevel);

  const selectMessageOption = document.createElement("option");
  selectMessageOption.value = "Easy - 5x5";
  selectMessageOption.text = "Please select the difficulty level";
  selectMessageOption.disabled = true;
  selectMessageOption.selected = true;
  selectLevel.appendChild(selectMessageOption);

  const selectNonogram = document.createElement("select");
  selectNonogram.id = "select-nonogram";
  selectNonogram.classList.add("select-level");
  modalContent.appendChild(selectNonogram);

  const selectNonogramInfo = document.createElement("p");
  selectNonogramInfo.classList.add("select-nonogram-info");
  modalContent.appendChild(selectNonogramInfo);

  const waring = document.createElement("span");
  waring.classList.add("waring");
  modalContent.appendChild(waring);

  const modalButton = document.createElement("button");
  modalButton.classList.add("modal-btn");
  modalButton.textContent = "Play";
  modalContent.appendChild(modalButton);

  // ------------- add game board-----------
  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game-board-container");
  wrapper.appendChild(gameContainer);

  const gameGridPromptRow = document.createElement("div");
  gameGridPromptRow.classList.add("game-board-grid-prompt-row");
  gameContainer.appendChild(gameGridPromptRow);

  const gameBoardItem = document.createElement("div");
  // gameBoardItem.setAttribute("nonogram-item-data", "0");
  gameBoardItem.classList.add("game-board-cell-empty");
  gameGridPromptRow.appendChild(gameBoardItem);


  // const boardGridWrapper = document.createElement("div");
  // boardGridWrapper.classList.add("board-grid-wrapper");
  // gameContainer.appendChild(boardGridWrapper);

  const boardGridContainer = document.createElement("div");
  boardGridContainer.classList.add("board-grid-container");
  gameContainer.appendChild(boardGridContainer);

  const leftColumn = document.createElement("div");
  leftColumn.classList.add("left-column");
  boardGridContainer.appendChild(leftColumn);

  const gameGridPromptColumn = document.createElement("div");
  gameGridPromptColumn.classList.add("game-board-grid-prompt-column");
  boardGridContainer.appendChild(gameGridPromptColumn);
});
