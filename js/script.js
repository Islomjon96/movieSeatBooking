document.addEventListener("DOMContentLoaded", function() {
  const seatsContainer = document.querySelector(".seats-container");
  const seats = document.querySelectorAll(".seats-container .seat");
  const movie = document.getElementById("movie");
  const count = document.getElementById("count");
  const total = document.getElementById("total");

  let ticketPrice = movie.value;

  // Вставка данных с локального хранилища;
  populateUI();

  // Обновление конечных выбранных мест и конечной суммы
  updateTotal(count, total);

  // Счет количество мест и суммы билетов
  function updateTotal(count, total) {
    const selectedSeats = document.querySelectorAll(
      ".seats-container .seat.selected"
    );

    //Сохранение данных в локальном хранилище
    const selectedSeatsIndex = [...selectedSeats].map(seat =>
      [...seats].indexOf(seat)
    );

    if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
      localStorage.setItem(
        "movieSeatsIndex",
        JSON.stringify(selectedSeatsIndex)
      );
    }

    count.innerHTML = selectedSeats.length;
    total.innerHTML = selectedSeats.length * ticketPrice;
  }

  // Функция добавления индекса и цены фильма в локальное хранилище
  function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("movieIndex", movieIndex);
    localStorage.setItem("moviePrice", moviePrice);
  }

  // Функции вставки данных(фильм, цена, количество выбранных мест) с локального хранилища
  function populateUI() {
    // Получение всех выбранных мест с локального хранилища
    const getSelectedSeatsIndex = JSON.parse(
      localStorage.getItem("movieSeatsIndex")
    );

    if (getSelectedSeatsIndex !== null) {
      seats.forEach((e, index) => {
        if (getSelectedSeatsIndex.indexOf(index) > -1) {
          e.classList.add("selected");
        }
      });
    }

    // Получение выбранного места с локального хранилища
    const getSelectedMovieIndex = localStorage.getItem("movieIndex");
    if (getSelectedMovieIndex !== null) {
      movie.selectedIndex = getSelectedMovieIndex;
    }

    // Получение цены выбранного фильма с локального хранилища
    const getSelectedMoviePrice = localStorage.getItem("moviePrice");
    if (getSelectedMoviePrice !== null) {
      ticketPrice = getSelectedMoviePrice;
    }
  }

  // Событие при изменение фильма
  movie.addEventListener("change", function(e) {
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, ticketPrice);
    updateTotal(count, total);
  });

  // Событие при выборе места в зале
  seatsContainer.addEventListener("click", function(e) {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
    }

    updateTotal(count, total);
  });
});
