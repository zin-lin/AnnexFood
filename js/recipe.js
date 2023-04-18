/**
 * @author : Zin Lin Htun
 * @type {Javascript}
 */

var ingredients = "";
var steps = "";
var pht_url = "";
var iid = "";
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
                margin: auto;">    
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


doc.get().then((d)=>{
    name.value = d.data().name;
    des.value = d.data().des;
    category.innerHTML = d.data().category===""? "No category" : d.data().category;
    d.data().ingredients.forEach(ingredient =>{
        ingredients += ingredient.toString()+", ";
    })
    d.data().steps.forEach(step =>{
        steps += step.toString()+"\n";
    })
    iid += d.data().user_id;
    pht_url = d.data().ph_url;

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
    if (d.data().ph_url !== "")
        IMG.src = d.data().ph_url
    inTx.value = ingredients;
    inSt.value = steps;

    name.disabled = true;
    des.disabled = true;

    auth.onAuthStateChanged(user => {
        console.log(auth.currentUser.uid)
        if (user.uid === iid) {
            name.disabled = false;
            des.disabled = false;
            adderIn.addEventListener("click", (e) => {
                if (auth.currentUser) {
                    boxIn.style.visibility = `visible`;
                    boxIn.style.opacity = `1.0`;
                }
            })

            adderSt.addEventListener("click", (e) => {
                if (auth.currentUser){
                    boxSt.style.visibility = `visible`;
                    boxSt.style.opacity = `1.0`;
                }
            })

            category.onclick = () => {
                if (auth.currentUser) {
                    boxCt.style.visibility = `visible`;
                    boxCt.style.opacity = `1.0`;
                }
            }

            boxCt.onclick = () => {
                if (auth.currentUser) {
                    boxCt.style.visibility = `hidden`;
                    boxCt.style.opacity = `0.0`;
                }
            }

            killIn.onclick = () => {
                if (auth.currentUser) {
                    boxIn.style.visibility = `hidden`;
                    boxIn.style.opacity = `0.0`;
                    let val = inTx.value;
                    ingredients = val;
                    addIngridients(ingredients);
                    let inUpdate = [];
                    let inUpdatePre = ingredients.split(", ");
                    inUpdatePre.forEach(e=> {
                        if (e !== "")
                            inUpdate.push(e);
                    })

                    doc.update({ingredients: inUpdate}).catch(e => {
                        console.log(e)
                    });
                }
            }

            killSt.onclick = () => {
                if (auth.currentUser){
                    boxSt.style.visibility = `hidden`;
                    boxSt.style.opacity = `0.0`;
                    let val = inSt.value;
                    steps = val;
                    addSteps(steps);
                    let stUpdate = []
                    let stUpdatePre = steps.split('\n');

                    stUpdatePre.forEach(e=>{
                        if (e !== "")
                            stUpdate.push(e)
                    })

                    doc.update({steps: stUpdate}).catch(e => {
                        console.log(e)
                    });
                }
            }


            secIn.addEventListener("click", (e) => {
                if (auth.currentUser) {
                    boxIn.style.visibility = `visible`;
                    boxIn.style.opacity = `1.0`;
                }
            })

            secSt.addEventListener("click", (e) => {
                if (auth.currentUser) {
                    boxSt.style.visibility = `visible`;
                    boxSt.style.opacity = `1.0`;
                }
            })

            name.addEventListener("blur", (e) => {
                if (auth.currentUser){
                    doc.update({name: name.value});
                }
            })

            des.addEventListener("blur", (e) => {
                if (auth.currentUser){
                    doc.update({des: des.value});
                }
            })

            IMG.addEventListener("click", (e) => {
                if (auth.currentUser){
                    boxPh.style.visibility = `visible`;
                    phTx.value = pht_url === undefined || pht_url === "" ? "img/beef.png" : pht_url;
                    boxPh.style.opacity = `1.0`;
                }
            })

            killPh.addEventListener("click", (e) => {
                if (auth.currentUser){
                    boxPh.style.visibility = `hidden`;
                    boxPh.style.opacity = `0.0`;
                    let url = phTx.value;
                    doc.update({ph_url: url});
                    IMG.src = url;
                    pht_url = url;
                }
            })
        }
    })

}).catch();
