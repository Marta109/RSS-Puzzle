document.addEventListener("DOMContentLoaded", () => {
  // ----------- wrapper ------------------
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  document.body.appendChild(wrapper);
  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("game-title");
  gameTitle.textContent = "Nonograms";
  wrapper.appendChild(gameTitle);

  // ----------  container -----------------
  const container = document.createElement("div");
  container.classList.add("container");
  wrapper.appendChild(container);

  // ------------- add game modal-----------
  const gameModal = document.createElement("div");
  gameModal.classList.add("modal_container");
  container.appendChild(gameModal);

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
  // const selectMessageOptionSecond = document.createElement("option");
  // selectMessageOptionSecond.value = "";
  // selectMessageOptionSecond.text = "Select nonogram";
  // selectMessageOptionSecond.disabled = true;
  // selectMessageOptionSecond.selected = true;
  // selectNonogram.appendChild(selectMessageOptionSecond);
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

  // ----------- nonograms line and columns
  for (let i = 0; i < 5; i++) {
    const divPrompt = document.createElement("div");
    if (i === 0) {
      divPrompt.classList.add("nonogram-prompt");
      container.appendChild(divPrompt);
    }

    const divColumns = document.createElement("div");
    divColumns.classList.add("nonogram-columns");
    divColumns.setAttribute("nonogram-column-data", `${i}`);

    // divColumns.textContent = i;
    container.appendChild(divColumns);

    const divPromptItem = document.createElement("div");
    divPromptItem.classList.add("nonogram-prompt-item_empty");
    divPrompt.appendChild(divPromptItem);
    for (let j = 0; j < 5; j++) {
      // ------------- add prompt for game start
      const divPromptItem = document.createElement("div");
      divPromptItem.classList.add("nonogram-prompt-item");
      divPrompt.appendChild(divPromptItem);

      if (j === 0) {
        const divPromptItem = document.createElement("div");
        divPromptItem.classList.add("nonogram-prompt-item-column");
        divColumns.appendChild(divPromptItem);
      }

      // ------------- add game board-----------
      const div = document.createElement("div");
      div.classList.add("nonogram-item");
      div.setAttribute("nonogram-item-data", "0");
      divColumns.appendChild(div);
    }
  }
});
