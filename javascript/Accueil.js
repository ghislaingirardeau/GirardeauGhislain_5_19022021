
var ajoutNouveauProduit = function (nom, description, prix, id) {

    const categorie = document.getElementById("categorie")

    const produit = document.createElement("a")
    produit.setAttribute("id", "produit") /* Ajout de l'ID qui sera incrémenter par l'ID du produit a la recup des donnes */
    produit.setAttribute("href", "javascript:recupId(" + id + ")") /* lien commun vers ma page produit */

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
console.log(ajoutNouveauProduit())





/* TEST RECUP DONNEES TABLEAU */
let tableauObjest = [{
        name: "toto",
        description: "35",
        prix: "50",
        id: "1545"
    },{
        name: "toto2",
        description: "40",
        prix: "30",
        id: "12"
    },
    {
        name: "toto3",
        description: "50",
        prix: "20",
        id: "15"
    }
]

const recuperationDonneesAPI = function() {
    
    for (let i=0; i < tableauObjest.length; i++) {      
    ajoutNouveauProduit(tableauObjest[i].name, tableauObjest[i].description, tableauObjest[i].prix, tableauObjest[i].id);
    }
}

console.log (recuperationDonneesAPI())





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







