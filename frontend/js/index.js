// getting the products from API
const productDOM = document.querySelector("#products");
class Products {
  async getproducts() {
    try {
      return fetch("http://localhost:3000/api/cameras").then((result) =>
        result.json()
      );
    } catch (error) {
      alert("la connexion au serveur n'a pas pu être effectué");
    }
  }

  /* Creation of cards for all products */
  displayproducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <article class="product-card">
      <a href="../../frontend/pages/produit.html?id=${product._id}">
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
          </div>
      </a>
  </article> `;
    });
    productDOM.innerHTML = result;
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

const produits = new Products();
const data = new Products();
const number = new Products();
produits.getproducts().then((products) => data.displayproducts(products));
number.CartNumberDisplay();
