import {gameData as allGameData} from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const nonogramItems = document.querySelectorAll(".nonogram-item");

  let gameData = {};
  let playerData = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  // // select  nonogram for start game
  // const selectNonogram = (data, level, selectNonogramInfo) => {
  //   const selectNonogram = document.querySelector("#select-nonogram"),
  //     modalButton = document.querySelector(".modal-btn");

  //   selectNonogram.innerHTML =
  //     '<option value="" disabled="" selected>Select nonogram</option>';

  //   Object.keys(data).forEach((el, i) => {
  //     const selectOptions = document.createElement("option");
  //     selectOptions.classList.add("select-options");
  //     selectOptions.text = el;
  //     selectOptions.value = el;
  //     selectNonogram.appendChild(selectOptions);
  //   });

  //   selectNonogram.addEventListener("change", (e) => {
  //     selectNonogramInfo.textContent = `You chose the level ${level}, nonogram - ${e.target.value}`;
  //     gameData = data[e.target.value];
  //     console.log(gameData);
  //     createNonogramPromptRow(gameData);
  //     createNonogramPromptColumn(gameData);
  //   });
  //   modalButton.addEventListener("click", () => {
  //     document.querySelector(".modal_container").classList.remove("show");
  //     document.querySelector(".modal_content").classList.remove("show");
  //   });
  // };

  // //  ------------- open modal start game
  // const gameStart = () => {
  //   const gameModal = document.querySelector(".modal_container"),
  //     modalContent = document.querySelector(".modal_content"),
  //     selectNonogramInfo = document.querySelector(".select-nonogram-info"),
  //     selectLevel = document.querySelector(".select-level");

  //   gameModal.classList.add("show");
  //   modalContent.classList.add("show");
  //   // modalTitle.textContent = "Welcome to the game! Nonogram";

  //   Object.keys(allGameData).forEach((el, i) => {
  //     const selectOptions = document.createElement("option");
  //     selectOptions.classList.add("select-options");
  //     selectOptions.text = el;
  //     selectOptions.value = el;
  //     selectLevel.appendChild(selectOptions);
  //   });

  //   selectLevel.addEventListener("change", (e) => {
  //     selectNonogramInfo.textContent = "";
  //     selectNonogram(
  //       allGameData[`${e.target.value}`],
  //       e.target.value,
  //       selectNonogramInfo
  //     );
  //   });
  // };

  // gameStart();

  //  ------------- create nonogram prompt Row
  const createNonogramPromptRow = (gameData) => {
    const nonogramPromptItems = document.querySelectorAll(
      ".nonogram-prompt-item"
    );

    nonogramPromptItems.forEach((el, i) => {
      for (const data of gameData.row[i]) {
        const span = document.createElement("span");
        span.classList.add("prompt-span");
        span.textContent = data;
        el.appendChild(span);
      }
    });
  };

  // createNonogramPromptRow();

  // ------------- create nonogram prompt column
  const createNonogramPromptColumn = (gameData) => {
    const nonogramPromptItems = document.querySelectorAll(
      ".nonogram-prompt-item-column"
    );

    nonogramPromptItems.forEach((el, i) => {
      for (const data of gameData.column[i]) {
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

  const checkGameStatus = (playerData, dataAtt) => {
    const gameModal = document.querySelector(".modal_container"),
      modalContent = document.querySelector(".modal_content"),
      modalButton = document.querySelector(".modal-btn");
    if (JSON.stringify(playerData) === JSON.stringify(gameData.solution)) {
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
    checkGameStatus(playerData, gameData.solution, dataAtt);
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

  // -------------  game start -------------'
  nonogramItems.forEach((el, i) => {
    el.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        changeDataAtt(
          e.target,
          "nonogram-item-data",
          1,
          "checked",
          "cross",
          i,
          gameData
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
