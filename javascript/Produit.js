/* RECUPERE LE NOM DE LA PAGE PROPRE AU PRODUIT POUR Y RECUPERER LES INFOS */

var identifiantProduit = window.location.search.slice(4, 28)

console.log(identifiantProduit)

/* == AJOUT DU BLOC HTML RECEVANT LE CONTENU == */

var creationBlocHtmlProduit = function (nom, description, prix, image) {

    const categorie = document.getElementById("categorie")

    const nomProduit = document.createElement("h3")
    nomProduit.classList.add("text-secondary", "col-12", "p-3")

    const elementProduit = document.createElement("div")
    elementProduit.classList.add("col-5", "mb-3")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("text-secondary", "pt-5")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("text-secondary", "pt-5", "font-weight-bold")

    const imageProduit = document.createElement("img") 
    imageProduit.setAttribute("src", image)
    imageProduit.classList.add("col-7", "mb-3", "rounded")

    categorie.appendChild(nomProduit)
    

    categorie.appendChild(elementProduit)
    elementProduit.appendChild(descriptionProduit)
    elementProduit.appendChild(prixProduit)

    categorie.appendChild(imageProduit)

    nomProduit.innerHTML = "Ourson : " + nom
    nomProduit.style.fontStyle = "italic"

    descriptionProduit.innerHTML = "Description : " + description
    descriptionProduit.style.fontSize = "1.3rem"
    
    prixProduit.innerHTML = "Prix : " + prix + " €"
    prixProduit.style.fontSize = "1.4rem"
}

const insertionDescriptifProduits = function(donnees) {
    
    creationBlocHtmlProduit(donnees.name, donnees.description, 
        donnees.price, donnees.imageUrl)

}

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
    
    insertionDescriptifProduits(donnees)
    

})


let testtableau = {
    name: "toto",
    age: "35",
    tab: ["blue", "brown", "beige"]
}


var menuHTMLPersonnalisation = function (element) {

    var ongletMenu = document.querySelector("#navbarContent ul")

    var itemMenu = document.createElement("li")
    itemMenu.classList.add("nav-item", "border-bottom", "border-dark")

    var contenuItem = document.createElement("p")
    contenuItem.classList.add("lien_nav", "nav-link", "text-primary", "font-weight-bold", "m-2")

    ongletMenu.appendChild(itemMenu)
    itemMenu.appendChild(contenuItem)

    contenuItem.innerHTML = element

}


/* var insertionDonnéesPresonnalisation = function (donnees) {

    var boutonPersonnalisation = document.getElementById("btn_personnalisation")

    if (donnees.tab.length == 0) {
        boutonPersonnalisation.setAttribute("disabled", "")
        
    } else {
        for (i=0; i < donnees.tab.length; i++) {
            if (i = 0) {
                Document.querySelector("#navbarContent ul li p")= donnees.tab[0]
            }
            if (i > 0) {
                menuHTMLPersonnalisation (donnees.tab[i])
            }
            
        }

    }
}
console.log (insertionDonnéesPresonnalisation(testtableau)) */


