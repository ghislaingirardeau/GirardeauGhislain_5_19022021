
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
        age: "35"
    },{
        name: "toto2",
        age: "40"
    },
    {
        name: "toto3",
        age: "50"
    }
]

for (let i=0; i < tableauObjest.length; i++) {  
    ajoutNouveauProduit(tableauObjest[i].name, tableauObjest[i].age);
    console.log(ajoutNouveauProduit())
}

let testtab = [1,2,3]
console.log(testtab)

for (let i=0; i < testtab.length; i++) {
    ajoutNouveauProduit(testtab[i], testtab[i])
}
