document.addEventListener("DOMContentLoaded", () => {
  const leftSlide = document.querySelector(".left"),
    rightSlide = document.querySelector(".right"),
    sliderList = document.querySelector(".slider_list"),
    slideWidth = document.querySelector(".slider_item").offsetWidth,
    totalSlides = document.querySelectorAll(".slider_item").length;

  let currentIndex = 0,
    touchStartX = 0,
    touchEndX = 0,
    intervalId;

  function startAutoSlide() {
    intervalId = setInterval(() => {
      startProgressBar();
      moveSlider("right");
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  function resetProgressBar() {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.parentNode.removeChild(progressBar);
    }
  }

  function startProgressBar() {
    resetProgressBar();

    const activeBar = document.querySelector(".active-bar");
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    activeBar.appendChild(progressBar);

    progressBar.addEventListener("animationend", () => {
      resetProgressBar();
      moveSlider("right");
    });
  }

  function updateBars() {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar, index) => {
      bar.classList.remove("active-bar");
      if (index === currentIndex) {
        bar.classList.add("active-bar");
      }
    });
  }

  leftSlide.addEventListener("click", () => {
    moveSlider("left");
  });

  rightSlide.addEventListener("click", () => {
    moveSlider("right");
  });

  sliderList.addEventListener("mouseover", () => {
    stopAutoSlide();
    resetProgressBar();
    sliderList.style.animationPlayState = "paused";
  });

  sliderList.addEventListener("mouseout", () => {
    startAutoSlide();
    startProgressBar();
    sliderList.style.animationPlayState = "running";
  });

  sliderList.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    stopAutoSlide();
    resetProgressBar();
    sliderList.style.animationPlayState = "paused";
  });

  sliderList.addEventListener("touchmove", (event) => {
    touchEndX = event.touches[0].clientX;
  });

  sliderList.addEventListener("touchend", () => {
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) {
      moveSlider("right");
    } else if (swipeDistance < -50) {
      moveSlider("left");
    }

    startAutoSlide();
    startProgressBar();
    sliderList.style.animationPlayState = "running";
  });

  function moveSlider(direction) {
    resetProgressBar();
    const offsetChange = direction === "right" ? -slideWidth : slideWidth;

    sliderList.style.transition = "transform 0.5s ease-in-out";
    sliderList.style.transform = `translateX(${offsetChange}px)`;

    sliderList.addEventListener("transitionend", function handler() {
      sliderList.style.transition = "none";
      if (direction === "right") {
        currentIndex = (currentIndex + 1) % totalSlides;
        sliderList.appendChild(sliderList.firstElementChild);
      } else {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        sliderList.insertBefore(
          sliderList.lastElementChild,
          sliderList.firstElementChild
        );
      }

      sliderList.style.transform = "translateX(0)";

      sliderList.removeEventListener("transitionend", handler);
      updateBars();
      startProgressBar();
    });
  }

  startProgressBar();

  startAutoSlide();
  updateBars();
});




