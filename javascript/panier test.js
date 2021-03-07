/* == BLOC HTML PAGE PANIER == */

var creationBlocHtmlPanier = function (image, nom, prix, quantite, id) { /* Parametre correspondant aux donnees API de chaque element */

    const produitPanier = document.getElementById("produit_Panier")

    const produit = document.createElement("article")
    produit.classList.add("p-4", "row", "bg-light")

    const blocimage = document.createElement("div")
    blocimage.classList.add ("col-3")

    const imageProduit = document.createElement("img")
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
    
    elementProduit.appendChild(totalProduit)

    nomProduit.innerHTML = nom
    prixProduit.innerHTML = parseFloat(prix / 100) + " €"
    quantiteProduit.innerHTML = quantite
    
    totalProduit.innerHTML = quantite * parseFloat(prix / 100)
    
    var boutonChangeQuantite = function () {

        const boutonPlus = document.createElement("button")
        boutonPlus.classList.add("text-secondary")
        boutonPlus.setAttribute("type", "button")
    
        const boutonMoins = document.createElement("button")
        boutonMoins.classList.add("text-secondary")
        boutonMoins.setAttribute("type", "button")

        quantiteProduit.appendChild(boutonPlus)
        quantiteProduit.appendChild(boutonMoins)

        boutonPlus.innerHTML = "+"
        boutonMoins.innerHTML = "-"

        boutonPlus.addEventListener('click', function (){
           
            var valeurIDCache = parseInt(localStorage.getItem(id)) 
            var ajoutUnClick = valeurIDCache + 1
            localStorage.setItem(id, ajoutUnClick)
            document.location.reload();
        })

        boutonMoins.addEventListener('click', function (){
            
            var valeurIDCache = parseInt(localStorage.getItem(id)) 
            var ajoutUnClick = valeurIDCache - 1
            localStorage.setItem(id, ajoutUnClick)

            if(valeurIDCache === 0) {
                localStorage.removeItem(id)
            }
            document.location.reload();
        })
    }

    boutonChangeQuantite()
}



/* PANIER VIDE */

var panierVide = function() {

    const produitPanier = document.getElementById("produit_Panier")

    const produit = document.createElement("article")
    produit.classList.add("p-4", "row", "bg-light")

    const ContentPanierVide = document.createElement("p")

    produitPanier.appendChild(produit)
    produit.appendChild(ContentPanierVide)

    ContentPanierVide.innerHTML = "Votre panier est vide"
}

/* NOMBRE PRODUIT PANIER */

var nombreProduitsPanier = function() {
    
    var quantiteTotale = document.querySelector(".recapitulatif .quantite")
    var compteur = 0
    for (i=0; i < localStorage.length; i++) {
        
        var nombreClick = parseInt(localStorage.getItem(localStorage.key(i)))
        compteur += nombreClick
    }

    if (compteur > 0) {
        quantiteTotale.innerHTML = compteur
    } else {
        quantiteTotale.innerHTML = "0"
    }
}

/* VIDER LE PANIER */

var viderPanier = function() {
    
    var boutonViderPanier = document.querySelector("#btn_paniervide")
    boutonViderPanier.addEventListener('click', function() {
        localStorage.clear()
        document.location.reload();
    })

}

/* == LISTE PRODUITS PAGE PANIER == */

var ListeProduitsPanier = function(donnees) {
   
    if (localStorage.length === 0) {

        panierVide()
        
    }

    var idEnCache = Object.keys(localStorage)   /* Je charge le localstorage dans 1 tableau regroupant les cles */
    var valeurEnCache = Object.values(localStorage) /* puis dans un tableau regroupant les valeurs. L'index permet d'associer l'id a sa valeur */

    for (i=0; i < donnees.length; i++) {

        var IdDonneesAPI = donnees[i]._id /* recuperer l'id de l'API a chaque boucle */

        if (idEnCache.indexOf(IdDonneesAPI) != -1) { /* Si l'id correspond a un index du tableau regroupant les cles, alors je fais la fonction suivante (-1 veut dire qu'il ne trouve pas l'index)*/
            
            var getIndexValeurCache = valeurEnCache[idEnCache.indexOf(IdDonneesAPI)]
            var getIndexDonneesAPI = i

            creationBlocHtmlPanier(donnees[getIndexDonneesAPI].imageUrl, donnees[getIndexDonneesAPI].name,
             donnees[getIndexDonneesAPI].price, getIndexValeurCache, donnees[getIndexDonneesAPI]._id)
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
                    
                    nombreProduitsPanier()
                    viderPanier()
                    ListeProduitsPanier(donnees)
                    /* var gettotalval = document.getElementById("totalunitaire")
                    console.log(gettotalval.textContent) */

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

