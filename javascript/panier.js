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

            if(valeurIDCache === 1) {
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
var products
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

    products = [...idEnCache]    
} 

/* FONCTIONS FORMULAIRE */

/* Fonction de gestion de l'affichage du champs suivant si la valeur est correcte ou non */

var checkvalid = function(champs, retour) {
    champs.style.border = "#49f09c 2px solid"
    retour.style.color = "#49f09c"
    retour.setAttribute('class', "far fa-check-circle")
    retour.classList.add("col-2", "pt-2")
} 

var checkInvalid = function(champs, retour) {
    champs.style.border = "#fc7878 2px solid"
    retour.style.color = "#fc7878"
    retour.setAttribute('class', "fas fa-times-circle")
    retour.classList.add("col-2", "pt-2")
}

/* Controle de la valeur des champs texte */

var controleFormulaire = function (element) {
/* Je recupere le champs a verifier ainsi que l'element pour inserer visuellement la reponse */
    var champsText = document.getElementById(element)
    var checkValid = document.querySelector("#" + element + "--feedback") 
    var reponse = 0

    champsText.addEventListener('change', function(e){
            
        if ((e.target.value) === ""){   /* Si pas de texte dans le champs = erreur + retour false */
            checkInvalid(champsText, checkValid)
            reponse = false 
            validationForm = reponse 
            
        } else {              
            checkvalid(champsText, checkValid) /* Si presence de texte alors retourne true */
            reponse = true
            validationForm = reponse
            
        }
    })
}

/* Controle de la valeur des champs email */

var controleFormulaireEmail = function (element) {
/* fonction specifique pour la verification du caractere @ dans le champs de texte */
    var champsText = document.getElementById(element)
    var checkValid = document.querySelector("#" + element + "--feedback") 
    var reponse
    let regMail = /^\S+@\S+$/;

    champsText.addEventListener('change', function(e){
            
        if (regMail.test(e.target.value)) {  /* Si @ est present */      
            checkvalid(champsText, checkValid)
            reponse = true
            validationForm = reponse /* Renvoie la reponse a la variable hors de la fonction*/

        } else {              
            checkInvalid(champsText, checkValid)
            reponse = false 
            validationForm = reponse 
        }
    })
}

/* CREATION DE L'OBJET CONTACT */
var contact
var objetContactEnvoie = function (firstName, lastName, address, city, email) {

    class contacts {
        constructor(firstname, lastname, address, city, email) {
    
            this.firstName = firstname;
            this.lastName = lastname;
            this.address = address;
            this.city = city;
            this.email = email;
        }
    }
    contact = new contacts (firstName, lastName, address, city, email) 
}

/* ENVOIE DES DONNEES API */

var envoieDonneesAPI = async function (objet) {

    let response = await fetch ("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify(objet)
    })
    if (response.ok) {

    let data = await response.json()
    console.log(data.orderId)         
    } 
    else {
        alert("Le formulaire est incorrecte ou l'URL ne répond pas correctement")
    }
}

/* A LA VALIDATION DU FORMULAIRE ET AU CLICK APPLIQUE envoieDonneesAPI */

var validationForm = false
var recuperationDonneesEtContact = function() {

/* Si validationForm renvoie true alors toutes les donnees sont bonnes */
/* Si un champs n'est pas saisie c'est l'attribut required html qui prend le relais */
    
    controleFormulaire("firstName")
    controleFormulaire("lastName")
    controleFormulaire("address")
    controleFormulaire("city")
    controleFormulaireEmail("email")
    

    var boutonSubmit = document.getElementById("submit")
    
    boutonSubmit.addEventListener("click", function(event){

        if (validationForm == true && localStorage.length != 0) {

            var firstName = document.getElementById("firstName").value
            var lastName = document.getElementById("lastName").value
            var address = document.getElementById("address").value
            var city = document.getElementById("city").value
            var email = document.getElementById("email").value

            objetContactEnvoie(firstName, lastName, address, city, email)

            objetAEnvoyer = {contact, products}
            
            envoieDonneesAPI(objetAEnvoyer)
            console.log(objetAEnvoyer)
            event.preventDefault() 

            /* A CORRIGER SI UN SEUL CHAMPS EST REMPLI, FAIRE UNE CONDITION SI LE CHAMPS NEST PAS DU TOUT EN FOCUS */
        }
        if (localStorage.length === 0) {
            alert("Votre panier est vide")
            event.preventDefault() 
        }
        if (validationForm == false) {  
            console.log("Veuillez remplir tous les champs du formulaire")
            
            var erreurMessage = document.getElementById("erreur__form")
            erreurMessage.style.display = "inherit"
        }
    }) 
    
}

/* == RECUPERATION DES DONNEES API == */

var recuperationDonneesApi = async function () {

        let request = await fetch ("http://localhost:3000/api/teddies/")
        .then (async function(response) {

            if (response.ok) {

                let data = await response.json()

                .then (function(donnees) {
                    
                    nombreProduitsPanier()
                    viderPanier()
                    ListeProduitsPanier(donnees)
                    recuperationDonneesEtContact()        
                })
            } else {
                console.log("Cette URL n'est pas disponible")
                alert("Cette URL n'est pas disponible")
            }            
        })
}

recuperationDonneesApi()






    
    





