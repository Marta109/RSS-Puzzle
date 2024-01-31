import {gameData} from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const nonogramItems = document.querySelectorAll(".nonogram-item");

  let playerData = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  // select form for nonograms
  const selectNonogram = (data) => {
    const selectNonogram = document.querySelector("#select-nonogram");
    // console.log(e.target.value);
    //     console.log(gameData[`${e.target.value}`]);
    //     console.log(Object.keys(gameData[`${e.target.value}`]));
    //     Object.keys(gameData[`${e.target.value}`]).forEach((el, i) => {
    console.log(data);
    // console.log(gameData[`${e.target.value}`]);
    console.log(Object.keys(data));
    Object.keys(data).forEach((el, i) => {
      console.log(el);
      const selectOptions = document.createElement("option");
      selectOptions.classList.add("select-options");
      selectOptions.text = el;
      selectOptions.value = data.el;
      selectNonogram.appendChild(selectOptions);
    });
  };

  //  ------------- start game modal
  const gameStart = () => {
    const gameModal = document.querySelector(".modal_container"),
      modalContent = document.querySelector(".modal_content"),
      modalTitle = document.querySelector(".modal-title"),
      selectLevel = document.querySelector(".select-level");
    // selectNonogram = document.querySelector("#select-nonogram");

    gameModal.classList.add("show");
    modalContent.classList.add("show");
    modalTitle.textContent = "Welcome to the game!";

    Object.keys(gameData).forEach((el, i) => {
      const selectOptions = document.createElement("option");
      selectOptions.classList.add("select-options");
      selectOptions.text = el;
      selectOptions.value = el;
      selectLevel.appendChild(selectOptions);
    });

    selectLevel.addEventListener("change", (e) => {
      selectNonogram(gameData[`${e.target.value}`]);
    });

    // Object.keys(gameData[`${e.target.value}`]).forEach((difficulty) => {
    // const difficultyOptions = document.createElement("option");
    // difficultyOptions.classList.add("difficulty-options");
    // difficultyOptions.value = difficulty;
    // difficultyOptions.text = difficulty;
    // selectDifficulty.appendChild(difficultyOptions);
    // });

    // createNonogramPromptRow(gameData[`${e.target.value}`]);
  };

  gameStart();

  //  ------------- create nonogram prompt Row
  const createNonogramPromptRow = (gameData) => {
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

  // createNonogramPromptRow();

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

  // createNonogramPromptColumn();

  // -------------   restart game  -------------'
  const gameRestart = (gameModal, modalContent, dataAtt) => {
    gameModal.classList.remove("show");
    modalContent.classList.remove("show");
    playerData = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    // console.log(document.querySelectorAll(".nonogram-item"));
    document.querySelectorAll(".nonogram-item").forEach((el) => {
      el.setAttribute(dataAtt, "0");
      el.classList.remove("cross");
      el.classList.remove("checked");
    });
  };

  // -------------   check game status -------------'

  const checkGameStatus = (playerData, gameData, dataAtt) => {
    const gameModal = document.querySelector(".modal_container"),
      modalContent = document.querySelector(".modal_content"),
      modalButton = document.querySelector(".modal-btn");
    if (JSON.stringify(playerData) === JSON.stringify(gameData)) {
      gameModal.classList.add("show");
      modalContent.classList.add("show");
      modalButton.addEventListener("click", () =>
        gameRestart(gameModal, modalContent, dataAtt)
      );
    }
  };

  // -------------   change  player data -------------'
  const changePlayerData = (el, itemIndex, dataAtt) => {
    const index = +el.parentNode.getAttribute("nonogram-column-data");
    if (index === 0) {
      playerData[index][itemIndex] = +el.getAttribute(dataAtt);
    } else {
      playerData[index][itemIndex - 5 * index] = +el.getAttribute(dataAtt);
    }
    console.log(playerData);
    checkGameStatus(playerData, gameData.tower.solution, dataAtt);
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
          0,
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
