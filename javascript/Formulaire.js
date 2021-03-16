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

var controleFormulaire = function (element) { /* Je recupere le champs a verifier ainsi que l'element pour inserer visuellement la reponse */

    var champsText = document.getElementById(element)
    var checkValid = document.querySelector("#" + element + "--feedback") 
    var reponse = false

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

/* Controle de la valeur du champs email */

var controleFormulaireEmail = function (element) {  /* fonction specifique pour la verification du caractere @ dans le champs de texte */

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

/* ENVOIE DES DONNEES API */

var envoieDonneesAPI = async function (objet) {

    let response = await fetch ("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify(objet) /* Conertion de l'objet */
    })
    if (response.ok) {

    let data = await response.json()
        
        localStorage.clear()
        localStorage.setItem(data.orderId, totalCompteur)
        console.log(localStorage)
        
        window.open("Confirmation.html", "_self")
    }

    if(response.status === 404) {
        alert("L'URL ne répond pas correctement")
    } 

    if(response.status === 400) {
        alert("Des champs du formulaire sont manquants")
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

            var contact = {
                "firstName": firstName,
                "lastName": lastName,
                "address": address,
                "city": city,
                "email": email,
            }
            
            objetAEnvoyer = {contact, products} /* L'objet js qui est à envoyer et qui sera convertie en JSON */
            
            envoieDonneesAPI(objetAEnvoyer)

        }
        if (localStorage.length === 0) {  /* Si le formulaire est rempli mais que le panier est vide */
            alert("Votre panier est vide")
            event.preventDefault() 
        }
        if (validationForm == false) {  
                        
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
            alert("Cette URL n'est pas disponible")
        }            
    })
}

recuperationDonneesApi()