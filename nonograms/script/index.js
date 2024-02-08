document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("light");

  // ----------- wrapper ------------------
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  document.body.appendChild(wrapper);

  const nav = document.createElement("nav");
  nav.classList.add("nav");
  wrapper.appendChild(nav);

  const navInfo = document.createElement("nav");
  navInfo.classList.add("navInfo");
  nav.appendChild(navInfo);
  
  const randomGameBtn = document.createElement("button");
  randomGameBtn.classList.add("modal-btn");
  randomGameBtn.textContent = "Random game";
  randomGameBtn.id = "random-game";
  navInfo.appendChild(randomGameBtn);

  const themeToggleBtn = document.createElement("button");
  themeToggleBtn.classList.add("modal-btn");
  themeToggleBtn.id = "modal-toggle";
  navInfo.appendChild(themeToggleBtn);

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  let icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-circle-half-stroke");
  themeToggleBtn.appendChild(icon);

  // icon = document.createElement("i");
  // icon.classList.add("fa-solid", "fa-circle-half-stroke");
  // randomGameBtn.appendChild(icon);

  // -------------  game audio -----------
  const audio = new Audio();
  audio.id = "audio";
  nav.appendChild(audio);
  // audio.src = '';
  // audio.autoplay = true;

  const audioToggleBtn = document.createElement("button");
  audioToggleBtn.classList.add("modal-btn");
  audioToggleBtn.id = "audio-toggle";
  navInfo.appendChild(audioToggleBtn);

  icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-volume-high");
  audioToggleBtn.appendChild(icon);

  audioToggleBtn.addEventListener("click", () => {
    audioToggleBtn.querySelector("i").classList.toggle("fa-volume-off");
    if (audio.muted) {
      audio.muted = false;
    } else {
      audio.muted = true;
    }
  });

  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("game-title");
  gameTitle.textContent = "Nonogram";
  navInfo.appendChild(gameTitle);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset game";
  resetBtn.id = "resetBtn";
  resetBtn.classList.add("modal-btn", "nav-item");
  navInfo.appendChild(resetBtn);
  // const gameDecr = document.createElement("p");
  // gameDecr.classList.add("game-decr");
  // // gameDecr.textContent = ;
  // header.appendChild(gameDecr);

  // ------------- menu -----------
  const menu = document.createElement("div");
  menu.classList.add("menu");
  nav.appendChild(menu);

  //  ------------- menu items -----------

  const solution = document.createElement("button");
  solution.textContent = "Solution";
  solution.id = "solution";
  solution.classList.add("modal-btn", "nav-item");
  menu.appendChild(solution);

  const changeNonogram = document.createElement("button");
  changeNonogram.textContent = "Change Nonogram";
  changeNonogram.id = "changeNonogram";
  changeNonogram.classList.add("modal-btn", "nav-item");
  menu.appendChild(changeNonogram);

  const saveGame = document.createElement("button");
  saveGame.textContent = "Save Game";
  saveGame.id = "saveGame";
  saveGame.classList.add("modal-btn", "nav-item");
  menu.appendChild(saveGame);

  const continueGame = document.createElement("button");
  continueGame.textContent = "Continue last game";
  continueGame.id = "continueGame";
  continueGame.classList.add("modal-btn", "nav-item", "btn-disabled");
  menu.appendChild(continueGame);

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

  const main = document.createElement("main");
  main.classList.add("main");
  wrapper.appendChild(main);

  const timer = document.createElement("div");
  timer.classList.add("timer");
  timer.textContent = "00 : 00";
  main.appendChild(timer);

  // ------------- add game board-----------
  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game-board-container");
  main.appendChild(gameContainer);

  const gameBoardItem = document.createElement("div");
  gameBoardItem.classList.add("game-board-empty-item");
  gameContainer.appendChild(gameBoardItem);

  const gameGridPromptRow = document.createElement("div");
  gameGridPromptRow.classList.add("game-prompt-top");
  gameContainer.appendChild(gameGridPromptRow);

  const boardGridContainer = document.createElement("div");
  boardGridContainer.classList.add("main-grid-container");
  // gameContainer.appendChild(boardGridContainer);

  const leftColumn = document.createElement("div");
  leftColumn.classList.add("game-prompt-left");
  gameContainer.appendChild(leftColumn);

  const gameGridPromptColumn = document.createElement("div");
  gameGridPromptColumn.classList.add("main-game-board");
  gameContainer.appendChild(gameGridPromptColumn);

  // --------- add  high score table ----------
  const scoreTable = document.createElement("div");
  scoreTable.classList.add("score-table");
  main.appendChild(scoreTable);

  const table = document.createElement("table");
  table.classList.add("table");
  scoreTable.appendChild(table);

  let tr = document.createElement("tr");
  table.appendChild(tr);

  ["Time to solve", "Level", "Nonogram name"].forEach((el) => {
    const th = document.createElement("th");
    th.classList.add("table-title");
    th.textContent = el;
    tr.appendChild(th);
  });
  for (let i = 0; i < 5; i++) {
    tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < 3; j++) {
      const td = document.createElement("td");
      td.classList.add("table-item");
      // td.textContent = el;
      tr.appendChild(td);
    }
  }
});
