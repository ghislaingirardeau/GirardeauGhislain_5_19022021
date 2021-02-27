
var ajoutNouveauProduit = function (nom, description, prix) {

    const categorie = document.getElementById("categorie")

    const produit = document.createElement("div")
    produit.classList.add("produit")
    
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

/* TEST RECUP DONNEES TABLEAU */
let tableauObjest = [{
        name: "toto",
        age: "35",
        id: "12345"
    },{
        name: "toto2",
        age: "40",
        id: "1234567"
    },
    {
        name: "toto3",
        age: "50",
        id: "12345678"
    }
]

const recuperationDonneesAPI = function() {
    
    for (let i=0; i < tableauObjest.length; i++) {      
    ajoutNouveauProduit(tableauObjest[i].name, tableauObjest[i].age, tableauObjest[i].id);
    }
}



/* TEST FONCTIONNALITE AJOUT PANIER */

const recuperationIdProduit = function(itbtn){

    let idProduit = document.getElementById(itbtn).id
    let tableauPanier = []
    console.log(idProduit)
    
    for (let i=0; i < tableauObjest.length; i++) {     
        
        if (idProduit === tableauObjest[i].id) {
            tableauPanier[0] = {test: tableauObjest[i].age, testnom: tableauObjest[i].name, testid: tableauObjest[i].id}
            console.log(tableauPanier)
        } else ("id n'existe pas")
    }  
}    


console.log(recuperationIdProduit("12345678"))