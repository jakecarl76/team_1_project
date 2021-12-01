//This file is for common client side js functions/etc

function toggleDiv(el)
{
  el.classList.toggle('hidden');
}

function toggleDivById(el_id)
{
  document.getElementById(el_id).classList.toggle('hidden');
}

function displayFields(){
    const book = document.getElementById("type-book").checked;
    const game = document.getElementById("type-game").checked;
    const movie = document.getElementById("type-movie").checked;

    //make individual fields visible or hidden based on choice
    const fields = document.getElementsByClassName("form-control");
    const bookFields = document.getElementsByClassName("book");
    const gameFields = document.getElementsByClassName("game");
    const movieFields = document.getElementsByClassName("movie");
    let fieldsLength = fields.length;
    if(book){
        for (i=1; i<fieldsLength; i++){
            hiddenClass(fields[i]);
        };
        for (item in bookFields){
            visibleClass(bookFields[item])
        };
    } else if (game){
        for (i=1; i<fieldsLength; i++){
            hiddenClass(fields[i]);
        };
        for (item in gameFields){
            visibleClass(gameFields[item])
        };
    } else if(movie){
        for (i=1; i<fieldsLength; i++){
            hiddenClass(fields[i]);
        };
        for (item in movieFields){
            visibleClass(movieFields[item])
        };
    }


}

function hiddenClass(element){
    if(element.classList.contains("visible")){
        element.classList.remove("visible")
    }
    element.classList.add("hidden");
}

function visibleClass(element){
    if(!element.classList.contains("visible")){
        element.classList.add("visible")
        element.classList.remove("hidden");
    }
}

function checkNewGenre(){
    let itemType = document.getElementById("radio-div").value;

    let newGenre, genres;
    
    switch(itemType){
        case "book": 
            newGenre = document.getElementById("new-genre-book");
            genres = document.getElementsByName("genre-book");
            break;
        case "movie":
            newGenre = document.getElementById("new-genre-movie");
            genres = document.getElementsByName("genre-movie");
    }
    
    
    let errorMsg = document.getElementsByClassName("user-message")[0];
    
    errorMsg.innerHTML = "";

//check to see if it's already in the list
    let genreLength = genres.length;    
    for(let i=0; i<genreLength; i++){
        if(genres[i].value.toString().toLowerCase() == newGenre.value.toString().toLowerCase()){
            errorMsg.innerHTML = `${genres[i].value.toString()} is already in the Genre list.`;
            document.getElementById("genre").getElementsByTagName('option')[i].selected = 'selected';
            newGenre.innerHTML = "";
            hiddenClass(newGenre);
            return;
        }
    }
}


function checkNewCategory(){
    let newCategory = document.getElementById("new-category");
    let categories = document.getElementsByName("category");
    let errorMsg = document.getElementsByClassName("user-message")[0];
    
    errorMsg.innerHTML = "";

//check to see if it's already in the list
    let categoryLength = categories.length;    
    for(let i=0; i<categoryLength; i++){
        // console.log(`categories[${i}]: ${categories[i].value.toString().toLowerCase().split(" ").join("")}; newCategory: ${newCategory.toString().toLowerCase().split(" ").join("")}`);
        // console.log(categories[i].value.toString().toLowerCase().split(" ").join(""));
        if(categories[i].value.toString().toLowerCase().split(" ").join("") == newCategory.value.toString().toLowerCase().split(" ").join("")){
            errorMsg.innerHTML = `${categories[i].value.toString()} is already in the Category list.`;
            document.getElementById("category").getElementsByTagName('option')[i].selected = 'selected';
            newCategory.innerHTML = "";
            hiddenClass(newCategory);
            return;
        }
    }
}

function showNewGenre(){
    let bookGenreSelect = document.getElementById("genre-book").value;
    let newBookGenreInput = document.getElementById("new-genre-book");
    let movieGenreSelect = document.getElementById("genre-movie").value;
    let newMovieGenreInput = document.getElementById("new-genre-movie");
    if(bookGenreSelect == "newGenre"){
        visibleClass(newBookGenreInput)
    } else {
        hiddenClass(newBookGenreInput)
    }

    if(movieGenreSelect == "newGenre"){
        visibleClass(newMovieGenreInput)
    } else {
        hiddenClass(newMovieGenreInput)
    }
}

function showNewCategory(){
    let categorySelect = document.getElementById("category").value;
    let newCategoryInput = document.getElementById("new-category");

    if(categorySelect == "newCategory"){
        visibleClass(newCategoryInput)
    } else {
        hiddenClass(newCategoryInput)
    }
}

function checkType(itemType){
    let bookRadio = document.getElementById("type-book");
    let movieRadio = document.getElementById("type-movie");
    let gameRadio = document.getElementById("type-game");

    switch(itemType){
        case "book": bookRadio.checked = true;
            break;
        case "movie": movieRadio.checked = true;
            break;
        case "game": gameRadio.checked = true;
        break;
    }

    displayFields();
}

const toggleEditReview = () => {
    const buttons = document.querySelectorAll('.editReviewItem');

    
    this.style.display = "none";

    const revDiv = document.getElementById('editReviewItem');
    revDiv.style.display = "block";
}
