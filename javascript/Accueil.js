

/* TEST TABLEAU IDEM API */

/* let tableauObjest = [{
    name: "toto",
    description: "35",
    price: "50",
    _id: "5beaa8bf1c9d440000a57d94",
    imageUrl: "http://localhost:3000/images/teddy_1.jpg"
},{
    name: "toto2",
    description: "40",
    price: "30",
    _id: "5beaaa8f1c9d440000a57d95",
    imageUrl: "http://localhost:3000/images/teddy_2.jpg"
},
{
    name: "toto3",
    description: "50",
    price: "20",
    _id: "5beaabe91c9d440000a57d96",
    imageUrl: "http://localhost:3000/images/teddy_3.jpg"
}
] */

/* == AJOUT DU BLOC HTML RECEVANT LE CONTENU == */

var ajoutNouveauProduit = function (nom, description, prix, id, image) {

    const categorie = document.getElementById("categorie")

    const produit = document.createElement("a")
    produit.setAttribute("id", "produit") 
    produit.setAttribute("href", "produit.html?id=" + "'" + id + "'") 
    console.log(produit)

    const nomProduit = document.createElement("h3")
    nomProduit.classList.add("nom")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("description")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("prix")

    const imageProduit = document.createElement("img") 
    imageProduit.setAttribute("src", image)
    

    categorie.appendChild(produit)
    produit.appendChild(nomProduit)
    produit.appendChild(descriptionProduit)
    produit.appendChild(prixProduit)
    produit.appendChild(imageProduit)

    nomProduit.innerHTML = "Nom: " + nom
    descriptionProduit.innerHTML = "Description: " + description
    prixProduit.innerHTML = "Prix: " + prix + " $"
}

/* == RECUPERATION DES DONNEES VIA LE TABLEAU API == */

const recuperationDonneesAPI = function(tableau) {
    
    for (let i=0; i < tableau.length; i++) {      
    ajoutNouveauProduit(tableau[i].name, tableau[i].description, 
        tableau[i].price, tableau[i]._id, tableau[i].imageUrl);
    }
}
 
var request = new XMLHttpRequest();
request.onreadystatechange = function (e) {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        recuperationDonneesAPI(response)
    ;} 
};
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();   








