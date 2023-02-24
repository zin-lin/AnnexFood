//Firestore.instance.collection("recipe") - Dart

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
db.enablePersistence().catch(
    err=>{
        if (err.code == "failed-precondition"){
            console.log("Persistance Falied...");
        }

        else if (err.code == "unimplemented"){
            console.log("persistence is not available in this browser...")
        }
    }
);//errors might occurs

db.collection("recipe").onSnapshot((sn)=>{
  //  console.log(sn.docChanges());

  sn.docChanges().forEach(ch => {
     // console.log(ch, ch.doc.data(), ch.doc.id);
      //In Dart documentId here id
      //data is the same

      if (ch.type === "added"){
          //add the document data to index.html
          console.log(ch.doc.data());
          renderRecipe(ch.doc.data(), ch.doc.id)
      }

      if (ch.type === "removed"){
          //remove the document data to index.html

          removeRecipe(ch.doc.id);
      }
  });
}); 


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

form1.addEventListener("submit", evt=>{
    evt.preventDefault();
    text = form1.titleSide.value;
    console.log(form1.titleSide.value +" :: "+form1.ingredientsSide.value);
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
    }
    else{
        alertbox.style.visibility = "visible";
        alertbox.style.opacity = 1;
    }

});

//Delete a Recipe 

const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", eve=>{
    //console.log(eve);

    if (eve.target.tagName === "I"){
        const id = eve.target.getAttribute("data-id");
        db.collection("recipe").doc(id).delete();
    }
})


