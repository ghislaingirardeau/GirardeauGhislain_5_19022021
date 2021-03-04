/* RECUPERE LE NOM DE LA PAGE PROPRE AU PRODUIT POUR Y RECUPERER LES INFOS */

var identifiantProduit = window.location.search.slice(4, 28)

console.log(identifiantProduit)

/* == LES FONCTION POUR AFFICHER LE CONTENU PRODUIT DE LA PAGE == */

var creationBlocHtmlProduit = function (nom, description, prix, image) {

    const article = document.getElementById("article")

    const nomProduit = document.createElement("h3")
    nomProduit.classList.add("text-secondary", "col-12", "p-3")

    const elementProduit = document.createElement("div")
    elementProduit.classList.add("col-5", "mb-3")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("text-secondary", "pt-5")

    const prixProduit = document.createElement("p")
    prixProduit.setAttribute("id", "prix")
    prixProduit.classList.add("text-secondary", "pt-5", "font-weight-bold")

    const imageProduit = document.createElement("img") 
    imageProduit.setAttribute("src", image)
    imageProduit.classList.add("col-7", "mb-3", "rounded")

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

/* == BOUTON PANIER == */



/* == CREATION DE LA PROMESSE */

var recuperationDonneesApi = function (url, identifiantProduit) {
    return new Promise(function (resolve) {
    var request = new XMLHttpRequest();
    request.open("GET", url + identifiantProduit);

        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(request.responseText)
            ;} /* else {
                reject('erreur') 
            } */
        };
    request.send(); 
    })
}

/* == RECUPERE LA PROMESSE == */

var getPromise = async function () {

    var response = await recuperationDonneesApi("http://localhost:3000/api/teddies/", identifiantProduit)
    var donnees = JSON.parse(response);
    
    return donnees
}


/* == LA PROMESSE EST UN SUCCES, JE PEUX UTILISER LES DONNEES == */

getPromise().then(function(donnees) {
    
    descriptifProduit(donnees)
    
    menuPresonnalisation(donnees.colors)  

})


/* TEST FONCTION BOUTON PANIER */

let tableauObjest = [{
    name: "toto",
    description: "35",
    price: "50",
    _id: "5beaa8bf1c9d440000a57d94"
},{
    name: "toto2",
    description: "40",
    price: "30",
    _id: "5beaaa8f1c9d440000a57d95"
},
{
    name: "toto3",
    description: "50",
    price: "20",
    _id: "5beaabe91c9d440000a57d96"
}
] 

window.addEventListener("DOMContentLoaded", (event) => {
    localStorage.setItem(identifiantProduit, "0")
  });



var boutonPanier = document.getElementById("btn_panier")

boutonPanier.addEventListener('click', function (){
    
    var testPanier = identifiantProduit
    console.log(testPanier)
    var click = 0
    var premierClick = 0
    
    for (i=0; i < localStorage.length; i++) {
        
        if (testPanier == localStorage.key(i)){
            console.log(testPanier)
            console.log(localStorage.key(i))
            click++
            
            var valuei = parseInt(localStorage.getItem(localStorage.key(i)))
            console.log(valuei)
            var cumulClick = valuei + click
            localStorage.setItem(testPanier, cumulClick)
            
        } /* else {
            localStorage.setItem(testPanier, premierClick)
            console.log(testPanier)
            console.log(localStorage.key(i))
        } */

    }
/* localStorage.setItem(testPanier, click) */
    console.log(localStorage)
})

    console.log(localStorage)
/* var testPanier = document.querySelector("article h3").innerText */
