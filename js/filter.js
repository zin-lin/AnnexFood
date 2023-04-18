/**
 * @author: Zin Lin Htun
 * @type {JavaScript}
 */

//Clearing Up
var list = document.getElementById("filX");
list.innerHTML = ""; //cleared up

const urlParams = new URLSearchParams(window.location.search);
let text = urlParams.get('cat');

db.collection("dish").orderBy('date').onSnapshot((sn) => {
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
        if ( (ch.doc.data().category) === text && text.length>0) {
            //add the document data to index.html
            console
                .log((ch.doc.data().name))
            renderCat(ch.doc.data(), ch.doc.id)
        }
    });
});