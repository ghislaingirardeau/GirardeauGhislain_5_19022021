var numeroOrder = document.getElementById("idorder")
numeroOrder.innerHTML = localStorage.key(0)


var prixTotal = document.getElementById("prixtotal")
prixTotal.innerHTML = parseInt(localStorage.getItem(localStorage.key(0)) / 100) + " €"
