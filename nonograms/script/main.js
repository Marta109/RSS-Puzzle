document.addEventListener("DOMContentLoaded", () => {
  const gameData = {
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
      for (const data of gameData.tower.row[i]) {
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
      for (const data of gameData.tower.column[i]) {
        const span = document.createElement("span");
        span.classList.add("prompt-span-column");
        span.textContent = data;
        el.appendChild(span);
      }
    });
  };

  createNonogramPromptColumn();

  // -------------   check game status -------------'
  const checkGameStatus = (gameData, playerData) => {
    let status = true;
    for (const arr of playerData) {
      // console.log(arr);
      for (const value of arr) {
        console.log(value);
      }
    }
  };

  // -------------   change  player data -------------'
  const changePlayerData = (el, itemIndex, dataAtt) => {
    const playerData = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const index = +el.parentNode.getAttribute("nonogram-column-data");
    if (index === 0) {
      playerData[index][itemIndex] = el.getAttribute(dataAtt);
    } else {
      playerData[index][itemIndex - 5 * index] = el.getAttribute(dataAtt);
    }
    checkGameStatus(playerData, gameData.tower.solution);
  };

  /// ------------- change data attribute -------------'
  const changeDataAtt = (
    el,
    dataAtt,
    value,
    className,
    lastClassName,
    i
  ) => {
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

    changePlayerData(el, i, dataAtt);
  };

  // -------------   select items -------------'
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
          i
        );
      } else if (e.button === 2) {
        changeDataAtt(
          e.target,
          "nonogram-item-data",
          2,
          "cross",
          "checked",
          i
        );
      }
    });

    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });
});
