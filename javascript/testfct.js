
var compteurNombreProduit = function () {

    const NombreProduit = document.getElementsByClassName("produit").length;
    return (NombreProduit)
}


var ajoutNouveauProduit = function (name, age) {
       
    const nouveauProduit = compteurNombreProduit() + 1;

    const categorie = document.getElementById("categorie")

    const produit = document.createElement("div")
    produit.classList.add("produit", + nouveauProduit)
    
    const nomtest = document.createElement("p")
    nomtest.classList.add("nom")

    const agetest = document.createElement("p")
    agetest.classList.add("age")

    categorie.appendChild(produit)
    produit.appendChild(nomtest)
    produit.appendChild(agetest)

    nomtest.innerHTML = name
    agetest.innerHTML = age
    
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
    ajoutNouveauProduit(tableauObjest[i].name, tableauObjest[i].age);
    }
}

console.log(recuperationDonneesAPI())

/* TEST FONCTIONNALITE AJOUT PANIER */

const recuperationIdProduit = function(itbtn){

    let idProduit = document.getElementById(itbtn).id
    let tableauPanier = []
    console.log(idProduit)
    
    for (let i=0; i < tableauObjest.length; i++) {  
        console.log(tableauObjest[i].id)    
        
        if (idProduit === tableauObjest[i].id) {
            tableauPanier[0] = {test: tableauObjest[i].age, testnom: tableauObjest[i].name}
            console.log(tableauPanier)
        } else ("id n'existe pas")
    }  
}    


console.log(recuperationIdProduit("12345678"))