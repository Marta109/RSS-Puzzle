import {gameData as allGameData} from "./data.js";
import {createBoard} from "./main.js";

let firstStart = false;

document.addEventListener("DOMContentLoaded", () => {
  const modalButton = document.querySelector("#modal-btn"),
    waring = document.querySelector(".waring");

  let gameData = {};

  // ------------- select  nonogram for  start game
  const selectNonogram = (level) => {
    const selectNonogram = document.querySelector("#select-nonogram"),
      selectNonogramInfo = document.querySelector(".select-nonogram-info"),
      gameTitle = document.querySelector(".game-title");
    // const gameDecr = document.querySelector(".game-decr");

    selectNonogramInfo.textContent = "";

    selectNonogram.innerHTML =
      '<option value="" disabled="" selected>Select nonogram</option>';

    const data = allGameData[level];
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
      selectLevel = document.querySelector(".select-level");

    gameModal.classList.add("show");
    modalContent.classList.add("show");

    Object.keys(allGameData).forEach((el, i) => {
      const selectOptions = document.createElement("option");
      selectOptions.classList.add("select-options");
      selectOptions.text = el;
      selectOptions.value = el;
      selectLevel.appendChild(selectOptions);
      // console.log("create options");
    });

    selectLevel.addEventListener("change", (e) =>
      selectNonogram(e.target.value)
    );
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
    gameTitle.textContent = "Level Easy - 5x5 Nonogram - tower ";

    gameData = allGameData["Easy - 5x5"].tower;
    createBoard(allGameData["Easy - 5x5"].tower);
    firstStart = !firstStart;
  }
});
