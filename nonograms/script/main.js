document.addEventListener("DOMContentLoaded", () => {
  const promptData = {
    tower: {
      solution: [
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
      ],
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
      for (const data of promptData.tower.column[i]) {
        const span = document.createElement("span");
        span.classList.add("prompt-span-column");
        span.textContent = data;
        el.appendChild(span);
      }
    });
  };

  createNonogramPromptColumn();

  /// ------------- change data attributes -------------'

  const changeDataAtt = (el, dataAtt, value, className, lastClassName) => {
    el.classList.contains(lastClassName)
      ? el.classList.remove(lastClassName)
      : "";

    if (el.classList.contains(className)) {
      el.classList.remove(className);
      el.setAttribute(dataAtt, "0");
    } else {
      el.classList.add(className);
      el.setAttribute(dataAtt, value);
    }
  };

  // -------------  item select

  const nonogramItems = document.querySelectorAll(".nonogram-item");

  nonogramItems.forEach((el) => {
    el.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        // e.target.classList.toggle("checked");

        // if (e.target.classList.contains("checked")) {
        //   e.target.classList.remove("checked");
        //   e.target.setAttribute("nonogram-item-data", "0");
        // } else {
        //   e.target.classList.add("checked");
        //   e.target.setAttribute("nonogram-item-data", "1");
        // }

        // e.target.classList.contains("cross")
        //   ? e.target.classList.remove("cross")
        //   : "";

        changeDataAtt(
          e.target,
          "nonogram-item-data",
          1,
          "checked",
          "cross"
        );
      } else if (e.button === 2) {
        // e.target.classList.toggle("cross");
        // e.target.classList.contains("checked")
        //   ? e.target.classList.remove("checked")
        //   : "";
        changeDataAtt(
          e.target,
          "nonogram-item-data",
          2,
          "cross",
          "checked"
        );
      }

      console.log(e.target.getAttribute("nonogram-item-data"));
    });

    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });
});
