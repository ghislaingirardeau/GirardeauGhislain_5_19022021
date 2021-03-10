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
    nomProduit.classList.add("col-3", "col-sm-2", "pt-3", "pt-md-5")

    const prixProduit = document.createElement("td")
    prixProduit.classList.add("col-3", "col-sm-2", "pt-3", "pt-md-5")

    const quantiteProduit = document.createElement("td")
    quantiteProduit.classList.add("col-6", "col-sm-3", "pt-3", "pt-md-5")

    const totalProduit = document.createElement("td")
    totalProduit.classList.add("col-6", "col-sm-2", "pt-3", "pt-md-5", "font-weight-bold")
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
        iconeCompteur.style.border = "1px solid grey"
        iconeCompteur.style.color = "black"
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

/* TEST DES FONCTIONS FORMULAIRE */

var checkvalid = function(champs, retour) {
    champs.style.border = "#49f09c 2px solid"
    retour.style.display = "unset"
    retour.style.color = "#49f09c"
    retour.setAttribute('class', "far fa-check-circle")
    retour.classList.add("col-2", "pt-2")
} 

var checkinvalid = function(champs, retour) {
    champs.style.border = "#fc7878 2px solid"
    retour.style.display = "unset"
    retour.style.color = "#fc7878"
    retour.setAttribute('class', "fas fa-times-circle")
    retour.classList.add("col-2", "pt-2")
}

var formulaireControle = function() {
        
    var inputForm = document.getElementsByClassName("champs") /* tous les champs ont la meme classe */
    var checkValid = document.getElementsByClassName("feedback")

    for (i=0; i < inputForm.length; i++) {
        
        let champsText = inputForm[i]
        let feedback = checkValid[i]

        champsText.addEventListener('change', function(e){
            
            if ((e.target.value) === ""){
                checkinvalid(champsText, feedback)
               
            } else {              
                checkvalid(champsText, feedback)
            }
        })
    }
    
    var email = document.getElementById("email") /* tous les champs ont la meme classe */
    var emailValid = document.getElementById("feedback--mail")
    let regMail = /^\S+@\S+$/; 

    email.addEventListener('change', function(e){
            
        if (regMail.test(e.target.value)){
            checkvalid(email, emailValid)
               
        } else {
            checkinvalid(email, emailValid)
        }
    })  
}

var controleFormulaire = function (element) {

    var element = document.getElementById(element)
}

/* CREATION DE L'OBJET CONTACT */

var objetContactEnvoie = function (firstName, lastName, address, city, email) {

    var email = document.getElementById("email")
    console.log(email.value)

    class contact {
        constructor(firstname, lastname, adress, city, email) {
    
            this.firstName = firstname;
            this.lastName = lastname;
            this.address = address;
            this.city = city;
            this.email = email;
            
        }
    }
    
    var mycontact = new contact (firstName, lastName, address, city, email)

}

/* console.log(objetContactEnvoie()) */

/* TEST BOUTON SUBMIT */

/* var testSubmit = function () {

    var boutonSubmit = document.getElementById("submit")

    boutonSubmit.addEventListener("click", function(){
        var email = document.getElementById("email")
        console.log(email.value)
    })

}

console.log(testSubmit()) */


var contact = {
firstName: "ghislain",
lastName: "girardeau",
address:"asd",
city: "asd",
email: "asd@toto.fr",

} 

var product_5beaa8bf1c9d440000a57d94 = ["trois"]

var testcontact = {

    contact,
    product_5beaa8bf1c9d440000a57d94
}
console.log(JSON.stringify(contact))


