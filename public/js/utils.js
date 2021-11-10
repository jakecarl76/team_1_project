//This file is for common client side js functions/etc

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
    let newGenre = document.getElementById("new-genre").value;
    let genres = document.getElementsByName("genre");
    let errorMsg = document.getElementsByClassName("user-message")[0];
    
    errorMsg.innerHTML = "";

//check to see if it's already in the list
    let genreLength = genres.length;    
    for(let i=0; i<genreLength; i++){
        if(genres[i].value.toString().toLowerCase() == newGenre.toString().toLowerCase()){
            errorMsg.innerHTML = `${genres[i].value.toString()} is already in the Genre list.`;
            return;
        }
    }
}

function showNewGenre(){
    let genreSelect = document.getElementById("genre").value;
    let newGenreInput = document.getElementById("new-genre");

    if(genreSelect == "newGenre"){
        visibleClass(newGenreInput)
    } else {
        hiddenClass(newGenreInput)
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

// let newGenreInput = document.getElementById("new-genre");
// newGenreInput.addEventListener(");