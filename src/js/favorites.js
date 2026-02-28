document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("favorites-container");
  const totalPriceEl = document.getElementById("total-price");

  // Получаем избранное из localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function renderFavorites() {
    container.innerHTML = "";

    if (favorites.length === 0) {
      container.innerHTML = "<p>Ваш список обраних пустий.</p>";
      totalPriceEl.textContent = "0";
      return;
    }

    let total = 0;

    favorites.forEach(item => {
      total += Number(item.price);

      const card = document.createElement("div");
      card.classList.add("fav-card");

      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h5>${item.name}</h5>
        <p class="price">${Number(item.price).toLocaleString()} ₴</p>
        <button class="remove-fav">Видалити</button>
      `;

      // Кнопка удалить из избранного
      card.querySelector(".remove-fav").addEventListener("click", () => {
        favorites = favorites.filter(f => f.id !== item.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
        updateHeaderHeart();
      });

      container.appendChild(card);
    });

    totalPriceEl.textContent = total.toLocaleString();
  }

  function updateHeaderHeart() {
    const headerHeart = document.getElementById("header-heart");
    const favCount = document.getElementById("fav-count");

    if (headerHeart) {
      headerHeart.style.filter = favorites.length > 0
        ? "brightness(0) saturate(100%) invert(17%) sepia(96%) saturate(7492%) hue-rotate(0deg)"
        : "none";
    }
    if (favCount) favCount.textContent = favorites.length;
  }

  renderFavorites();
  updateHeaderHeart();
});