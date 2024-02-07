import {gameData as allGameData} from "./data.js";
import {createBoard} from "./main.js";

let firstStart = false;

document.addEventListener("DOMContentLoaded", () => {
  const modalButton = document.querySelector("#modal-btn"),
    waring = document.querySelector(".waring");

  let gameData = {};

  // select  -------------nonogram for game start
  const selectNonogram = (data, level, selectNonogramInfo) => {
    const selectNonogram = document.querySelector("#select-nonogram");
    const gameTitle = document.querySelector(".game-title");
    // const gameDecr = document.querySelector(".game-decr");

    selectNonogram.innerHTML =
      '<option value="" disabled="" selected>Select nonogram</option>';

    Object.keys(data).forEach((el, i) => {
      const selectOptions = document.createElement("option");
      selectOptions.classList.add("select-options");
      selectOptions.text = el;
      selectOptions.value = el;
      selectNonogram.appendChild(selectOptions);
    });

    selectNonogram.addEventListener("change", (e) => {
      waring.textContent = "";
      gameData = data[e.target.value];
      selectNonogramInfo.textContent = `You chose the level ${level}, Nonogram - ${e.target.value}`;
      gameTitle.textContent = `Level ${level} Nonogram - ${e.target.value} `;
      // gameDecr.textContent = `Level ${level} `;
    });
  };

  //  ------------- open modal start game
  const gameStart = () => {
    const gameModal = document.querySelector(".modal_container"),
      modalContent = document.querySelector(".modal_content"),
      selectNonogramInfo = document.querySelector(".select-nonogram-info"),
      selectLevel = document.querySelector(".select-level");

    gameModal.classList.add("show");
    modalContent.classList.add("show");

    Object.keys(allGameData).forEach((el, i) => {
      const selectOptions = document.createElement("option");
      selectOptions.classList.add("select-options");
      selectOptions.text = el;
      selectOptions.value = el;
      selectLevel.appendChild(selectOptions);
    });

    selectLevel.addEventListener("change", (e) => {
      selectNonogramInfo.textContent = "";
      selectNonogram(
        allGameData[`${e.target.value}`],
        e.target.value,
        selectNonogramInfo
      );
    });
  };

  //   close modal and start game
  modalButton.addEventListener("click", () => {
    if (Object.keys(gameData).length > 0) {
      waring.textContent = "";
      document.querySelector(".modal_container").classList.remove("show");
      document.querySelector(".modal_content").classList.remove("show");
      document.querySelector("#audio").pause();

      createBoard(gameData);
      // createNonogramPromptColumn(gameData);
    } else {
      waring.textContent =
        "Please select a nonogram and level to start the game!";
    }
  });

  // gameStart();
  gameStart();

  if (!firstStart) {
    document.querySelector(".modal_container").classList.remove("show");
    document.querySelector(".modal_content").classList.remove("show");
    const gameTitle = document.querySelector(".game-title");
    gameData = allGameData["Easy - 5x5"].tower;
    gameTitle.textContent = "Level Easy - 5x5 Nonogram - tower ";
    createBoard(allGameData["Easy - 5x5"].tower);
    firstStart = !firstStart;
  }

 
});
