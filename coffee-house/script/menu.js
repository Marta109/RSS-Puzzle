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
        loadMoreBtn.style.display = "";
      } else if (selectMenu == "tea") {
        createMenu(teaMenu, selectMenu);
        loadMoreBtn.style.display = "none";
      } else if (selectMenu == "dessert") {
        createMenu(dessertMenu, selectMenu);
        loadMoreBtn.style.display = "";
      }
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

  function addModalEventListeners(data) {
    const sizeButtonsContainer = document.getElementById(
        "size_buttons_container"
      ),
      additiveButtonsContainer = document.getElementById(
        "additive_buttons_container"
      ),
      totalPrice = document.getElementById("total_price"),
      sizeButtons = document.querySelectorAll(".size_btn_item"),
      additiveButtons = document.querySelectorAll(".additive_btn");

    sizeButtons.forEach((sizeButton) => {
      sizeButton.addEventListener("click", () => {
        sizeButtons.forEach((btn) => btn.classList.remove("active"));
        sizeButton.classList.add("active");

        updateTotalPrice(data);
      });
    });

    additiveButtons.forEach((additiveButton) => {
      additiveButton.addEventListener("click", () => {
        additiveButton.classList.toggle("active");

        updateTotalPrice(data);
      });
    });

    function updateTotalPrice(data) {
      const selectedSize = sizeButtonsContainer.querySelector(".active");
      const selectedAdditives =
        additiveButtonsContainer.querySelectorAll(".active");

      let totalPriceValue = parseFloat(data.price);

      if (selectedSize) {
        const sizePrice = parseFloat(selectedSize.value);
        totalPriceValue += sizePrice;
      }

      selectedAdditives.forEach((additive) => {
        const additivePrice = parseFloat(additive.value);
        totalPriceValue += additivePrice;
      });

      totalPrice.textContent = `$${totalPriceValue.toFixed(2)}`;
    }
  }

  function showModal(data, index) {
    document.body.classList.add("scroll-lock");

    data = data[index];
    const modal = document.querySelector(".modal");

    const modalImage = document.getElementById("modal_image");
    const modalTitle = document.getElementById("modal_title");
    const modalDrinkDescr = document.getElementById("modal_drink_descr");
    const sizeButtonsContainer = document.getElementById(
      "size_buttons_container"
    );
    const additiveButtonsContainer = document.getElementById(
      "additive_buttons_container"
    );
    const totalPrice = document.getElementById("total_price");

    modalImage.src = `./img/menu/${data.category}-${index + 1}.png`;
    modalTitle.textContent = data.name;
    modalDrinkDescr.textContent = data.description;
    totalPrice.textContent = "$" + data.price;

    sizeButtonsContainer.innerHTML = "";
    Object.entries(data.sizes).forEach(([sizeKey, sizeData], i) => {
      console.log("sizeKey", sizeKey);
      console.log("sizeData", sizeData);

      const sizeButton = document.createElement("button");
      if (i == 0) {
        sizeButton.className = "size_btn_item active";
      } else {
        sizeButton.className = "size_btn_item";
      }
      sizeButton.value = sizeData["add-price"];
      sizeButton.innerHTML = `
        <span class="size_icon">${sizeKey.toUpperCase()}</span>
        <span>${sizeData.size}</span>`;
      sizeButtonsContainer.appendChild(sizeButton);
    });

    additiveButtonsContainer.innerHTML = "";
    data.additives.forEach((additive, additiveIndex) => {
      const additiveButton = document.createElement("button");
      additiveButton.className = "additive_btn";
      additiveButton.value = additive["add-price"];
      additiveButton.innerHTML = `
        <span class="size_icon">${additiveIndex + 1}</span>
        <span>${additive.name}</span>`;
      additiveButtonsContainer.appendChild(additiveButton);
    });
    addModalEventListeners(data);
    if (data.length <= 4) {
      loadMoreBtn.style.display = "none";
    }
  }

  modal_backdrop.addEventListener("click", function (e) {
    if (e.target === modal_backdrop) {
      closeModal();
    }
  });

  modal_close.addEventListener("click", () => {
    closeModal();
  });

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

// document.addEventListener("DOMContentLoaded", function () {
//   const drinks_menu = document.querySelector(".drinks_menu"),
//     menu_btn_items = document.querySelectorAll(".menu_item"),
//     modal_backdrop = document.querySelector(".backdrop"),
//     modal_close = document.querySelector(".modal_close"),
//     loadMoreBtn = document.querySelector(".refresh_btn");

//   const dataUrl = "./data/products.json";

//   fetch(dataUrl)
//     .then((response) => response.json())
//     .then((menuData) => {
//       handleData(menuData);
//     })
//     .catch((error) => {
//       console.error("Error handling data:", error);
//     });

//   let coffeeMenu = "",
//     teaMenu = "",
//     dessertMenu = "";

//   function handleData(data) {
//     (coffeeMenu = data.filter((item) => item.category === "coffee")),
//       (teaMenu = data.filter((item) => item.category === "tea")),
//       (dessertMenu = data.filter((item) => item.category === "dessert"));

//     createMenu(coffeeMenu);
//   }

//   menu_btn_items.forEach((el) => {
//     el.addEventListener("click", (e) => {
//       let selectMenu = e.target.value
//         ? e.target.value
//         : e.target.parentElement.value;

//       menu_btn_items.forEach((item) => {
//         item.classList.remove("selected");
//       });

//       el.classList.add("selected");

//       if (selectMenu == "coffee") {
//         createMenu(coffeeMenu, selectMenu);
//       } else if (selectMenu == "tea") {
//         createMenu(teaMenu, selectMenu);
//       } else if (selectMenu == "dessert") {
//         createMenu(dessertMenu, selectMenu);
//       }
//       loadMoreBtn.style.display = "";
//       addCardEventListeners();
//     });
//   });

//   function createMenu(data, itmName = "coffee") {
//     drinks_menu.innerHTML = "";

//     let index = 1;
//     data.forEach((drinkData) => {
//       drinks_menu.innerHTML += `
//             <div class="card">
//           <div class="card_img_container">
//             <img class="card_img_item" src="./img/menu/${itmName}-${index}.png" alt="${itmName}" />
//           </div>
//           <div class="drink_descr">
//             <h3>${drinkData.name}</h3>
//             <p>${drinkData.description}</p>
//             <div class="price">$${drinkData.price}</div>
//           </div>
//         </div>
//       `;
//       index++;
//     });
//     addCardEventListeners(data);
//   }

//   function addCardEventListeners(data) {
//     drinks_menu.querySelectorAll(".card").forEach((card, index) => {
//       card.addEventListener("click", () => {
//         modal_backdrop.style.display = "flex";
//         data && index >= 0 ? showModal(data, index) : "";
//       });
//     });
//   }

//   function showModal(data, index) {
//     document.body.classList.add("scroll-lock");

//     data = data[index];
//     const modal = document.querySelector(".modal");

//     modal.innerHTML = `
//     <div class="modal-content">
//     <div class="modal_img"> <img src="./img/menu/${data.category}-${
//       index + 1
//     }.png" alt="Product-${index + 1}" /></div>
//     <div class="modal_descr">
//       <h2 id="modal_title" class="modal_title">${data.name}</h3>
//         <p id="modal_drink_descr" class="modal_drink_descr">${
//           data.description
//         }</p>
//         <div class="modal_drink_size">
//           <p class="modal_drink_descr">Size</p>
//           <div class="size_btn">
//             <button class="size_btn_item active" value=${
//               data.sizes.s["add-price"]
//             }>
//               <span class="size_icon">S</span>
//               <span>${data.sizes.s.size}</span>
//             </button>
//             <button class="size_btn_item" value=${
//               data.sizes.m["add-price"]
//             }> <span class="size_icon">M</span>
//               <span>${data.sizes.m.size}</span></button>
//             <button class="size_btn_item" value=${
//               data.sizes.l["add-price"]
//             }> <span class="size_icon">L</span>
//               <span>${data.sizes.l.size}</span></button>
//           </div>
//         </div>
//         <div class="modal_drink_size">
//           <p class="modal_drink_descr">Additives</p>
//           <div class="size_btn">
//             <button class="size_btn_item additive_btn" value=${
//               data.additives[0]["add-price"]
//             }>
//               <span class="size_icon">1</span>
//               <span>${data.additives[0].name}</span>
//             </button>
//             <button class="size_btn_item"value=${
//               data.additives[1]["add-price"]
//             }> <span class="size_icon">2</span>
//               <span>${data.additives[1].name}</span></button>
//             <button class="size_btn_item" value=${
//               data.additives[2]["add-price"]
//             }> <span class="size_icon">3</span>
//               <span>${data.additives[2].name}</span></button>
//           </div>
//         </div>
//         <div class="total">
//           <span>Total:</span>
//           <span>$${data.price}</span>
//         </div>
//         <div class="modal_info">
//           <img src="./img/svg/info-empty.svg" alt="info-empty">
//           <span class="modal_info_descr">The cost is not final. Download our mobile app to see the final price
//             and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20%
//             discount.</span>
//         </div>
//         <button class="modal_close">Close</button>
//     </div>
//   </div>`;

//   addModalEventListeners(data);

//     const closeButton = modal.querySelector(".modal_close");
//     closeButton.addEventListener("click", closeModal);

//     modal_backdrop.addEventListener("click", function (event) {
//       if (event.target === modal_backdrop) {
//         closeModal();
//       }
//     });

//     modal_backdrop.style.display = "flex";

//     function addModalEventListeners(data) {
//       const sizeButtons = document.querySelectorAll(".size_btn_item");
//       const additiveButtons = document.querySelectorAll(
//         ".additive_btn_item"
//       );

//       sizeButtons.forEach((button) => {
//         button.addEventListener("click", () => {
//           handleSizeButtonClick(button);
//         });
//       });

//       additiveButtons.forEach((button) => {
//         button.addEventListener("click", () => {
//           handleAdditiveButtonClick(button);
//         });
//       });

//       function handleSizeButtonClick(button) {
//         sizeButtons.forEach((btn) => btn.classList.remove("active"));
//         button.classList.add("active");
//         updateSelectedOptions();
//       }

//       function handleAdditiveButtonClick(button) {
//         button.classList.toggle("active");
//         updateSelectedOptions();
//       }

//       function updateSelectedOptions() {
//         const selectedSize = document.querySelector(
//           ".size_btn_item.active"
//         );
//         const selectedAdditives = document.querySelectorAll(
//           ".additive_btn_item.active"
//         );

//         console.log(
//           "Selected Size:",
//           selectedSize ? selectedSize.innerText : "None"
//         );
//         console.log(
//           "Selected Additives:",
//           Array.from(selectedAdditives)
//             .map((additive) => additive.innerText)
//             .join(", ")
//         );
//       }
//     }

//   }

//   function closeModal() {
//     document.body.classList.remove("scroll-lock");
//     modal_backdrop.style.display = "none";
//   }

//   loadMoreBtn.addEventListener("click", () => {
//     const hiddenCards = document.querySelectorAll(".card:nth-child(n+5)");
//     hiddenCards.forEach((el) => {
//       el.style.display = "block";
//     });
//     loadMoreBtn.style.display = "none";
//     addCardEventListeners();
//   });
// });
