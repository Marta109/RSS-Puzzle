document.addEventListener("DOMContentLoaded", function () {
  const totalSlides = document.querySelectorAll(".slider_item").length;
  let currentSlide = 0,
    intervalId,
    touchStartX = 0,
    touchEndX = 0;

  function updateSlide() {
    const track = document.querySelector(".slider_list"),
      bars = document.querySelectorAll(".bar"),
      innerBars = document.querySelectorAll(".inner-bar"),
      slideWidth = document.querySelector(".slider_item").offsetWidth;

    track.style.transform = `translateX(${-slideWidth * currentSlide}px)`;

    bars.forEach((bar, index) => {
      bar.classList.toggle("active-bar", index === currentSlide);
      innerBars[index].classList.toggle("active", index === currentSlide);
    });

    innerBars.forEach((innerBar, index) => {
      if (index === currentSlide) {
        innerBar.style.width = "100%";
        innerBar.style.animation = "innerBarProgress 5s linear forwards";
      } else {
        innerBar.style.width = "0";
        innerBar.style.animation = "none";
      }
    });
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  }

  function startAutoSlide() {
    intervalId = setInterval(function () {
      updateSlide();
      nextSlide();
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  document
    .querySelector(".slider-arrow.left")
    .addEventListener("click", function () {
      stopAutoSlide();
      prevSlide();
    });

  document
    .querySelector(".slider-arrow.right")
    .addEventListener("click", function () {
      stopAutoSlide();
      nextSlide();
    });

  const sliderList = document.querySelector(".slider_list");

  sliderList.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  });

  sliderList.addEventListener("touchmove", function (event) {
    touchEndX = event.touches[0].clientX;
  });

  sliderList.addEventListener("touchend", function () {
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) {
      stopAutoSlide();
      nextSlide();
    } else if (swipeDistance < -50) {
      stopAutoSlide();
      prevSlide();
    }
    // if (swipeDistance > 50) {
    //   stopAutoSlide();
    //   prevSlide();
    // } else if (swipeDistance < -50) {
    //   stopAutoSlide();
    //   nextSlide();
    // }

    startAutoSlide();
  });

  startAutoSlide();

  document
    .querySelector(".favorite_coffee_slider")
    .addEventListener("mouseover", stopAutoSlide);
  document
    .querySelector(".favorite_coffee_slider")
    .addEventListener("mouseout", startAutoSlide);
});
