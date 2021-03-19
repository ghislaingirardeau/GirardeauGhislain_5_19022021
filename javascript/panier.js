/* == FONCTION CHANGEMENT QUANTITE DANS LE PANIER == */

var boutonChangeQuantite = function (quantiteProduit, quantite, id) { /* Bouton pour ajuster les quantités dans le localstorage en fonction de l'ID */

        const boutonPlus = document.createElement("button")
        boutonPlus.classList.add("btn", "btn-light", "border")
        boutonPlus.setAttribute("type", "button")

        const compteurQuantite = document.createElement("strong")
        compteurQuantite.classList.add("px-2")
    
        const boutonMoins = document.createElement("button")
        boutonMoins.classList.add("btn", "btn-light", "border")
        boutonMoins.setAttribute("type", "button")

        quantiteProduit.appendChild(boutonMoins)
        quantiteProduit.appendChild(compteurQuantite)
        quantiteProduit.appendChild(boutonPlus)

        boutonPlus.innerHTML = "+"
        boutonMoins.innerHTML = "-"
        compteurQuantite.innerHTML = quantite

        var changeQuantite = function(val) {
            var valeurIDCache = parseInt(localStorage.getItem(id)) 
            var ajoutUnClick = valeurIDCache + val
            localStorage.setItem(id, ajoutUnClick)

                if (ajoutUnClick < 0 ) {
                localStorage.removeItem(id)
                }
            document.location.reload();
        }

        boutonPlus.addEventListener('click', function(){
            changeQuantite(1)
        })

        boutonMoins.addEventListener('click', function(){
            changeQuantite(-1)
        })
}

/* == BLOC HTML PAGE PANIER == */

var creationBlocHtmlPanier = function (image, nom, prix, quantite, id) { /* Parametre correspondant aux donnees API de chaque element */

    const produitPanier = document.getElementById("produit_Panier")

    const produit = document.createElement("tr")
    produit.classList.add("row", "text-center", 'py-4')

    const blocimage = document.createElement("td")
    blocimage.classList.add ("col-6", "col-sm-3")

    const imageProduit = document.createElement("img")
    imageProduit.setAttribute("src", image) /* AJOUT DU PARAMETRE IMAGE QUI RECUPERE L'URL DE L'IMAGE CORRESPONDANTE */
    imageProduit.setAttribute("alt", "image de l'ourson " + nom) /* AJOUT DU NOM DE L'OURSON */
    imageProduit.classList.add ("w-md-75", "order-0", "order-sm-0")

    const nomProduit = document.createElement("td")
    nomProduit.classList.add("col-3", "col-sm-2", "pt-3", "pt-md-5", "order-2", "order-sm-1")

    const prixProduit = document.createElement("td")
    prixProduit.classList.add("col-3", "col-sm-2", "pt-3", "pt-md-5", "order-3", "order-sm-2")

    const quantiteProduit = document.createElement("td")
    quantiteProduit.classList.add("col-6", "col-sm-3", "pt-3", "pt-md-5", "order-1", "order-sm-3")

    const totalProduit = document.createElement("td")
    totalProduit.classList.add("col-6", "col-sm-2", "pt-3", "pt-md-5", "font-weight-bold", "order-4", "order-sm-4")
    totalProduit.setAttribute("id", "totalunitaire")
    
    produitPanier.appendChild(produit)
    produit.appendChild(blocimage)

    blocimage.appendChild(imageProduit)
    
    produit.appendChild(nomProduit)
    produit.appendChild(prixProduit)
    produit.appendChild(quantiteProduit)
    
    produit.appendChild(totalProduit)

    nomProduit.innerHTML = nom
    prixProduit.innerHTML = parseFloat(prix / 100) + " €"
    
    totalProduit.innerHTML = quantite * parseFloat(prix / 100) + " €"
    
    boutonChangeQuantite(quantiteProduit, quantite, id)
}

/* PANIER VIDE */

var panierVide = function() {

    const produitPanier = document.getElementById("produit_Panier")

    const produit = document.createElement("tr")
    produit.classList.add("text-left", "col-12")

    const ContentPanierVide = document.createElement("td")
    ContentPanierVide.classList.add("p-3")

    produitPanier.appendChild(produit)
    produit.appendChild(ContentPanierVide)

    ContentPanierVide.innerHTML = "Votre panier est vide"
    ContentPanierVide.style.fontStyle = "italic"
    ContentPanierVide.style.fontWeight = "bold"
}

/* NOMBRE PRODUIT PANIER */

var nombreProduitsPanier = function() {
    var nombreLigne = document.getElementsByTagName('table')[0].rows.length - 1
    var quantiteTotale = document.getElementsByTagName('table')[0].rows[nombreLigne].cells[3]; 
    var iconeCompteur = document.getElementById("Compteur__panier") /* Icone qui apparait dés l'ajout d'un produit dans le panier */
    var compteur = 0

    for (i=0; i < localStorage.length; i++) {

        if (products.indexOf(localStorage.key(i)) != -1){
            
            var nombreClick = parseInt(localStorage.getItem(localStorage.key(i)))
            compteur += nombreClick
        }       
    }
    localStorage.setItem("compteur", compteur)

    if (compteur > 0) {
        quantiteTotale.innerHTML = compteur
        iconeCompteur.style.backgroundColor = "yellow"
        iconeCompteur.style.border = "1px solid grey"
        iconeCompteur.style.color = "black"
        iconeCompteur.innerHTML = compteur
       
    } else {
        quantiteTotale.innerHTML = "0"
        iconeCompteur.style.display = "none"
    }
}

/* BOUTON VIDER LE PANIER */

var viderPanier = function(donnees) {
    
    var boutonViderPanier = document.querySelector("#btn_paniervide")

    boutonViderPanier.addEventListener('click', function() {

        for(i=0; i < donnees.length; i++) {
            var idproduit = donnees[i]._id
            localStorage.removeItem(idproduit)
        }
        document.location.reload();
    })
}

/* == LISTE PRODUITS PAGE PANIER == */

var products = []
var totalCompteur
var ListeProduitsPanier = function(donnees) {

    var idEnCache = Object.keys(localStorage)   /* Je charge le localstorage dans 1 tableau regroupant les cles */
    var valeurEnCache = Object.values(localStorage) /* puis dans un tableau regroupant les valeurs. L'index permet d'associer l'id a sa valeur */
    totalCompteur = 0

    for (i=0; i < donnees.length; i++) {

        var IdDonneesAPI = donnees[i]._id /* recuperer l'id de l'API a chaque boucle */

        if (idEnCache.indexOf(IdDonneesAPI) != -1) { /* Si l'id correspond a un index du tableau regroupant les cles, alors je fais la fonction suivante (-1 veut dire qu'il ne trouve pas l'index)*/
            
            var getIndexValeurCache = valeurEnCache[idEnCache.indexOf(IdDonneesAPI)] /* quantite du produit */
            var getIndexDonneesAPI = i /* Index dans le tableau de données pour affichage HTML */

            creationBlocHtmlPanier(donnees[getIndexDonneesAPI].imageUrl, donnees[getIndexDonneesAPI].name,
             donnees[getIndexDonneesAPI].price, getIndexValeurCache, donnees[getIndexDonneesAPI]._id)
            
            var calculTotal = donnees[getIndexDonneesAPI].price * getIndexValeurCache  /* pour le calcul du prix totale */
            totalCompteur += calculTotal

            products.push(IdDonneesAPI)
        }     
    }
    /* Insérer les totaux dans les cells de table correspondantes */
    var nombreLigne = document.getElementsByTagName('table')[0].rows.length - 1
    var prixTotalPanier = document.getElementsByTagName('table')[0].rows[nombreLigne].cells[4]; /* Cells dynamique car valeur en fonction de ligne de produit dans le panier */
    prixTotalPanier.innerHTML = parseFloat(totalCompteur / 100) + " €"

    if (products.length === 0) {
        
        panierVide()   
    }
    
} 








    
    





