

/* == AJOUT DU BLOC HTML RECEVANT LE CONTENU == */

var creationBlocHtmlAccueil = function (nom, description, prix, id, image) { /* Parametre correspondant aux donnees API de chaque element */

    const categorie = document.getElementById("categorie")

    const produit = document.createElement("article")
    produit.classList.add("container", "p-4", "col-5", "justify-content-around")

    const lienProduit = document.createElement("a") 
    lienProduit.setAttribute("href", "produit.html?id=" + id ) /* AJOUT LE PARAMETRE ID DU PRODUIT A L'URL POUR LA RECUPERER SUR LA PAGE */
    lienProduit.classList.add("row", "py-5", "bg-light", "rounded")

    const elementProduit = document.createElement("div")
    elementProduit.classList.add ("col-6")

    const nomProduit = document.createElement("h3")
    nomProduit.classList.add("text-secondary")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("text-secondary")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("text-secondary")

    const imageProduit = document.createElement("img")
    imageProduit.classList.add("float-right", "col-6")
    imageProduit.setAttribute("src", image) /* AJOUT DU PARAMETRE IMAGE QUI RECUPERE L'URL DE L'IMAGE CORRESPONDANTE */
    imageProduit.setAttribute("alt", "image de l'ourson " + nom) /* AJOUT DU NOM DE L'OURSON */

    categorie.appendChild(produit)
    produit.appendChild(lienProduit)
    lienProduit.appendChild(elementProduit)
    
    elementProduit.appendChild(nomProduit)
    elementProduit.appendChild(descriptionProduit)
    elementProduit.appendChild(prixProduit)

    lienProduit.appendChild(imageProduit)

    nomProduit.innerHTML = nom  /* INJECTE LES DONNEES EN PARAMETRES DANS LE HTML AUX EMPLACEMENTS DEFINIS */
    descriptionProduit.innerHTML = "Description: " + description
    prixProduit.innerHTML = "Prix: " + prix + " €"
}

/* == ENVOIE DES DONNES SUR LA PAGE ACCUEIL == */

const listeProduitsAccueil = function(tableau) {
    
    for (let i=0; i < tableau.length; i++) {      
        creationBlocHtmlAccueil(tableau[i].name, tableau[i].description, 
        tableau[i].price, tableau[i]._id, tableau[i].imageUrl);
       
    }
}

/* == RECUPERATION DES DONNEES API == */

var recuperationDonneesApi = async function (url, identifiantProduit) {
    
    if (identifiantProduit === undefined) {
        let request = await fetch (url)
        .then (async function(response) {
            if (response.ok) {
                let data = await response.json()
                .then (function(donnees) {
                    listeProduitsAccueil(donnees)
                })
            } else {
                console.log('mauvaise réponse du serveur')
            }            
        })
    }   else {
        let request = await fetch (url + identifiantProduit)
        .then (async function(response) {
            if (response.ok) {
                let data = await response.json()
                .then (function(donnees) {
                    descriptifProduit(donnees)
    
                    menuPresonnalisation(donnees.colors)
                })
            } else {
                console.log('mauvaise réponse du serveur')
            } 
        })
    }
}
recuperationDonneesApi("http://localhost:3000/api/teddies/")










