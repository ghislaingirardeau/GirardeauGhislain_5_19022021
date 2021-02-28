/* RECUPERE LE NOM DE LA PAGE PROPRE AU PRODUIT POUR Y RECUPERER LES INFOS */

let identifiantProduit = window.name

/* == RECUPERATION DES DONNEES PRETES */

var request = new XMLHttpRequest();
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
request.send();   




/* TEST FONCTIONNALITE AJOUT PANIER */

/* const recuperationIdProduit = function(itbtn){

    let idProduit = document.getElementById(itbtn).id
    let tableauPanier = []
    console.log(idProduit)
    
    for (let i=0; i < tableauObjest.length; i++) {     
        
        if (idProduit === tableauObjest[i].id) {
            tableauPanier[0] = {test: tableauObjest[i].age, testnom: tableauObjest[i].name, testid: tableauObjest[i].id}
            console.log(tableauPanier)
        } else ("id n'existe pas")
    }  
}  */ 