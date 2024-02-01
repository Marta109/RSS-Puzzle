import {gameData as allGameData} from "./data.js";
document.addEventListener("DOMContentLoaded", () => {
  const modalButton = document.querySelector(".modal-btn"),
    waring = document.querySelector(".waring");

  let gameData = {};
  // select  nonogram for start game
  const selectNonogram = (data, level, selectNonogramInfo) => {
    const selectNonogram = document.querySelector("#select-nonogram");

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
      selectNonogramInfo.textContent = `You chose the level ${level}, nonogram - ${e.target.value}`;
      gameData = data[e.target.value];
      waring.textContent = "";
      createNonogramPromptRow(gameData);
      createNonogramPromptColumn(gameData);
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
    console.log(Object.keys(gameData).length > 0);
    if (Object.keys(gameData).length > 0) {
      waring.textContent = "";
      document.querySelector(".modal_container").classList.remove("show");
      document.querySelector(".modal_content").classList.remove("show");
    } else {
      waring.textContent =
        "Please select a nonogram and level to start the game!";
    }
  });

  gameStart();
});
