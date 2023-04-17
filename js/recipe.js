/**
 * @author : Zin Lin Htun
 * @type {Javascript}
 */

var ingredients = "";
var steps = "";
var pht_url = "";
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
var boxSt = document.getElementById('boxSt');
var divSt = document.getElementById('divSt');
var boxPh = document.getElementById('boxPh');
var divPh = document.getElementById('divPh');
var killPh = document.getElementById('killPh');
var boxIn = document.getElementById('boxIn');
var killIn = document.getElementById('killIn');
var killSt = document.getElementById('killSt');
var divIn = document.getElementById('divIn');
var inTx = document.getElementById('in-tx');
var inSt = document.getElementById('steps-tx');
var phTx = document.getElementById('photo-tx');
var IMG = document.getElementById('img');
const urlParams = new URLSearchParams(window.location.search);
const did = urlParams.get('did');
const name = document.getElementById('name');
const des = document.getElementById('des');
const secIn = document.getElementById('secIn');
const secSt = document.getElementById('secSt');
var doc =db.collection("dish").doc(did);

category.onclick =() =>{
    boxCt.style.visibility = `visible`;
    boxCt.style.opacity = `1.0`;
}

boxCt.onclick = ()=>{
    boxCt.style.visibility = `hidden`;
    boxCt.style.opacity = `0.0`;
}

killIn.onclick = ()=>{
    boxIn.style.visibility = `hidden`;
    boxIn.style.opacity = `0.0`;
    let val = inTx.value;
    ingredients = val;
    addIngridients(ingredients);
    let inUpdate = ingredients.split(", ");
    doc.update({ingredients: inUpdate}).catch(e=>{console.log(e)});
}

killSt.onclick = ()=>{

    boxSt.style.visibility = `hidden`;
    boxSt.style.opacity = `0.0`;
    let val = inSt.value;
    steps = val;
    addSteps(steps);
    let stUpdate = steps.split('\n');
    doc.update({steps: stUpdate}).catch(e=>{console.log(e)});
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


doc.get().then((doc)=>{
    name.value = doc.data().name;
    des.value = doc.data().des;
    category.innerHTML = doc.data().category===""? "No category" : doc.data().category;
    doc.data().ingredients.forEach(ingredient =>{
        ingredients += ingredient.toString()+", ";
    })
    doc.data().steps.forEach(step =>{
        steps += step.toString()+"\n";
    })

    pht_url = doc.data().pht_url;

    db.collection("categories").onSnapshot(sn =>{
        sn.docChanges().forEach(doc=>{
            var nameC = doc.doc.data().name;
            const chg =()=>{
                category.innerHTML = nameC.toString();
            }
            divCt.innerHTML += `
            <button class="grayx" style="margin: 6px" onclick="{
                 category.innerHTML = '${nameC}';
                 doc.update({category: '${nameC}'})
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
    inTx.value = ingredients;
    inSt.value = steps;


}).catch();

secIn.addEventListener("click", (e)=>{
    boxIn.style.visibility = `visible`;
    boxIn.style.opacity = `1.0`;
})

secSt.addEventListener("click", (e)=>{
    boxSt.style.visibility = `visible`;
    boxSt.style.opacity = `1.0`;
})

name.addEventListener("blur", (e)=>{
    doc.update({name: name.value});
})

des.addEventListener("blur", (e)=>{
    doc.update({des: des.value});
})

IMG.addEventListener("click", (e)=>{
    boxPh.style.visibility = `visible`;
    phTx.value = pht_url=== undefined ?"":pht_url;
    boxPh.style.opacity = `1.0`;
})

killPh.addEventListener("click", (e)=>{
    boxPh.style.visibility = `hidden`;
    boxPh.style.opacity = `0.0`;
    let url = phTx.value;
    doc.update({ph_url: url});
    IMG.src = url;
})