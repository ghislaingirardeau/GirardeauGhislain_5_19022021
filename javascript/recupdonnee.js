/* URL TEDDIES
5be9c8541c9d440000665243
5beaa8bf1c9d440000a57d94
5beaaa8f1c9d440000a57d95
5beaabe91c9d440000a57d96
5beaabe91c9d440000a57d96
*/

/* TEST FONCTION PROMESSE RECUP DE DONNEES */
/* var teddies = [
    {
        id: "5beaaa8f1c9d440000a57d95"
    }
] */

var get = function (url) {
    return new Promise(function (resolve) {
    var request = new XMLHttpRequest();
    request.open("GET", url);

        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(request.responseText)
            ;} /* else {
                reject('erreur') 
            } */
        };
    request.send(); 
    })
}

var getPromise = async function () {

    var response = await get("http://localhost:3000/api/teddies/")
    var donnees = JSON.parse(response);
    console.log(donnees)

   for (let i=0; i < donnees.length; i++) {

    response = await get ("http://localhost:3000/api/teddies/" + donnees[i]._id)
    var posts = JSON.parse(response); 
    }
    return posts
}

getPromise().then(function(posts) {
    
    console.log(posts)

})

/* var request = new XMLHttpRequest();
request.onreadystatechange = function (e) {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)
    ;} 
};
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();   */