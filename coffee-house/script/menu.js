document.addEventListener("DOMContentLoaded", function () {
  const drinks_menu = document.querySelector(".drinks_menu"),
    menu_btn_items = document.querySelectorAll(".menu_item"),
    modal_backdrop = document.querySelector(".backdrop"),
    modal_close = document.querySelector(".modal_close"),
    loadMoreBtn = document.querySelector(".refresh_btn");

  const dataUrl = "./data/products.json";

  fetch(dataUrl)
    .then((response) => response.json())
    .then((menuData) => {
      handleData(menuData);
    })
    .catch((error) => {
      console.error("Error handling data:", error);
    });

  let coffeeMenu = "",
    teaMenu = "",
    dessertMenu = "";

  function handleData(data) {
    (coffeeMenu = data.filter((item) => item.category === "coffee")),
      (teaMenu = data.filter((item) => item.category === "tea")),
      (dessertMenu = data.filter((item) => item.category === "dessert"));

    createMenu(coffeeMenu);
  }

  menu_btn_items.forEach((el) => {
    el.addEventListener("click", (e) => {
      let selectMenu = e.target.value
        ? e.target.value
        : e.target.parentElement.value;

      menu_btn_items.forEach((item) => {
        item.classList.remove("selected");
      });

      el.classList.add("selected");

      if (selectMenu == "coffee") {
        createMenu(coffeeMenu, selectMenu);
      } else if (selectMenu == "tea") {
        createMenu(teaMenu, selectMenu);
      } else if (selectMenu == "dessert") {
        createMenu(dessertMenu, selectMenu);
      }
      loadMoreBtn.style.display = "";
      addCardEventListeners();
    });
  });

  function createMenu(data, itmName = "coffee") {
    drinks_menu.innerHTML = "";

    let index = 1;
    data.forEach((drinkData) => {
      drinks_menu.innerHTML += `
            <div class="card">
          <div class="card_img_container">
            <img class="card_img_item" src="./img/menu/${itmName}-${index}.png" alt="${itmName}" />
          </div>
          <div class="drink_descr">
            <h3>${drinkData.name}</h3>
            <p>${drinkData.description}</p>
            <div class="price">$${drinkData.price}</div>
          </div>
        </div>
      `;
      index++;
    });
    addCardEventListeners(data);
  }

  function addCardEventListeners(data) {
    drinks_menu.querySelectorAll(".card").forEach((card, index) => {
      card.addEventListener("click", () => {
        modal_backdrop.style.display = "flex";
        data && index >= 0 ? showModal(data, index) : "";
      });
    });
  }

  function showModal(data, index) {
    document.body.classList.add("scroll-lock");

    data = data[index];
    const modal = document.querySelector(".modal");

    modal.innerHTML = ` 
    <div class="modal-content">
    <div class="modal_img"> <img src="./img/menu/${data.category}-${
      index + 1
    }.png" alt="Product-${index + 1}" /></div>
    <div class="modal_descr">
      <h2 id="modal_title" class="modal_title">${data.name}</h3>
        <p id="modal_drink_descr" class="modal_drink_descr">${
          data.description
        }</p>
        <div class="modal_drink_size">
          <p class="modal_drink_descr">Size</p>
          <div class="size_btn">
            <button class="size_btn_item active" value=${
              data.sizes.s["add-price"]
            }>
              <span class="size_icon">S</span>
              <span>${data.sizes.s.size}</span>
            </button>
            <button class="size_btn_item" value=${
              data.sizes.m["add-price"]
            }> <span class="size_icon">M</span>
              <span>${data.sizes.m.size}</span></button>
            <button class="size_btn_item" value=${
              data.sizes.l["add-price"]
            }> <span class="size_icon">L</span>
              <span>${data.sizes.l.size}</span></button>
          </div>
        </div>
        <div class="modal_drink_size">
          <p class="modal_drink_descr">Additives</p>
          <div class="size_btn">
            <button class="size_btn_item" value=${
              data.additives[0]["add-price"]
            }>
              <span class="size_icon">1</span>
              <span>${data.additives[0].name}</span>
            </button>
            <button class="size_btn_item"value=${
              data.additives[1]["add-price"]
            }> <span class="size_icon">2</span>
              <span>${data.additives[1].name}</span></button>
            <button class="size_btn_item" value=${
              data.additives[2]["add-price"]
            }> <span class="size_icon">3</span>
              <span>${data.additives[2].name}</span></button>
          </div>
        </div>
        <div class="total">
          <span>Total:</span>
          <span>$${data.price}</span>
        </div>
        <div class="modal_info">
          <img src="./img/svg/info-empty.svg" alt="info-empty">
          <span class="modal_info_descr">The cost is not final. Download our mobile app to see the final price
            and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20%
            discount.</span>
        </div>
        <button class="modal_close">Close</button>
    </div>
  </div>`;

    const closeButton = modal.querySelector(".modal_close");
    closeButton.addEventListener("click", closeModal);

    modal_backdrop.addEventListener("click", function (event) {
      if (event.target === modal_backdrop) {
        closeModal();
      }
    });

    modal_backdrop.style.display = "flex";
  }

  function closeModal() {
    document.body.classList.remove("scroll-lock");
    modal_backdrop.style.display = "none";
  }

  loadMoreBtn.addEventListener("click", () => {
    const hiddenCards = document.querySelectorAll(".card:nth-child(n+5)");
    hiddenCards.forEach((el) => {
      el.style.display = "block";
    });
    loadMoreBtn.style.display = "none";
    addCardEventListeners();
  });
});
