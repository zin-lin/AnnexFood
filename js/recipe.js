/**
 * @author : Zin Lin Htun
 * @type {Javascript}
 */

var ingredients = "";
var steps = "";
/**
 * Document set up
 * @type {HTMLElement}
 */

var loading = document.getElementById('page');
var adderIn = document.getElementById('adderin');
var category = document.getElementById('cat');
var adderSt = document.getElementById('adderst');
var boxCt = document.getElementById('boxCt');
var divCt = document.getElementById('divCt');
var IMG = document.getElementById('img');
const urlParams = new URLSearchParams(window.location.search);
const did = urlParams.get('did');
const name = document.getElementById('name');
const des = document.getElementById('des');

category.onclick =() =>{
    boxCt.style.visibility = `visible`;
    boxCt.style.opacity = `1.0`;
}

boxCt.onclick = ()=>{
    boxCt.style.visibility = `hidden`;
    boxCt.style.opacity = `0.0`;
}

const addIngridients = (text) => {
    var texts = text.split(", ");
    const ingre = document.getElementById("ingredients-recipe");
    ingre.innerHTML = "";
    var index = 0;
    texts.forEach(txt => {
        if (txt !== "") {
            console.log(ingre);
            ingre.innerHTML += `
            <span class="highlight" style="width: auto; max-width: auto">
            ${txt}
            </span>
            <br /> <br />`
        }
        index++;
    })
    if  (ingredients.length === 0)
        adderIn.style.visibility = `visible`;

}

const addSteps = (text) => {
    var texts = text.split("\n");
    const ingre = document.getElementById("steps-recipe");
    ingre.innerHTML = "";
    var superCount = 0;
    texts.forEach(txt => {
        if (txt !== "")
            superCount++;
    } )
    var index = 0;

    texts.forEach(txt => {
        if (txt !== "") {
            console.log(ingre);
            ingre.innerHTML += `
            <span style="width: auto; max-width: auto">
            ◉  ${txt}
            </span>
            <br /> <br />`
            if (superCount -1 > index){
                ingre.innerHTML += `
                <div style="width: 14px; border-radius: 7px; height: 50px; background: #ddd;
                margin: auto;
                ">
                    
                </div>
                `
            }


            index++;
        }
        // add way points
    })
    if  (steps.length === 0)
        adderSt.style.visibility = `visible`;

}


db.collection("dish").doc(did).get().then((doc)=>{
    name.value = doc.data().name;
    des.value = doc.data().des;
    category.innerHTML = doc.data().category===""? "No category" : doc.data().category;
    doc.data().ingredients.forEach(ingredient =>{
        ingredients += ingredient.toString()+", ";
    })
    doc.data().steps.forEach(step =>{
        steps += step.toString()+"\n";
    })

    db.collection("categories").onSnapshot(sn =>{
        sn.docChanges().forEach(doc=>{
            var nameC = doc.doc.data().name;
            const chg =()=>{
                category.innerHTML = nameC.toString();
            }
            divCt.innerHTML += `
            <button class="grayx" style="margin: 6px" onclick="{
                 category.innerHTML = '${nameC}';
            }"
            }>${nameC}</button>`
        })
    })

    console.log(ingredients);
    if  (ingredients.length > 0)
        adderIn.style.visibility = `hidden`;
    if  (steps.length > 0)
        adderSt.style.visibility = `hidden`;
    addIngridients(ingredients);
    addSteps(steps);
    if (doc.data().ph_url !== "")
        IMG.src = doc.data().ph_url

}).catch();
