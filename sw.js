// Author : Zin Lin Htun

const staticCacheName = "site-static-v9";
const dynamicCacheName = "dynamic-v6";
//always change cache version

const asset = [
    "./", // User ask without the display start up just on server
    "./index.html",
    "./App.js",
    "./js/materialize.min.js",
    "./js/ui.js",
    "./pages/fallback.html",
    "./css/materialize.min.css",
    "./css/minorwidgets.css",
    "./img/dish.png",
    "./img/beef.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",


    
    
]//Assets that will be stored in the shell caches
/* We will need / to request things in same dir in web for the 
server to notice */

//limit cache size
const limitCacheSize = (name, size)=>{
    caches.open(name).then(cac =>
        cac.keys().then(
            keys=>{
                if (keys.length>size && keys[0]!=="./js/db.js" ){
                    cac.delete(keys[0]).then(
                    
                        limitCacheSize(name, size)
                        //Recalling to check the size
                    ); //delete the first item

                }
                else if (keys.length>size && keys[0]=="./js/db.js" ){
                    cac.delete(keys[1]).then(
                    
                        limitCacheSize(name, size)
                        //Recalling to check the size
                    ); //delete the first item

            }}
        ));
        console.log("problem");

}

self.addEventListener("install", 
(event)=> {
   
    event.waitUntil(
    caches.open(staticCacheName)
    .then(
        cache => {
        cache.addAll(asset);
        console.log("caching shell assets;;;;;;");
    })
    );
 
 
 //Create if not exist in native browser

})
 
//self = this module
//self make clear it's not part of the document 
//so it would run on a different thread compared with 
//a norm of a DOM Js File...

//Activate the serviceWorker to use it 

self.addEventListener("activate", eve =>{

    // WE will delete old cache

    eve.waitUntil(
        //Destroy old cache
        caches.keys().then(keys =>{ //Asyn - Await //
            //keys get all the caches...
            //console.log(keys);
            return Promise.all(
                keys.filter(key=> key!== staticCacheName
                    && key!== dynamicCacheName).map(
                    key => caches.delete(key)
                )
            );

        })
    );

    // console.log("Service Worker Has Been activated...");
    // console.log("Service Worker Has Been activated of course..");

});

//Listen for fetch event when browser requests

self.addEventListener("fetch", (eve)=>{

   //console.log("event", eve);

if (eve.request.url.indexOf("firestore.googleapis.com") === -1 &&
 eve.request.url.indexOf("/g/collect") === -1)
{
    eve.respondWith(
        caches.match(eve.request).then(cac =>{
            return cac || fetch(eve.request).then(
                //caching what user browse
                //fetch is a promise Future
                Fres =>{
                return caches.open(dynamicCacheName).then(
                    cac =>{
                        cac.put(eve.request.url, Fres.clone());
                        limitCacheSize(dynamicCacheName, 15);
                        return Fres; //MEW
                        //FRRR
                    }
                )}

            )
            //if null return the actual fetch

        }).catch(
            ()=>{
                //we dun pass the error since we won't use it
             if (eve.request.url.indexOf(".html") > -1){
               return caches.match("./pages/fallback.html");
            }
            }
        )
    );
        }
});

//This would maybe catch the service and allows us to use it offline
//This is also needed for the request banner...

