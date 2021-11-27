"use strict";

//This file is for common client side js functions/etc
function toggleDiv(el) {
  el.classList.toggle('hidden');
}

function toggleDivById(el_id) {
  document.getElementById(el_id).classList.toggle('hidden');
}

function displayFields() {
  var book = document.getElementById("type-book").checked;
  var game = document.getElementById("type-game").checked;
  var movie = document.getElementById("type-movie").checked; //make individual fields visible or hidden based on choice

  var fields = document.getElementsByClassName("form-control");
  var bookFields = document.getElementsByClassName("book");
  var gameFields = document.getElementsByClassName("game");
  var movieFields = document.getElementsByClassName("movie");
  var fieldsLength = fields.length;

  if (book) {
    for (i = 1; i < fieldsLength; i++) {
      hiddenClass(fields[i]);
    }

    ;

    for (item in bookFields) {
      visibleClass(bookFields[item]);
    }

    ;
  } else if (game) {
    for (i = 1; i < fieldsLength; i++) {
      hiddenClass(fields[i]);
    }

    ;

    for (item in gameFields) {
      visibleClass(gameFields[item]);
    }

    ;
  } else if (movie) {
    for (i = 1; i < fieldsLength; i++) {
      hiddenClass(fields[i]);
    }

    ;

    for (item in movieFields) {
      visibleClass(movieFields[item]);
    }

    ;
  }
}

function hiddenClass(element) {
  if (element.classList.contains("visible")) {
    element.classList.remove("visible");
  }

  element.classList.add("hidden");
}

function visibleClass(element) {
  if (!element.classList.contains("visible")) {
    element.classList.add("visible");
    element.classList.remove("hidden");
  }
}

function checkNewGenre() {
  var itemType = document.getElementById("radio-div").value;
  var newGenre, genres;

  switch (itemType) {
    case "book":
      newGenre = document.getElementById("new-genre-book");
      genres = document.getElementsByName("genre-book");
      break;

    case "movie":
      newGenre = document.getElementById("new-genre-movie");
      genres = document.getElementsByName("genre-movie");
  }

  var errorMsg = document.getElementsByClassName("user-message")[0];
  errorMsg.innerHTML = ""; //check to see if it's already in the list

  var genreLength = genres.length;

  for (var _i = 0; _i < genreLength; _i++) {
    if (genres[_i].value.toString().toLowerCase() == newGenre.value.toString().toLowerCase()) {
      errorMsg.innerHTML = "".concat(genres[_i].value.toString(), " is already in the Genre list.");
      document.getElementById("genre").getElementsByTagName('option')[_i].selected = 'selected';
      newGenre.innerHTML = "";
      hiddenClass(newGenre);
      return;
    }
  }
}

function checkNewCategory() {
  var newCategory = document.getElementById("new-category");
  var categories = document.getElementsByName("category");
  var errorMsg = document.getElementsByClassName("user-message")[0];
  errorMsg.innerHTML = ""; //check to see if it's already in the list

  var categoryLength = categories.length;

  for (var _i2 = 0; _i2 < categoryLength; _i2++) {
    // console.log(`categories[${i}]: ${categories[i].value.toString().toLowerCase().split(" ").join("")}; newCategory: ${newCategory.toString().toLowerCase().split(" ").join("")}`);
    // console.log(categories[i].value.toString().toLowerCase().split(" ").join(""));
    if (categories[_i2].value.toString().toLowerCase().split(" ").join("") == newCategory.value.toString().toLowerCase().split(" ").join("")) {
      errorMsg.innerHTML = "".concat(categories[_i2].value.toString(), " is already in the Category list.");
      document.getElementById("category").getElementsByTagName('option')[_i2].selected = 'selected';
      newCategory.innerHTML = "";
      hiddenClass(newCategory);
      return;
    }
  }
}

function showNewGenre() {
  var bookGenreSelect = document.getElementById("genre-book").value;
  var newBookGenreInput = document.getElementById("new-genre-book");
  var movieGenreSelect = document.getElementById("genre-movie").value;
  var newMovieGenreInput = document.getElementById("new-genre-movie");

  if (bookGenreSelect == "newGenre") {
    visibleClass(newBookGenreInput);
  } else {
    hiddenClass(newBookGenreInput);
  }

  if (movieGenreSelect == "newGenre") {
    visibleClass(newMovieGenreInput);
  } else {
    hiddenClass(newMovieGenreInput);
  }
}

function showNewCategory() {
  var categorySelect = document.getElementById("category").value;
  var newCategoryInput = document.getElementById("new-category");

  if (categorySelect == "newCategory") {
    visibleClass(newCategoryInput);
  } else {
    hiddenClass(newCategoryInput);
  }
}

function checkType(itemType) {
  var bookRadio = document.getElementById("type-book");
  var movieRadio = document.getElementById("type-movie");
  var gameRadio = document.getElementById("type-game");

  switch (itemType) {
    case "book":
      bookRadio.checked = true;
      break;

    case "movie":
      movieRadio.checked = true;
      break;

    case "game":
      gameRadio.checked = true;
      break;
  }

  displayFields();
}