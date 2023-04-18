/**
 * @author: Zin Lin Htun
 */

//Check Service Worker Is Supported

if("serviceWorker" in navigator){
    //navigator is the whole app's frame in JS
    //Check whether sws are supported

   navigator.serviceWorker.register("./serverThread.js")
    .then((reg)=> console.log("Registered", reg))
    .catch((error)=> console.log("Error registering the serviceWorker...", error))

    //get the file and register

    //Make A Future Since
    //this is asynchronous work
}else{
    console.log("You've been served")
}
