"use strict";

//This file is for common client side js functions/etc
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
  var newGenre = document.getElementById("new-genre").value;
  var genres = document.getElementsByName("genre");
  var errorMsg = document.getElementsByClassName("user-message")[0];
  errorMsg.innerHTML = ""; //check to see if it's already in the list

  var genreLength = genres.length;

  for (var _i = 0; _i < genreLength; _i++) {
    if (genres[_i].value.toString().toLowerCase() == newGenre.toString().toLowerCase()) {
      errorMsg.innerHTML = "".concat(genres[_i].value.toString(), " is already in the Genre list.");
      return;
    }
  }
}

function showNewGenre() {
  var genreSelect = document.getElementById("genre").value;
  var newGenreInput = document.getElementById("new-genre");

  if (genreSelect == "newGenre") {
    visibleClass(newGenreInput);
  } else {
    hiddenClass(newGenreInput);
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
} // let newGenreInput = document.getElementById("new-genre");
// newGenreInput.addEventListener(");