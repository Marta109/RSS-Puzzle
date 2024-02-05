document.addEventListener("DOMContentLoaded", () => {
  // ----------- wrapper ------------------
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  document.body.appendChild(wrapper);

  const header = document.createElement("header");
  header.classList.add("header");
  wrapper.appendChild(header);

  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("game-title");
  gameTitle.textContent = "Nonogram";
  header.appendChild(gameTitle);

  const timer = document.createElement("div");
  timer.classList.add("timer", "game-board-cell");
  timer.textContent = "00:00";
  header.appendChild(timer);
  // const gameDecr = document.createElement("p");
  // gameDecr.classList.add("game-decr");
  // // gameDecr.textContent = ;
  // header.appendChild(gameDecr);

  //  ------------- Reset game button-----------
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset game";
  resetBtn.classList.add("reset-game-btn", "modal-btn");
  header.appendChild(resetBtn);

  // -------------  game audio -----------
  const audio = new Audio();
  audio.id = "audio";
  header.appendChild(audio);
  // audio.src = '';
  // audio.autoplay = true;

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
  modalButton.id = "modal-btn";
  modalButton.classList.add("modal-btn");
  modalButton.textContent = "Play";
  modalContent.appendChild(modalButton);

  // ------------- add game board-----------
  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game-board-container");
  wrapper.appendChild(gameContainer);

  const gameGridPromptRow = document.createElement("div");
  gameGridPromptRow.classList.add("game-prompt-top");
  gameContainer.appendChild(gameGridPromptRow);

  const gameBoardItem = document.createElement("div");
  gameBoardItem.classList.add("game-board-empty-item");
  gameGridPromptRow.appendChild(gameBoardItem);

  const boardGridContainer = document.createElement("div");
  boardGridContainer.classList.add("main-grid-container");
  gameContainer.appendChild(boardGridContainer);

  const leftColumn = document.createElement("div");
  leftColumn.classList.add("game-prompt-left");
  boardGridContainer.appendChild(leftColumn);

  const gameGridPromptColumn = document.createElement("div");
  gameGridPromptColumn.classList.add("main-game-board");
  boardGridContainer.appendChild(gameGridPromptColumn);
});
