let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");

let allRecipes = [];

async function getRecipes(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${term}`);
    let responseJson = await apiResponse.json();
    allRecipes = responseJson.recipes;  
    displayRecipes();
}

async function getRecipeDetails(id) {

   
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    apiResponse = await apiResponse.json();
    //  console.log(apiResponse.recipe);
     displayRecipeDetails(apiResponse.recipe);
}



function  displayRecipes() {
    let htmlString = ``;
    for (let i = 0; i < allRecipes.length; i++) {
        let id = " '"+allRecipes[i].recipe_id+"'";
        htmlString +=`
        <div  class="col-md-3 py-2 d-flex justify-content-center ">
            <div onclick ="getRecipeDetails(${id})" class="recipe  text-left  ">
              <img  src="${allRecipes[i].image_url}">
              <h3 class="color-mine ">${allRecipes[i].title}</h3>
              <p>by ${allRecipes[i].publisher}</p>
              <button class="btn btn-mine ">
                <a class="text-white" target="_blank" href="http://www.101cookbooks.com/archives/001199.html">source</a>
              </button>
            </div>
            </div>
        `  
    }

    document.getElementById("allrecipes").innerHTML = htmlString;
}

function  displayRecipeDetails(recipeDetails) {
    let htmlString = `
    <h3 class="color-mine fw-bolder">${recipeDetails.title}</h3>
    <img class="img-fluid " src="${recipeDetails.image_url}">
    <p>${recipeDetails.publisher}</p>
    <ul >`;

    for (let i = 0; i < recipeDetails.ingredients.length; i++) {
       htmlString += `<li>${recipeDetails.ingredients[i]}</li>`
        
    }
     
   htmlString += `</ul>`;
   document.getElementById("recipeDetails").innerHTML = htmlString; 
}

searchBtn.addEventListener("click" , function(){
    getRecipes(searchInput.value);
});