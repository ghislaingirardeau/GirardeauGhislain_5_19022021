/* RECUPERE LE NOM DE LA PAGE PROPRE AU PRODUIT POUR Y RECUPERER LES INFOS */

var identifiantProduit = window.location.search.slice(7, 31)

console.log(identifiantProduit)

/* == AJOUT DU BLOC HTML RECEVANT LE CONTENU == */

var creationBlocHtmlProduit = function (nom, description, prix, image) {

    const categorie = document.getElementById("categorie")

    const nomProduit = document.createElement("h2")
    nomProduit.classList.add("nom")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("description")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("prix")

    const imageProduit = document.createElement("img") 
    imageProduit.setAttribute("src", image)

    categorie.appendChild(produit)
    produit.appendChild(nomProduit)
    produit.appendChild(descriptionProduit)
    produit.appendChild(prixProduit)
    produit.appendChild(imageProduit)

    nomProduit.innerHTML = "Nom: " + nom
    descriptionProduit.innerHTML = "Description: " + description
    prixProduit.innerHTML = "Prix: " + prix + " $"
}

const insertionDescriptifProduits = function(tableau) {
    
    /* for (let i=0; i < tableau.length; i++) {      
    ajoutNouveauProduit(tableau[i].name, tableau[i].description, 
        tableau[i].price, tableau[i].imageUrl);
    } */
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
    console.log(recuperationDonneesApi)
    var donnees = JSON.parse(response);
    
    return donnees
}
console.log(getPromise())

/* == LA PROMESSE EST UN SUCCES, JE PEUX UTILISER LES DONNEES == */

getPromise().then(function(donnees) {
    
    console.log(donnees)

})
