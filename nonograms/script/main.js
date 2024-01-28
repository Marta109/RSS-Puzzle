document.addEventListener("DOMContentLoaded", () => {
  const nonogramItems = document.querySelectorAll(".nonogram-item");
  nonogramItems.forEach((el) => {
    el.addEventListener("mousedown", (e) => {
      console.log(e.target);
      // e.preventDefault();
      if (e.button === 0) {
        console.log("Левая кнопка мыши нажата");
      } else if (e.button === 2) {
        console.log("Правая кнопка мыши нажата");
      }
    });

    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      console.log("Контекстное меню отменено");
    });
  });
  //   console.log(nonogramItems);
});
