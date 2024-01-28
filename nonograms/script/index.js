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
    const divColumns = document.createElement("div");
    divColumns.classList.add("nonogram-columns");
    divColumns.setAttribute("nonogram-columns", "");
    // divColumns.textContent = i;
    container.appendChild(divColumns);
    for (let j = 0; j < 5; j++) {
      const div = document.createElement("div");
      div.classList.add("nonogram-item");
      div.setAttribute("nonogram-line", "");
      // div.textContent = j;
      divColumns.appendChild(div);
    }
  }
});
