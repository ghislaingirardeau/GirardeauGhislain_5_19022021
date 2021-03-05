/* == LES FONCTION POUR AFFICHER LE CONTENU PRODUIT DE LA PAGE == */

var creationBlocHtmlProduit = function (nom, description, prix, image) {

    const article = document.getElementById("article")

    const nomProduit = document.createElement("h3")
    nomProduit.classList.add("text-secondary", "col-12", "p-3")

    const elementProduit = document.createElement("div")
    elementProduit.classList.add("col-md-5", "mb-3")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("text-secondary", "pt-5")

    const prixProduit = document.createElement("p")
    prixProduit.setAttribute("id", "prix")
    prixProduit.classList.add("text-secondary", "pt-5", "font-weight-bold")

    const imageProduit = document.createElement("img") 
    imageProduit.setAttribute("src", image)
    imageProduit.classList.add("col-md-7", "mb-3", "rounded")

    article.appendChild(nomProduit)
    

    article.appendChild(elementProduit)
    elementProduit.appendChild(descriptionProduit)
    elementProduit.appendChild(prixProduit)

    article.appendChild(imageProduit)

    nomProduit.innerHTML = "Ourson : " + nom
    nomProduit.style.fontStyle = "italic"

    descriptionProduit.innerHTML = "Description : " + description
    descriptionProduit.style.fontSize = "1.3rem"
    
    prixProduit.innerHTML = "Prix : " + prix + " €"
    prixProduit.style.fontSize = "1.4rem"
}

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
    contenuItem.classList.add("lien_nav", "nav-link", "text-primary", "font-weight-bold", "m-2")
    contenuItem.setAttribute("href", "#")

    ongletMenu.appendChild(itemMenu)
    itemMenu.appendChild(contenuItem)

    contenuItem.innerHTML = element
}

var menuPresonnalisation = function (donnees) {

    var boutonPersonnalisation = document.getElementById("btn_personnalisation")
    var premierItemMenu = document.querySelector("#navbarContent ul li a")

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
                })
                
            } else {
                console.log("Ce produit n'existe plus")
                alert("Ce produit n'existe plus")
            } 
        })
    }
}
recuperationDonneesApi()


/* FONCTION CLICK BOUTON PANIER */

let idproduit = window.location.search

    let getid = new URLSearchParams(idproduit)

    let identifiantProduit = getid.get("id")

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
    })



console.log(localStorage)
