document.addEventListener("DOMContentLoaded", () => {

  const promptData = {
    tower: {
      row: {
        0: [2],
        1: [4],
        2: [3, 1],
        3: [4],
        4: [2],
      },
      column: {
        0: [1, 1, 1],
        1: [5],
        2: [3],
        3: [1, 1],
        4: [3],
      },
    },
  };

  //  ------------- create nonogram prompt Row
  const createNonogramPromptRow = () => {
    const nonogramPromptItems = document.querySelectorAll(
      ".nonogram-prompt-item"
    );

    nonogramPromptItems.forEach((el, i) => {
      for (const data of promptData.tower.row[i]) {
        console.log(data);
        const span = document.createElement("span");
        span.classList.add("prompt-span");
        span.textContent = data;
        el.appendChild(span);
      }
    });
  };

  createNonogramPromptRow();

  // ------------- create nonogram prompt column
  const createNonogramPromptColumn = () => {
    const nonogramPromptItems = document.querySelectorAll(
      ".nonogram-prompt-item-column"
    );

    nonogramPromptItems.forEach((el, i) => {
      console.log(el);
      for (const data of promptData.tower.column[i]) {
        console.log(data);
        const span = document.createElement("span");
        span.classList.add("prompt-span-column");
        span.textContent = data;
        el.appendChild(span);
      }
    });
  };

  createNonogramPromptColumn();

  // -------------  item select

  const nonogramItems = document.querySelectorAll(".nonogram-item");

  nonogramItems.forEach((el) => {
    el.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        e.target.classList.toggle("checked");
        e.target.classList.contains("cross")
          ? e.target.classList.remove("cross")
          : "";
      } else if (e.button === 2) {
        e.target.classList.toggle("cross");
      }
    });

    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });
});
