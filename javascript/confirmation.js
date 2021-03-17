/* Enregistrer la variable du localstorage dans une constante, puis effacer celui-ci */

const idOrder = localStorage.key(localStorage.length - 1) /* Derniere ligne ajouter au localstorage lors du clic du bouton */
const montantTotal = localStorage.getItem(idOrder)

const numeroOrder = document.getElementById("idorder")
numeroOrder.innerHTML = idOrder

const prixTotal = document.getElementById("prixtotal")
prixTotal.innerHTML = parseInt(montantTotal) / 100 + " €"

console.log(idOrder)
console.log(montantTotal)

localStorage.removeItem(idOrder) /* Supprime la clé ID order et sa valeur*/
console.log(localStorage)






