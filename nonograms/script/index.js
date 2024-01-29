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
      div.setAttribute("nonogram-item-data", "-");
      divColumns.appendChild(div);
    }
  }
});
