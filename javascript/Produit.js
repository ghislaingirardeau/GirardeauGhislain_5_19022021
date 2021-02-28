/* RECUPERE LE NOM DE LA PAGE PROPRE AU PRODUIT POUR Y RECUPERER LES INFOS */

let identifiantProduit = window.name
console.log(identifiantProduit)



/* == RECUPERATION DES DONNES PRETES */


/* var request = new XMLHttpRequest();
request.onreadystatechange = function (identifiantProduit) {

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        let nomProduit = document.getElementById("nom_produit")
        nomProduit.innerHTML = response.name

        let descriptionProduit = document.getElementById("descritpion_produit")
        descriptionProduit.innerHTML = response.description

        let prixProduit = document.getElementById("prix_produit")
        prixProduit.innerHTML = response.price
    ;}

};

request.open("GET", "http://localhost:3000/api/teddies/" + identifiantProduit);
request.send();   */




