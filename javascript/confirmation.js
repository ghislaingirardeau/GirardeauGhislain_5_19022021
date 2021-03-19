/* Enregistrer la variable du localstorage dans une constante, puis effacer celui-ci */

const idOrder = localStorage.getItem("idOrder") 
const montantTotal = localStorage.getItem("totalCompteur")

const numeroOrder = document.getElementById("idorder")
numeroOrder.innerHTML = idOrder

const prixTotal = document.getElementById("prixtotal")
prixTotal.innerHTML = parseInt(montantTotal) / 100 + " €"

localStorage.removeItem("idOrder")
localStorage.removeItem("totalCompteur")  /* Supprime la clé ID order et sa valeur*/







