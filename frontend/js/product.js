const getId = new URLSearchParams(location.search).get("id");
const productSingle = document.querySelector("#productSingle");

class Product {

  /* Call API products */
  async getproducts() {
    try {
      return fetch("http://localhost:3000/api/cameras/" + getId).then(
        (result) => result.json()
      );
    } catch (error) {
      alert("la connexion au serveur n'a pas pu être effectué");
    }
  }
  /* Create Single Product */
  CreateSingleCard(product) {
    let result = "";
    let htmlOptions = ""; // Boucle permettant d'afficher toutes les options de vernis
    for (let i = 0; i < product.lenses.length; i++) {
      htmlOptions += `<option>${product.lenses[i]}</option>`;
    }
    result += `        
    <article class="product-card">
            <div class ="single">
                <div class="product-tumb">
                    <img src="${product.imageUrl}" alt="Photo d\'un appareil ${
      product.name
    }">
                </div>
                <div class="product-details">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="product-bottom-details">
                        <p class="product-price">${product.price / 100}€</p>
                        <div class="product-links">
                            <i class="fa fa-heart"></i>
                        </div>
                    </div>
                    <div class="detail">
                        <select id="option-produit" name="option_produit">${htmlOptions}</select>
                        <button id="btn-panier">
                            <i class="fas fa-cart-plus"></i>
                            <span>Ajouter au panier</span>
                        </button>
                    </div>
                </div>
            </div>
        </article> `;
    productSingle.innerHTML = result;
  }
  /* Save product in localStorage */
  async SaveProducts(product) {
    let productInCart = [];
    let productInlocalStorage = JSON.parse(localStorage.getItem("products"));
    if (productInlocalStorage === null) {
      productInCart.push(product);
      localStorage.setItem("products", JSON.stringify(productInCart));
    } else {
      productInlocalStorage.forEach((item) => {
        if (product.name == item.name && product.lenses == item.lenses) {
          product.quantite = item.quantite += 1;
          product.priceTotal = item.priceTotal += product.priceTotal;
        } else {
          productInCart.push(item);
        }
      });
      productInCart.push(product);
    }
    localStorage.setItem("products", JSON.stringify(productInCart));
  }
  /* Adding product to the Cart */
  async AddToCart() {
    let result = "";
    const product = await this.getproducts();
    const btn_panier = document.getElementById("btn-panier");
    btn_panier.addEventListener("click", (event) => {
      event.preventDefault;

      let Camera = {
        Nomproduit: product.name,
        Image: product.imageUrl,
        Prix: parseInt(product.price / 100),
        lenses: document.getElementById("option-produit").value,
        id: product._id,
        quantite: 1,
        priceTotal: parseInt(product.price / 100),
      };
      this.SaveProducts(Camera);
      const lensechoice = document.getElementById("option-produit");

      result += `
      <div class="added-to-cart-confirmation">
        <p class="confirmation-text">Vous avez ajouté ${product.name} ${lensechoice.value} à votre panier !</p>
      </div>
      `;
      productSingle.innerHTML += result;
      const confirmation = document.querySelector(
        ".added-to-cart-confirmation"
      );
      confirmation.style.visibility = "visible";
      setTimeout("location.reload(true);", 2000);
    });
  }
  /* display the number of selected products in the navbar */
  CartNumberDisplay() {
    let CartNumbers = 0;
    let cartItem = JSON.parse(localStorage.getItem("products"));
    if (
      !localStorage.getItem("products") ||
      localStorage.getItem("products").length == 0
    ) {
      return;
    } else {
      cartItem.forEach((item) => {
        CartNumbers = item.quantite += CartNumbers;
      });
    }
    document.querySelector(".count").innerHTML = CartNumbers;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const produit = new Product();
  const data = new Product();
  const count = new Product();
  produit
    .getproducts()
    .then((product) => {
      data.CreateSingleCard(product);
    })
    .then((product) => {
      produit.AddToCart();
      count.CartNumberDisplay();
    });
});
