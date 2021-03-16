/* Enregistrer la variable du localstorage dans une constante, puis effacer celui-ci */

const idOrder = localStorage.key('0')
const montantTotal = localStorage.getItem(idOrder)

const numeroOrder = document.getElementById("idorder")
numeroOrder.innerHTML = idOrder

const prixTotal = document.getElementById("prixtotal")
prixTotal.innerHTML = parseInt(montantTotal) / 100 + " €"

console.log(idOrder)
console.log(montantTotal)

localStorage.clear()
console.log(localStorage)






