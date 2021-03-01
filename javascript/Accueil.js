/* TEST TABLEAU IDEM API */

let tableauObjest = [{
    name: "toto",
    description: "35",
    prix: "50",
    _id: "5beaa8bf1c9d440000a57d94"
},{
    name: "toto2",
    description: "40",
    prix: "30",
    _id: "5beaaa8f1c9d440000a57d95"
},
{
    name: "toto3",
    description: "50",
    prix: "20",
    _id: "5beaabe91c9d440000a57d96"
}
]

/* == AJOUT DU BLOC HTML RECEVANT LE CONTENU == */

var ajoutNouveauProduit = function (nom, description, prix, id) {

    const categorie = document.getElementById("categorie")

    const produit = document.createElement("a")
    produit.setAttribute("id", "produit") 
    produit.setAttribute("href", "produit.html?id=" + "'" + id + "'") 
    console.log(produit)

    const nomProduit = document.createElement("p")
    nomProduit.classList.add("nom")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("description")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("prix")

    categorie.appendChild(produit)
    produit.appendChild(nomProduit)
    produit.appendChild(descriptionProduit)
    produit.appendChild(prixProduit)

    nomProduit.innerHTML = "Nom: " + nom
    descriptionProduit.innerHTML = "Description: " + description
    prixProduit.innerHTML = "Prix: " + prix + " $"
}

/* == RECUPERATION DES DONNEES VIA LE TABLEAU API == */

const recuperationDonneesAPI = function() {
    
    for (let i=0; i < tableauObjest.length; i++) {      
    ajoutNouveauProduit(tableauObjest[i].name, tableauObjest[i].description, 
        tableauObjest[i].prix, tableauObjest[i]._id);
    }
}

console.log (recuperationDonneesAPI())









