/* FONCTIONS FORMULAIRE */

/* Fonction de gestion de l'affichage du champs suivant si la valeur est correcte ou non */

var alertCheckChamps = function (champs, retour, couleur, icone){
    champs.style.border = couleur + " 2px solid"
    retour.style.color = couleur
    retour.setAttribute('class', icone)
    retour.classList.add("col-2", "pt-2")
}

/* Controle de la valeur des champs texte */

var controleChampsForm = function(element, texte, index) {

    var champsText = document.getElementById(element)
    var checkValidity = document.querySelector("#" + element + "--feedback") 
    var reponse
    let regex = texte;

    champsText.addEventListener('change', function(e){
            
        if (regex.test(e.target.value) && (e.target.value) != "") {  /* Si la condition de regex est valide */      
            alertCheckChamps(champsText, checkValidity, "#49f09c", "far fa-check-circle")
            reponse = 1
            cumulReponseChamps[index] = reponse /* Renvoie la reponse dans un tableau, chaque champs texte a son index propre en parametre*/
        } else {              
            alertCheckChamps(champsText, checkValidity, "#fc7878", "fas fa-times-circle")
            reponse = 0 
            cumulReponseChamps[index] = reponse
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
        
        for(i=0; i < products.length; i++) {
            localStorage.removeItem(products[i])
        }

        localStorage.setItem('idOrder', data.orderId)
        localStorage.setItem('totalCompteur', totalCompteur)

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

var cumulReponseChamps = [0, 0, 0, 0, 0] /* Si un champs n'est pas saisie alors tous sont a 0 par defaut */
var recuperationDonneesEtContact = function() {

/* Si cumulReponseChamps renvoie tous les index 1 alors toutes les donnees sont bonnes */
    
    controleChampsForm("firstName", /^\D+$/, 0)
    controleChampsForm("lastName", /^\D+$/, 1)
    controleChampsForm("address", /[\s\S]/, 2)
    controleChampsForm("city", /^\D+$/, 3)
    controleChampsForm("email", /^\S+@\S+$/, 4)

    var boutonSubmit = document.getElementById("submit")
    
    boutonSubmit.addEventListener("click", function(event){

        if (cumulReponseChamps.reduce((a, b)=> a + b) === 5 && products.length != 0) { /* Fonction qui fait la somme de tous les index du tableau de response */
            /* Si la somme = 5, alors tous les champs ont ete correctement rempli */
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
        if (products.length === 0) {  /* Si le formulaire est rempli mais que le panier est vide */
            alert("Votre panier est vide")
            event.preventDefault() 
        }
        if (cumulReponseChamps.reduce((a, b)=> a + b) != 5) {  
            /* Si la somme est different de 5, alors un champs est mal saisie */      
            var erreurMessage = document.getElementById("erreur__form")
            erreurMessage.style.display = "inherit"
        }
    }) 
}

/* == RECUPERATION DES DONNEES API == */

var recuperationDonneesApi = async function () {

    let request = await fetch ("http://localhost:3000/api/teddies/")
    .then (function(response) {

        if (response.ok) {

            let data = response.json()

            .then (function(donnees) {
                    
                viderPanier(donnees)
                ListeProduitsPanier(donnees)
                nombreProduitsPanier()
                recuperationDonneesEtContact()        
            })
        } else {
            alert("Cette URL n'est pas disponible")
        }            
    })
}

recuperationDonneesApi()