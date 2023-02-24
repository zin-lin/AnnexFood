// Author : Zin Lin Htun


const recipes = document.querySelector(".recipes");
const cou = document.querySelector(".cardMain");

try {
cou.style.zIndex ="0";
cou.style.transform = "translateY(0%)";
cou.style.zIndex ="0";
}catch (err){
    // Error occurred
}

try {
    recipes.innerHTML=``;
    recipes.style.zIndex = "0";
    recipes.style.transform = "translateY(0%)";
    recipes.style.zIndex = "0";
}catch (err){
    // Error Occurred
}

document.addEventListener("DOMContentLoaded", function(){

    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, {edge: "right"});

    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, {edge: "left"});

});

try {
    cou.addEventListener("drag", eve => {
        eve.preventDefault();
    })
}catch (e) {
    
}

const renderRecipe = (data, id) =>{

    const html =`  
    <div class="card-panel recipe " data-id ="${id}">
        <img src="./img/dish.png" alt="recipe thumb" />
    
        <div class="recipe-details">
            <div class="recipe-title">${data.title}</div>
           
            <div class="recipe-ingredients" style="max-width:200px">${data.ingredient}</div>
        </div>
        <div class="recipe-delete" style="display: flex">
            <button class="trans" > <i class="material-icons" data-id ="${id}" >book</i>
            </button> 
            <button class="trans" > <i class="material-icons" data-id ="${id}" >delete_outline</i>
            </button> 
        </div>
    </div>
 `;

    console.log();
 
    try{
    recipes.innerHTML += html;}
    catch (e) {
        
    }
    //output in the material
}

//remove recipe form DOM
const removeRecipe= (id) =>{

    const recipe = document.querySelector(`.recipe[data-id='${id}']`);
    recipe.remove();

}