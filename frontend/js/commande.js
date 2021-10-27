// On affiche l'order id et le montant total dans le DOM
let order = localStorage.getItem("order");
let cartItem = JSON.parse(localStorage.getItem("products"));

let prixtotalcalcul = []; // On créé un tableau vide pour inséré tout les prix


for (let item = 0; item < cartItem.length; item++) {
  let TotalOfPrice = cartItem[item].priceTotal;
  prixtotalcalcul.push(TotalOfPrice);
  console.log(prixtotalcalcul);
}

// On Calcul le prix total du tableau
const reducer = (acc, curr) => acc + curr;
const prixtotal = prixtotalcalcul.reduce(reducer);

document.getElementById("orderPrice").innerHTML += prixtotal + "€";
document.getElementById("productOrder").innerHTML += order;
localStorage.clear();    // On vide le panier