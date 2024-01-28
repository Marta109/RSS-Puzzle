document.addEventListener("DOMContentLoaded", () => {
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
