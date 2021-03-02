/* == AJOUT DU BLOC HTML RECEVANT LE CONTENU == */

var creationBlocHtmlAccueil = function (nom, description, prix, id, image) {

    const categorie = document.getElementById("categorie")

    const produit = document.createElement("article")
    produit.classList.add("container", "p-4", "col-5", "justify-content-around")

    const lienProduit = document.createElement("a") 
    lienProduit.setAttribute("href", "produit.html?" + "'" + id + "'") 
    lienProduit.classList.add("row", "py-5", "bg-light", "rounded")

    const elementProduit = document.createElement("div")
    elementProduit.classList.add ("col-6")

    const nomProduit = document.createElement("h3")
    nomProduit.classList.add("text-secondary")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("text-secondary")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("text-secondary")

    const imageProduit = document.createElement("img")
    imageProduit.classList.add("float-right", "col-6")
    imageProduit.setAttribute("src", image)
    imageProduit.setAttribute("alt", "image de l'ourson " + nom)

    categorie.appendChild(produit)
    produit.appendChild(lienProduit)
    lienProduit.appendChild(elementProduit)
    
    elementProduit.appendChild(nomProduit)
    elementProduit.appendChild(descriptionProduit)
    elementProduit.appendChild(prixProduit)
    lienProduit.appendChild(imageProduit)

    nomProduit.innerHTML = nom
    descriptionProduit.innerHTML = "Description: " + description
    prixProduit.innerHTML = "Prix: " + prix + " €"
}

/* == ENVOIE DES DONNES SUR LA PAGE ACCUEIL == */

const listeProduitsAccueil = function(tableau) {
    
    for (let i=0; i < tableau.length; i++) {      
        creationBlocHtmlAccueil(tableau[i].name, tableau[i].description, 
        tableau[i].price, tableau[i]._id, tableau[i].imageUrl);
    }
}

/* == RECUPERATION DES DONNEES API == */

var recuperationDonneesApi = function (url) {
    return new Promise(function (resolve) {
    var request = new XMLHttpRequest();
    request.open("GET", url);

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

    var response = await recuperationDonneesApi("http://localhost:3000/api/teddies/")
    var donnees = JSON.parse(response);
    
    return donnees
}
console.log(getPromise())

/* == LA PROMESSE EST UN SUCCES, JE PEUX UTILISER LES DONNEES == */

getPromise().then(function(donnees) {
    
    listeProduitsAccueil(donnees)

})








