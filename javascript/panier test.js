/* == BLOC HTML PAGE PANIER == */

var creationBlocHtmlPanier = function (image, nom, prix, quantite) { /* Parametre correspondant aux donnees API de chaque element */

    const produitPanier = document.getElementById("produit_Panier")

    const produit = document.createElement("article")
    produit.classList.add("p-4", "row")

    const blocimage = document.createElement("div")
    blocimage.classList.add ("col-3")

    const imageProduit = document.createElement("img")
    imageProduit.classList.add("col-3")
    imageProduit.setAttribute("src", image) /* AJOUT DU PARAMETRE IMAGE QUI RECUPERE L'URL DE L'IMAGE CORRESPONDANTE */
    imageProduit.setAttribute("alt", "image de l'ourson " + nom) /* AJOUT DU NOM DE L'OURSON */

    const elementProduit = document.createElement("div")
    elementProduit.classList.add ("col-9")

    const nomProduit = document.createElement("p")
    nomProduit.classList.add("text-secondary", "list-inline-item")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("text-secondary", "list-inline-item")

    const quantiteProduit = document.createElement("p")
    quantiteProduit.classList.add("text-secondary", "list-inline-item")

    const boutonPlus = document.createElement("button")
    boutonPlus.classList.add("text-secondary")
    boutonPlus.setAttribute("type", "button")

    const boutonMoins = document.createElement("button")
    boutonMoins.classList.add("text-secondary")
    boutonMoins.setAttribute("type", "button")

    const totalProduit = document.createElement("p")
    totalProduit.classList.add("text-secondary", "list-inline-item")
    totalProduit.setAttribute("id", "totalunitaire")
    
    produitPanier.appendChild(produit)
    produit.appendChild(blocimage)
    produit.appendChild(elementProduit)

    blocimage.appendChild(imageProduit)
    
    elementProduit.appendChild(nomProduit)
    elementProduit.appendChild(prixProduit)
    elementProduit.appendChild(quantiteProduit)
    elementProduit.appendChild(boutonPlus)
    elementProduit.appendChild(boutonMoins)
    elementProduit.appendChild(totalProduit)

    nomProduit.innerHTML = nom
    prixProduit.innerHTML = prix + " €"
    quantiteProduit.innerHTML = quantite
    boutonPlus.innerHTML = "+"
    boutonMoins.innerHTML = "-"
    totalProduit.innerHTML = "Montant Total Unitaire: "

}



/* == RECUPERATION DES DONNEES API == */

var recuperationDonneesApi = async function () {

    let idproduit = window.location.search

    let getid = new URLSearchParams(idproduit)

    let identifiantProduit = getid.get("id")
    
    if (identifiantProduit === null) {
        let request = await fetch ("http://localhost:3000/api/teddies/")
        .then (async function(response) {

            if (response.ok) {

                let data = await response.json()

                .then (function(donnees) {
                    

for (i=0; i < localStorage.length;i++){
    
    var donneesCache = localStorage.key(i)
    console.log(donneesCache)

    for (i=0; i < donnees.length;i++) {
        var donneesAPI = donnees[i]._id
        console.log(donneesAPI)

        if (donneesCache === donneesAPI) {
            var result = 'true'
            var indexDonneesPresente = i 
        }
    }

}


console.log(indexDonneesPresente)











                })

            } else {
                console.log("Cette URL n'est pas disponible")
                alert("Cette URL n'est pas disponible")
            }            
        })
    }   else {
        let request = await fetch ("http://localhost:3000/api/teddies/" + identifiantProduit)
        .then (async function(response) {

            if (response.ok) {

                let data = await response.json()

                .then (function(donnees) {

                   
                })

            } else {
                console.log("Ce produit n'existe plus")
                alert("Ce produit n'existe plus")
            } 
        })
    }
}

recuperationDonneesApi()
console.log(localStorage)