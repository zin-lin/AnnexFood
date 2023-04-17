// Author : Zin Lin Htun


const recipes = document.querySelector(".recipes");
const fil = document.getElementById("filtered");
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
    <div class="card-panel recipe " data-id ="${id}" id = ${id} onclick='{
        var url = "./recipe.html?did=" + id;
        window.location.href = url;
    }'">
        <img src="./img/dish.png" alt="recipe thumb" />
    
        <div class="recipe-details">
            <div class="recipe-title">${data.name}</div>
           
            <div class="recipe-ingredients" style="max-width:200px">${data.des}</div>
        </div>
        
        <div style="display: flex; color: grey">
            <span class="trans" style="color: #b7b6b6; height: 50px; align-self: center" > <i class="material-icons" data-id ="${id}" >book</i>
            </span>   
        </div>
    </div>
 `;

    console.log();
 
    try{
    recipes.innerHTML += html;
    setTimeout(   ()=>   {
            const recipe = document.getElementById(id);
            recipe.style.opacity = "1.0";
        }, 0
        );
    }
    catch (e) {
        
    }
    //output in the material
}

const renderFiltered = (data, id) =>{

    const html =`  
    <div class="card-panel recipe " data-id ="${id}" id = ${id} onclick='{
        var url = "./recipe.html?did=" + id;
        window.location.href = url;
    }'">
        <img src="./img/dish.png" alt="recipe thumb" />
    
        <div class="recipe-details">
            <div class="recipe-title">${data.name}</div>
           
            <div class="recipe-ingredients" style="max-width:200px">${data.des}</div>
        </div>
        
        <div style="display: flex; color: grey">
            <span class="trans" style="color: #b7b6b6; height: 50px; align-self: center" > <i class="material-icons" data-id ="${id}" >book</i>
            </span>   
        </div>
    </div>
 `;

    console.log();

    try{
        fil.innerHTML += html;
        setTimeout(   ()=>   {
                const recipe = document.getElementById(id);
                recipe.style.opacity = "1.0";
            }, 0
        );
    }
    catch (e) {

    }
    //output in the material
}