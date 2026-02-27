console.log('main.js подключён');

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    burger.classList.toggle('active'); // если есть анимация
  });
}

document.addEventListener("DOMContentLoaded", function () {

  const section = document.getElementById("collections");
  if (!section) return;

  const slider = section.querySelector(".collections-grid");
  if (!slider) return;

  // автоплей только на десктопе
  if (window.innerWidth <= 1024) return;

  let scrollAmount = 0;
  const speed = 0.5;   // скорость
  const delay = 10;    // плавность

  function autoScroll() {
    scrollAmount += speed;

    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      scrollAmount = 0;
    }

    slider.scrollTo({
      left: scrollAmount,
    });
  }

  let autoPlay = setInterval(autoScroll, delay);

  slider.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
  });

  slider.addEventListener("mouseleave", () => {
    autoPlay = setInterval(autoScroll, delay);
  });

});