// On affiche l'order id et le montant total dans le DOM
let order = localStorage.getItem("order");
let PriceTotal = 0;
let cartItem = JSON.parse(localStorage.getItem("products"));

let prixtotalcalcul = [];

for (let m = 0; m < cartItem.length; m++) {
  let x = cartItem[m].priceTotal;
  prixtotalcalcul.push(x);
}

const reducer = (acc, curr) => acc + curr;
const prixtotal = prixtotalcalcul.reduce(reducer);
document.getElementById("orderPrice").innerHTML += prixtotal + "€";
document.getElementById("productOrder").innerHTML += order;
localStorage.clear();    // On vide le panier
