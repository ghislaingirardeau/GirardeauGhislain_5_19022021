
var recuperationDonneesApi = async function (url, identifiantProduit) {
    
    if (identifiantProduit === undefined) {
        let request = await fetch (url)
        .then (async function(response) {
            if (response.ok) {
                let data = await response.json()
                .then (function(donnees) {
                    console.log(donnees) 
                })
            } else {
                console.log('mauvaise réponse du serveur')
            }            
        })
    }   else {
        let request = await fetch (url + identifiantProduit)
        .then (async function(response) {
            if (response.ok) {
                let data = await response.json()
                .then (function(data2) {
                    console.log(data2) 
                })
            } else {
                console.log('mauvaise réponse du serveur')
            } 
        })
    }
}

console.log(recuperationDonneesApi("http://localhost:3000/api/teddies/"/* , '5be9c8541c9d440000665243' */))


    



/* TEST FONCTION PROMESSE RECUP DE DONNEES */


/* var get = function (url) {
    return new Promise(function (resolve) {
    var request = new XMLHttpRequest();
    request.open("GET", url);

        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(request.responseText)
            ;} 
         };
    request.send(); 
    })
}

var getPromise = async function () {

    var response = await get("http://localhost:3000/api/teddies/")
    var donnees = JSON.parse(response);
    
    return donnees
}
console.log(getPromise())

getPromise().then(function(donnees) {
    
    console.log(donnees)

}) */

/* var request = new XMLHttpRequest();
request.onreadystatechange = function (e) {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)
    ;} 
};
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();  




/* var getPromise = async function () {

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

}) */