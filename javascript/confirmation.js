var params = new URLSearchParams (window.location.search)

var idOrder = params.get("id")
var montantTotal = params.get("total")

var numeroOrder = document.getElementById("idorder")
numeroOrder.innerHTML = idOrder

var prixTotal = document.getElementById("prixtotal")
prixTotal.innerHTML = parseInt(montantTotal) / 100 + " €"


