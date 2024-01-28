document.addEventListener("DOMContentLoaded", () => {
  // ----------- wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  document.body.appendChild(wrapper);
  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("game-title");
  gameTitle.textContent = "Nonograms";
  wrapper.appendChild(gameTitle);

  // ----------  container
  const container = document.createElement("div");
  container.classList.add("container");
  wrapper.appendChild(container);

  // ----------- nonograms line and columns
  for (let i = 0; i < 5; i++) {
    const divPrompt = document.createElement("div");
    if (i === 0) {
      divPrompt.classList.add("nonogram-prompt");
      divPrompt.setAttribute("nonogram-prompt", `${i + 1}`);
      container.appendChild(divPrompt);
    }

    const divColumns = document.createElement("div");
    divColumns.classList.add("nonogram-columns");
    divColumns.setAttribute("nonogram-columns", "");

    // divColumns.textContent = i;
    container.appendChild(divColumns);

    const divPromptItem = document.createElement("div");
    divPromptItem.classList.add("nonogram-prompt-item_empty");
    divPrompt.appendChild(divPromptItem);
    for (let j = 0; j < 5; j++) {
      const divPromptItem = document.createElement("div");
      divPromptItem.classList.add("nonogram-prompt-item");
      // divPromptItem.textContent = `${j + 1}`; 
      // for (let k = 0; k < 3; k++) {
      //   const span = document.createElement("span");
      //   span.textContent = k;
      //   divPromptItem.appendChild(span);
      // }
      // div.textContent = j;
      divPrompt.appendChild(divPromptItem);
      // }

      //create div
      if (j === 0) {
        const divPromptItem = document.createElement("div");
        divPromptItem.classList.add("nonogram-prompt-item-column");
        divColumns.appendChild(divPromptItem);
        // divPromptItem.textContent = `${j + 1}  2 3 4 5`;
        // for (let k = 0; k < 5; k++) {
        //   const p = document.createElement("p");
        //   p.textContent = k;
        //   divPromptItem.appendChild(p);
        // }
      }
      const div = document.createElement("div");
      div.classList.add("nonogram-item");
      div.setAttribute("nonogram-line", "");
      // div.textContent = j;
      divColumns.appendChild(div);
    }
  }
});
