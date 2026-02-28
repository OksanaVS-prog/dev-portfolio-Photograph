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
  const speed = 2.5;   // скорость
  const delay = 20;    // плавность

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

document.addEventListener("DOMContentLoaded", function () {

  // =============================
  // Получаем данные
  // =============================
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const favCount = document.getElementById("fav-count");
  const headerHeart = document.getElementById("header-heart");

  // Кнопки ❤️ и кнопки «Додати в Обране»
  const favButtons = document.querySelectorAll(".add-to-fav, .add-to-fav-btn");

  // =============================
  // Сохранение в localStorage
  // =============================
  function saveToStorage() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // =============================
  // Обновление счётчика
  // =============================
  function updateCounter() {
    if (favCount) favCount.textContent = favorites.length;

    // Красим сердечко в хедере
    if (headerHeart) {
      headerHeart.style.filter = favorites.length > 0
        ? "brightness(0) saturate(100%) invert(17%) sepia(96%) saturate(7492%) hue-rotate(0deg)"
        : "none";
    }

    saveToStorage();
  }

  // =============================
  // Обновление кнопок товаров
  // =============================
  function updateButtons() {
    favButtons.forEach(button => {
      const product = button.closest(".product-card");
      if (!product) return;

      const id = product.dataset.id;
      const exists = favorites.find(item => item.id === id);

      if (exists) {
        if (button.classList.contains("add-to-fav")) {
          button.textContent = "❤️";
          button.classList.add("active");
        } else if (button.classList.contains("add-to-fav-btn")) {
          button.textContent = "У списку ✅";
          button.classList.add("active");
        }
      } else {
        if (button.classList.contains("add-to-fav")) {
          button.textContent = "🤍";
          button.classList.remove("active");
        } else if (button.classList.contains("add-to-fav-btn")) {
          button.textContent = "Додати в Обране 🤍";
          button.classList.remove("active");
        }
      }
    });
  }

  // =============================
  // Клик по кнопке
  // =============================
  favButtons.forEach(button => {
    button.addEventListener("click", function () {

      const product = this.closest(".product-card");
      if (!product) return;

      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = product.dataset.price;
      const img = product.dataset.img;

      const index = favorites.findIndex(item => item.id === id);

      if (index === -1) {
        // Добавляем
        favorites.push({ id, name, price, img });
      } else {
        // Удаляем
        favorites.splice(index, 1);
      }

      updateCounter();
      updateButtons();
    });
  });

  // =============================
  // Инициализация при загрузке
  // =============================
  updateCounter();
  updateButtons();

});