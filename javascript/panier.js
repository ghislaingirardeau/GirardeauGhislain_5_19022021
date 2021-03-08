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
    imageProduit.classList.add ("w-md-75")

    const nomProduit = document.createElement("td")
    nomProduit.classList.add("text-secondary", "col-3", "col-sm-2", "pt-3", "pt-md-5")

    const prixProduit = document.createElement("td")
    prixProduit.classList.add("text-secondary", "col-3", "col-sm-2", "pt-3", "pt-md-5")

    const quantiteProduit = document.createElement("td")
    quantiteProduit.classList.add("text-secondary", "col-6", "col-sm-3", "pt-3", "pt-md-5")

    const totalProduit = document.createElement("td")
    totalProduit.classList.add("text-secondary", "col-6", "col-sm-2", "pt-3", "pt-md-5")
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
    
    var boutonChangeQuantite = function () {

        const boutonPlus = document.createElement("button")
        boutonPlus.classList.add("text-secondary", "btn", "btn-light", "border")
        boutonPlus.setAttribute("type", "button")

        const compteurQuantite = document.createElement("strong")
        compteurQuantite.classList.add("text-secondary", "px-2")
    
        const boutonMoins = document.createElement("button")
        boutonMoins.classList.add("text-secondary", "btn", "btn-light", "border")
        boutonMoins.setAttribute("type", "button")

        quantiteProduit.appendChild(boutonMoins)
        quantiteProduit.appendChild(compteurQuantite)
        quantiteProduit.appendChild(boutonPlus)

        boutonPlus.innerHTML = "+"
        boutonMoins.innerHTML = "-"
        compteurQuantite.innerHTML = quantite

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
    
    var quantiteTotale = document.getElementsByTagName('table')[0].rows[2].cells[1];
    var iconeCompteur = document.getElementById("Compteur__panier") /* Icone qui apparait dés l'ajout d'un produit dans le panier */
    var compteur = 0
    for (i=0; i < localStorage.length; i++) {
        
        var nombreClick = parseInt(localStorage.getItem(localStorage.key(i)))
        compteur += nombreClick
    }

    if (compteur > 0) {
        quantiteTotale.innerHTML = compteur
        iconeCompteur.style.backgroundColor = "yellow"
        iconeCompteur.innerHTML = compteur
       
    } else {
        quantiteTotale.innerHTML = "0"
        iconeCompteur.style.display = "none"
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
    var totalCompteur = 0

    for (i=0; i < donnees.length; i++) {

        var IdDonneesAPI = donnees[i]._id /* recuperer l'id de l'API a chaque boucle */

        if (idEnCache.indexOf(IdDonneesAPI) != -1) { /* Si l'id correspond a un index du tableau regroupant les cles, alors je fais la fonction suivante (-1 veut dire qu'il ne trouve pas l'index)*/
            
            var getIndexValeurCache = valeurEnCache[idEnCache.indexOf(IdDonneesAPI)]
            var getIndexDonneesAPI = i

            creationBlocHtmlPanier(donnees[getIndexDonneesAPI].imageUrl, donnees[getIndexDonneesAPI].name,
             donnees[getIndexDonneesAPI].price, getIndexValeurCache, donnees[getIndexDonneesAPI]._id)
            
            var calculTotal = donnees[getIndexDonneesAPI].price * getIndexValeurCache  /* pour le calcul du prix totale */
            totalCompteur += calculTotal
        }        
    }
    var nombreLigne = document.getElementsByTagName('table')[0].rows.length - 1
    var prixTotalPanier = document.getElementsByTagName('table')[0].rows[nombreLigne].cells[2];
    prixTotalPanier.innerHTML = parseFloat(totalCompteur / 100) + " €"

    var tableaudonneesPanier = [...idEnCache, ...valeurEnCache, totalCompteur]
    console.log(tableaudonneesPanier)
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



var formulaireControle = function() {
        
    var inputForm = document.getElementsByClassName("form-control") /* tous les champs ont la meme classe */
    var checkValid = document.getElementsByClassName("feedback")
    let reg = /^[a-zA-Z\u00C0-\u00FF]*$/; /* exclue tous les chiffres */
    

    for (i=0; i < inputForm.length; i++) {
        
        let champsText = inputForm[i]
        let feedback = checkValid[i]

        champsText.addEventListener('input', function(e){
            
            if (reg.test(e.target.value)){
                
                champsText.style.border = "#49f09c 2px solid"
                feedback.style.display = "unset"
                feedback.style.color = "#49f09c"
                feedback.setAttribute('class', "far fa-check-circle")
                feedback.classList.add("col-2", "pt-2")
               
            } else {

                champsText.style.border = "#fc7878 2px solid"
                feedback.style.display = "unset"
                feedback.style.color = "#fc7878"
                feedback.setAttribute('class', "fas fa-times-circle")
                feedback.classList.add("col-2", "pt-2")
            }
        })
    }   
}

console.log(formulaireControle())

