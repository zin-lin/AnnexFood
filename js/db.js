//Firestore.instance.collection("recipe") - Dart
/**
 * @author: Zin Lin Htun
 * @type {JavaScript}
 */

var loading = document.getElementById('loading');
// var groups = [
//     {
//         name: 'Fish And Chips',
//         date: '2',
//         des:'Best Fish And Chips Recipe Ever',
//         ingredients:['Cod Fillet/Fish', 'Salt', 'Belheaven Beer', 'Batter Mix/Flour', "chips"],
//         ph_url:'',
//         category:'',
//         steps:['Make Beer Batter Mix', 'Rub the fish in this mix', 'Deep Fry the fish for 4 mins',
//             'make chips'
//         ],
//         del: false
//     },
//     {
//         name: 'Halloumi And Chips',
//         date: '4',
//         des:'Best Halloumi And Chips Recipe Ever',
//         ingredients:['3 Slices of Halloumi', 'Salt', 'Belheaven Beer', 'Batter Mix/Flour', "chips"],
//         ph_url:'',
//         category:'',
//         steps:['Make Beer Batter Mix', 'Rub the halloumi in this mix', 'Deep Fry the slices for 4 mins',
//             'make chips'
//         ],
//         del: false
//     },
//     {
//         name: 'Steak Pie',
//         date: '3',
//         des:'Best Steak Pie Recipe Ever',
//         ingredients:['104kg Beef Steak', 'Salt', 'Belheaven Beer', 'White Onion', "chips", "Gravy"],
//         ph_url:'',
//         category:'',
//         steps:['Preheat your oven to 400°F (200°C).', 'Heat a large skillet over medium-high heat and add a little bit of butter or oil. Add the diced beef and cook until browned on all sides'
//             , 'Remove the beef from the skillet and set aside. Add the onion, carrot, celery, and garlic to the skillet and cook until softened, about 5 minutes.'
//             , 'Sprinkle the flour over the vegetables and stir to combine. Add the tomato paste, beef stock, red wine, thyme, and bay leaf. Stir well and bring to a simmer.'
//             , 'Add the beef back to the skillet and stir to combine. Cover the skillet and simmer for 1-2 hours, or until the beef is tender and the sauce has thickened. Season with salt and pepper to taste.'
//         ],
//         del: false
//     },
//
// ]


const  load = ()=> {
    db.collection("dish").limit(200).orderBy('date').onSnapshot((sn) => {
        //  console.log(sn.docChanges());
        sn.docChanges().forEach(ch => {
            // console.log(ch, ch.doc.data(), ch.doc.id);
            //In Dart documentId here id
            //data is the same
            try{
                if (loading.style.visibility !== 'hidden') {
                    loading.style.visibility = 'hidden';
                    loading.style.width = 0;
                    loading.style.height = 0;
                    loading.style.margin = 0;
                }
            }catch (e) {
                
            }
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
    var userNow;
    auth.onAuthStateChanged((user) => {
        if (user == null) {
            alert("Please log in to add a new recipe");
            return;
        }
        userNow = user;

    })
    console.log("Logged");

    console.log(userNow);
    const val = form.title.value;
    const now = new Date();
    const timeNow = now.getTime().toString();
    if (val.toString().length !== 0) {
        const recipe = {
            name: val,
            des: form.ingredients.value,
            date: timeNow,
            steps:[],
            category: "",
            ph_url:"",
            ingredients:[],
            user_id: auth.currentUser.uid,

        };
        db.collection("dish").add(recipe).then((doc) => {
            console.log("Added")
            if (smth === null) {
                alert("please log in to add a new recipe");
            }
            else {
                var url = "./recipe.html?did=" + doc.id;
                window.location.href = url;
            }
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

        var userNow =null;
        auth.onAuthStateChanged((user) => {
            if (user == null) {
                alert("Please log in to add a new recipe");
                return;
            }
            userNow = user;
        })
        text = form1.titleSide.value;
        console.log(form1.titleSide.value + " :: " + form1.ingredientsSide.value);
        if (text.toString().length !== 0) {

            const now = new Date();
            const val = form1.titleSide.value;
            const timeNow = now.getTime().toString();
            const recipe = {
                name: val,
                des: form1.ingredientsSide.value,
                date: timeNow,
                steps:[],
                category: "",
                ph_url:"",
                ingredients:[],
                user_id: auth.currentUser.uid,

            };
            db.collection("dish").add(recipe)
                .then((smth) => {
                    if (smth === null) {
                        alert("please log in to add a new recipe");
                    }
                    else {
                        var url = "./recipe.html?did=" + smth.id;
                        window.location.href = url;
                    }
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
        db.collection("dish").doc(id).delete().catch((err)=>{alert(err.message);});
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

