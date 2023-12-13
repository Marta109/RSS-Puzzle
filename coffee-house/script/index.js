document.addEventListener("DOMContentLoaded", () => {
  const burgerMenuBtn = document.querySelector(".burger_menu_btn"),
    navMenu = document.querySelector(".header_nav");

  burgerMenuBtn.addEventListener("click", () => {
    // burgerMenuBtn.classList.toggle("burger_menu_active");
    // navMenu.classList.toggle("header_nav_active");
    const isOpen = burgerMenuBtn.classList.toggle("burger_menu_active");
    navMenu.classList.toggle("header_nav_active", isOpen);
    document.body.classList.toggle("no_scroll", isOpen);
  });

  navMenu.addEventListener("click", (e) => {
    //close burger menu and remove no-scroll
    if (e.target.classList.contains("header_link")) {
      burgerMenuBtn.classList.toggle("burger_menu_active");
      navMenu.classList.toggle("header_nav_active");
      document.body.classList.remove("no_scroll");
    }
  });
});
