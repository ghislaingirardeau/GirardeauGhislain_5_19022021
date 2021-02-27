/* URL TEDDIES
5be9c8541c9d440000665243
5beaa8bf1c9d440000a57d94
5beaaa8f1c9d440000a57d95
5beaabe91c9d440000a57d96
5beaabe91c9d440000a57d96
*/

/* TEST FONCTION PROMESSE RECUP DE DONNEES */
var teddies = [
    {
        id: "5beaaa8f1c9d440000a57d95"
    }
]

var get = function (url) {
    return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", url);

        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(request.responseText)
                console.log(request)
            ;} /* else {
                reject(request) 
            } */
        };
    request.send(); 
    })
}

var getPromise = async function () {
    var response = await get("http://localhost:3000/api/teddies/")
    var donnees = JSON.parse(response);
    console.log(donnees[0].name)
   
    response = await get ("http://localhost:3000/api/teddies/" + teddies[0].id)
    var posts = JSON.parse(response); 
    console.log(posts)
    return posts
}

getPromise().then(function(posts) {
    document.getElementById("testrecup").innerHTML = posts._id
})


/* var request = new XMLHttpRequest();
request.onreadystatechange = function (e) {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)
    ;} 
};
request.open("GET", "http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061");
request.send();   */