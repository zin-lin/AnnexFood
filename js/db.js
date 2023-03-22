//Firestore.instance.collection("recipe") - Dart
var xox = [
    {id: 1, data: {title:"Hello Food", ingredient: "Hello Food, food, x"}},
    {id: 2, data: {title:"Hello Food 1", ingredient: "Hello Food, food, x"}},
    {id: 3, data: {title:"Hello Food 2", ingredient: "Hello Food, food, x"}},
    {id: 4, data: {title:"Hello Food 3", ingredient: "Hello Food, food, x"}},
    {id: 5, data: {title:"Hello Food 4", ingredient: "Hello Food, food, x"}},
    {id: 6, data: {title:"Hello Food 5", ingredient: "Hello Food, food, x"}},
    {id: 7, data: {title:"Hello Food 6", ingredient: "Hello Food, food, x"}},
    {id: 8, data: {title:"Hello Food 7", ingredient: "Hello Food, food, x"}},
    {id: 9, data: {title:"Hello Food 8", ingredient: "Hello Food, food, x"}},
    {id: 10, data: {title:"Hello Food 9", ingredient: "Hello Food, food, x"}},
    {id: 11, data: {title:"Hello Food 10", ingredient: "Hello Food, food, x"}},
    {id: 12, data: {title:"Hello Food 11", ingredient: "Hello Food, food, x"}},
]


const load = ()=> {
    db.collection("recipe").onSnapshot((sn) => {
        //  console.log(sn.docChanges());
        sn.docChanges().forEach(ch => {
            // console.log(ch, ch.doc.data(), ch.doc.id);
            //In Dart documentId here id
            //data is the same

            if (ch.type === "added") {
                //add the document data to index.html
                renderRecipe(ch.doc.data(), ch.doc.id)
            }

            if (ch.type === "removed") {
                //remove the document data to index.html

                removeRecipe(ch.doc.id);
            }
        });
    });
}


load();

// give names to element
const alertbox = document.getElementById("box1");
const alert01 = document.getElementById("alert1");
const nav = document.querySelector("nav");
// method to kill alertbox
function alertkill () {
    alertbox.style.visibility = "hidden";
    alertbox.style.opacity = 0;
    nav.style.visibility = "visible"
}
alert01.addEventListener("click", evt => alertkill())
alertbox.addEventListener("click", evt => alertkill())

//Add New Document
const form = document.getElementById("form");
const form1 = document.getElementById("sideone");
form.addEventListener("submit", evt=>{
    evt.preventDefault();
    console.log("Logged");
    const val = form.title.value;
    if (val.toString().length !== 0) {
        const recipe = {
            title: val,
            ingredient: form.ingredients.value,
        };
        db.collection("recipe").add(recipe).then(() => {
            console.log("Added")
        }).catch(err => console.log(err));

        form.title.value = "";
        form.ingredients.value="";
    }
    else {
        alertbox.style.visibility = "visible";
        alertbox.style.opacity = 1;
    }
});

// can be null
try {
    form1.addEventListener("submit", evt => {
        evt.preventDefault();
        text = form1.titleSide.value;
        console.log(form1.titleSide.value + " :: " + form1.ingredientsSide.value);
        if (text.toString().length !== 0) {
            const recipe = {
                title: form1.titleSide.value,
                ingredient: form1.ingredientsSide.value,
            };
            db.collection("recipe").add(recipe)
                .then(() => {
                    console.log("Added")
                })
                .catch(err => console.log(err));
            form1.titleSide.value = "";
            form1.ingredientsSide.value = "";
        } else {
            alertbox.style.visibility = "visible";
            alertbox.style.opacity = 1;
        }

    });
}catch (err) {}

//Delete a Recipe 

const recipeContainer = document.querySelector(".recipes");

// Could be null
try{
recipeContainer.addEventListener("click", eve=>{
    //console.log(eve);

    if (eve.target.tagName === "I"){
        const id = eve.target.getAttribute("data-id");
        db.collection("recipe").doc(id).delete();
    }
})}
catch (e){

}

// This block doesn't work well with Apple OSes, beacause Apple doesn't support PWA development well
try {
    firebase.firestore().enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
// Subsequent queries will use persistence, if it was enabled successfully
}
catch (err) {

}

