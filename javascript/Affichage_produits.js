/* == BLOC HTML PAGE ACCUEIL == */

var creationBlocHtmlAccueil = function (nom, description, prix, id, image) { /* Parametre correspondant aux donnees API de chaque element */

    const categorie = document.getElementById("categorie")

    const produit = document.createElement("article")
    produit.classList.add("p-4", "col-12", "col-md-6", "col-lg-5")

    const lienProduit = document.createElement("a") 
    lienProduit.setAttribute("href", "produit.html?id=" + id ) /* AJOUT LE PARAMETRE ID DU PRODUIT A L'URL POUR LA RECUPERER SUR LA PAGE */
    lienProduit.classList.add("row", "py-5", "bg-light", "rounded", "text-decoration-none")

    const elementProduit = document.createElement("div")
    elementProduit.classList.add ("col-sm-6")

    const nomProduit = document.createElement("h3")

    const descriptionProduit = document.createElement("p")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("font-weight-bold")

    const imageProduit = document.createElement("img")
    imageProduit.classList.add("float-right", "col-sm-6")
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
    prixProduit.innerHTML = "Prix: " + parseFloat(prix / 100) + " €"
}

/* == ENVOIE DES DONNEES SUR LA PAGE ACCUEIL == */

const listeProduitsAccueil = function(tableau) {
    
    for (let i=0; i < tableau.length; i++) {      
        creationBlocHtmlAccueil(tableau[i].name, tableau[i].description, 
        tableau[i].price, tableau[i]._id, tableau[i].imageUrl);
       
    }
}

/* == BLOC HTML PAGE PRODUIT == */

var creationBlocHtmlProduit = function (nom, description, prix, image) {

    const article = document.getElementById("article")

    const nomProduit = document.createElement("h3")
    nomProduit.classList.add("col-12", "p-3")

    const elementProduit = document.createElement("div")
    elementProduit.classList.add("col-md-5", "mb-3")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("pt-5")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("pt-5", "font-weight-bold")

    const imageProduit = document.createElement("img") 
    imageProduit.setAttribute("src", image)
    imageProduit.classList.add("col-md-7", "mb-3")

    article.appendChild(nomProduit)
    

    article.appendChild(elementProduit)
    elementProduit.appendChild(descriptionProduit)
    elementProduit.appendChild(prixProduit)

    article.appendChild(imageProduit)

    nomProduit.innerHTML = "Ourson : " + nom
    nomProduit.style.fontStyle = "italic"

    descriptionProduit.innerHTML = "Description : " + description
    descriptionProduit.style.fontSize = "1.3rem"
    
    prixProduit.innerHTML = "Prix : " + parseFloat(prix / 100) + " €"
    prixProduit.style.fontSize = "1.4rem"
}

/* == ENVOIE DES DONNEES SUR LA PAGE PRODUIT == */

const descriptifProduit = function(donnees) {
    
    creationBlocHtmlProduit(donnees.name, donnees.description, 
        donnees.price, donnees.imageUrl)

}

/* == LES FONCTION POUR LA PERSONNALISATION DU PRODUIT ET SON MENU DEROULANT == */

var nouvelOngletPersonnalisation = function (element) {

    var ongletMenu = document.querySelector("#navbarContent ul")

    var itemMenu = document.createElement("li")
    itemMenu.classList.add("nav-item", "border-bottom", "border-dark")

    var contenuItem = document.createElement("a")
    contenuItem.classList.add("nav-link", "text-primary", "font-weight-bold", "m-2")
    contenuItem.setAttribute("href", "#")

    var textItem = document.createElement("p")
    textItem.classList.add("lien_nav")


    ongletMenu.appendChild(itemMenu)
    itemMenu.appendChild(contenuItem)
    contenuItem.appendChild(textItem)

    textItem.innerHTML = element
}

var menuPresonnalisation = function (donnees) {

    var boutonPersonnalisation = document.getElementById("btn_personnalisation")
    var premierItemMenu = document.querySelector("#navbarContent ul li a p")

    if (donnees == undefined || donnees.length == 0) { /* Si il n'y a pas de données ou que le tableau n'existe pas */
        boutonPersonnalisation.setAttribute("disabled", "")
        throw ("les donnees ou le tableau n'existent pas")

    } else {

        premierItemMenu.innerHTML= donnees[0] /* Renvoie a la 1ere données pour conserver la class active (bootstrap) des items du menu */

        for (i=1; i < donnees.length; i++) { /* commence au 2eme élement du tableau car la 1ere est deja incrementer */
            
            nouvelOngletPersonnalisation (donnees[i])
        }
    }
}

/* FONCTION CLICK BOUTON PANIER */

var clickBoutonPanier = function (identifiantProduit) {

    var boutonPanier = document.getElementById("btn_panier")

    boutonPanier.addEventListener('click', function (){

        var click = 0
    
        for (i=0; i < localStorage.length; i++) { /* Je compare l'Id a chacune des clés du tableau, si l'ID est deja presente retourne true */

            var valeurCache = localStorage.key(i)

            if (identifiantProduit === valeurCache) {
                var result = "true"
                var valeurCle =  localStorage.key(i)
            } 
        }

        if (result == "true") { /* Si l'id est présente, j'applique cette fonction */
                
            click++
            var nombreClickFait = parseInt(localStorage.getItem(valeurCle))
            var totalClick = nombreClickFait + click
            localStorage.setItem(valeurCle, totalClick)
        }  
    
        else { /* Si l'id n'est pas presente alors je l'insere dans le cache */

            localStorage.setItem(identifiantProduit, "1")
        }
        document.location.reload()
    })
}

/* NOMBRE PRODUIT PANIER */

var nombreProduitsPanier = function() {
    
    var iconeCompteur = document.getElementById("Compteur__panier")
    var compteur = 0
    for (i=0; i < localStorage.length; i++) {
        
        var nombreClick = parseInt(localStorage.getItem(localStorage.key(i)))
        compteur += nombreClick
    }

    if (compteur > 0) {
        iconeCompteur.style.backgroundColor = "yellow"
        iconeCompteur.style.border = "1px solid grey"
        iconeCompteur.style.color = "black"
        iconeCompteur.innerHTML = compteur
       
    } else {
        iconeCompteur.style.display = "none"
    }
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

                    listeProduitsAccueil(donnees)
                    nombreProduitsPanier()
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

                    descriptifProduit(donnees)
                    menuPresonnalisation(donnees.colors)
                    clickBoutonPanier(identifiantProduit)
                    nombreProduitsPanier()
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









