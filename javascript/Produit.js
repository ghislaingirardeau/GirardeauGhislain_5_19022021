/* RECUPERE LE NOM DE LA PAGE PROPRE AU PRODUIT POUR Y RECUPERER LES INFOS */

var identifiantProduit = window.location.search.slice(4, 28)

console.log(identifiantProduit)

/* == AJOUT DU BLOC HTML RECEVANT LE CONTENU == */

var creationBlocHtmlProduit = function (nom, description, prix, image) {

    const categorie = document.getElementById("categorie")

    const nomProduit = document.createElement("h3")
    nomProduit.classList.add("text-dark", "col-12")

    const elementProduit = document.createElement("div")
    elementProduit.classList.add("col-5")

    const descriptionProduit = document.createElement("p")
    descriptionProduit.classList.add("text-dark")

    const prixProduit = document.createElement("p")
    prixProduit.classList.add("text-dark")

    const imageProduit = document.createElement("img") 
    imageProduit.setAttribute("src", image)
    imageProduit.classList.add("col-6")

    categorie.appendChild(nomProduit)
    

    categorie.appendChild(elementProduit)
    elementProduit.appendChild(descriptionProduit)
    elementProduit.appendChild(prixProduit)

    categorie.appendChild(imageProduit)

    nomProduit.innerHTML = "Ourson : " + nom
    descriptionProduit.innerHTML = "Description: " + description
    prixProduit.innerHTML = "Prix: " + prix + " €"
}

const insertionDescriptifProduits = function(tableau) {
    
    creationBlocHtmlProduit(tableau.name, tableau.description, 
        tableau.price, tableau.imageUrl)

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
console.log(getPromise())

/* == LA PROMESSE EST UN SUCCES, JE PEUX UTILISER LES DONNEES == */

getPromise().then(function(donnees) {
    
    insertionDescriptifProduits(donnees)
    console.log(donnees.colors)

})
