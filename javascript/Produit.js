let pageProduit = {
    colors: ["dark", "white"],
    name: "toto3",
    description: "50",
    prix: "20",
    id: "1234"
}


const recupId = function(id) {

    window.open("produit.html");
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function (e) {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response)
        ;} 
    };

    request.open("GET", "http://localhost:3000/api/teddies/" + id);
    request.send(); 

}

console.log(recupId("5be9c8541c9d440000665243"))


/* let nomProduit = document.getElementById("nom_produit")
    nomProduit.innerHTML = pageProduit.name

    let descriptionProduit = document.getElementById("descritpion_produit")
    descriptionProduit.innerHTML = pageProduit.description

    let prixProduit = document.getElementById("prix_produit")
    prixProduit.innerHTML = pageProduit.prix + id */


/* BUG A RESOUDRE
- Ne prends pas les lettres de l'Id passé dans la fonction
- 2 fichier js a creer ?? pour faire apparaitre les resultats de la requete
 */