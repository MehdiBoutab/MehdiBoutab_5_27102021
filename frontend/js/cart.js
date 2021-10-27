const cart = document.querySelector("#productCart");
const price = document.getElementsByClassName("cart-total");

class Panier {
  /* display All Product saved in localStorage */
  displayCartItem() {
    let result = "";
    let cartItem = JSON.parse(localStorage.getItem("products"));
    cartItem.forEach((item) => {
      result += `
      <div class="cart__single-product">
      <div class="cart__left-side">
        <img 
        class="cart__single-img" 
        src="${item.Image}" 
        alt="meuble en chêne"
        />
      </div>
      <div class="cart__right-side">
        <p class="cart__single-price">${item.Prix} €</p>
        <p class="cart__single-name">${item.Nomproduit}<p>
        <p class="cart__single-name">${item.lenses}<p>
        <p class="cart__single-name">Quantité : ${item.quantite}<p>
      </div>
    </div>
        `;
      cart.innerHTML = result;
    });
  }
  /* Show the ID */
  show(id) {
    document.getElementById(id).style.display = "block";
  }
  /* hide the ID */
  hide(id) {
    document.getElementById(id).style.display = "none";
  }
  /*  Check if the Local Storage is empty */
  isCartEmpty() {
    return (
      !localStorage.getItem("products") ||
      localStorage.getItem("products").length == 0
    );
  }

  display() {
    if (this.isCartEmpty()) {
      this.hide("app");
      this.show("empty");
    } else {
      this.hide("empty");
      this.displayCartItem();
    }
  }
  /* display the number of selected products in the navbar */
  CartNumberDisplay() {
    let CartNumbers = 0;
    let cartItem = JSON.parse(localStorage.getItem("products"));
    if (this.isCartEmpty()) {
      return (CartNumbers = 0);
    } else {
      cartItem.forEach((item) => {
        CartNumbers = item.quantite += CartNumbers;
      });
    }
    document.querySelector(".count").innerHTML = CartNumbers;
  }

  listenForCartEmptying() {
    document.getElementById("clear").addEventListener("click", () => {
      localStorage.clear(); // On vide le panier
      location.reload(); // On recharge la page
    });
  }
  /* display total price of all product in localStorage */
  SubTotal() {
    let subtotal = 0;
    let cartItem = JSON.parse(localStorage.getItem("products"));
    if (
      !localStorage.getItem("products") ||
      localStorage.getItem("products").length == 0
    ) {
      return 0;
    } else {
      cartItem.forEach((item) => {
        subtotal = item.priceTotal += subtotal;
      });
    }
    document.getElementById("totalCost").innerHTML = "Prix total = " + subtotal;
  }

  checkInputs() {
    let firstName = document.getElementById("inputFirstName");
    let lastName = document.getElementById("inputLastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("inputEmail");

    const firstNameValue = firstName.value.trim(); // On retire les blancs de début et fin de chaîne
    const lastNameValue = lastName.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const emailValue = email.value.trim();

    if (firstNameValue === "") {
      this.setErrorFor(firstName, "Veuillez remplir avec votre prénom");
    } else if (!this.isFirstName(firstNameValue)) {
      this.setErrorFor(firstName, "Votre prénom n'est pas valide");
    } else {
      this.setSuccesFor(firstName);
    }

    if (lastNameValue === "") {
      this.setErrorFor(lastName, "Veuillez remplir avec votre nom");
    } else if (!this.isLastName(lastNameValue)) {
      this.setErrorFor(lastName, "Votre nom n'est pas valide");
    } else {
      this.setSuccesFor(lastName);
    }

    if (addressValue === "") {
      this.setErrorFor(address, "Veuillez remplir avec votre addresse");
    } else if (!this.isAddress(addressValue)) {
      this.setErrorFor(address, "Votre addresse n'est pas valide");
    } else {
      this.setSuccesFor(address);
    }

    if (cityValue === "") {
      setErrorFor(city, "Veuillez remplir avec votre ville");
    } else if (!this.isCity(cityValue)) {
      this.setErrorFor(city, "Votre ville n'est pas valide");
    } else {
      this.setSuccesFor(city);
    }

    if (emailValue === "") {
      this.setErrorFor(email, "Veuillez remplir avec votre email");
    } else if (!this.isEmail(emailValue)) {
      this.setErrorFor(email, "Votre email n'est pas valide");
    } else {
      this.setSuccesFor(email);
    }
  }

  // On contrôle la conformité des informations données par les utilisateurs en excluant une liste de caractère : utilisation de RexExp
  isAddress(address) {
    return /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/.test(
      address
    );
  }

  isCity(city) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/.test(city);
  }

  isEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  isFirstName(firstName) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç']+)$/.test(firstName);
  }

  // On contrôle la validité du formulaire, ajout de la classe 'form-control error' en cas d'invalidité
  isFormValid() {
    return document.getElementsByClassName("form-control error").length == 0;
  }

  // On contrôle la conformité des informations données par les utilisateurs en excluant une liste de caractère : utilisation de RexExp
  isLastName(lastName) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/.test(lastName);
  }

  // On ajoute un message d'erreur si le formulaire est invalidé, on modifie le design du DOM
  setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = message;
    formControl.className = "form-control error";
  }

  // On modifie le design du DOM en cas de formulaire validé
  setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  validerFormulaire() {
    document.getElementById("orderForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.checkInputs(); // On vérifie la conformité des informations

      if (!this.isFormValid()){
        alert("Merci de bien remplir le formulaire");
        return;
      }
      const contact = {
        firstName: document.getElementById("inputFirstName").value,
        lastName: document.getElementById("inputLastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("inputEmail").value,
      };
      const products = JSON.parse(localStorage.getItem("products"));
      const aenvoyer = {
        products: [],
        contact: contact,
      };

      let objetRequest = JSON.stringify(aenvoyer);
      // APEL API AVEC FETCH // ENVOIE DES DONNEES AVEC POST 
      fetch("http://localhost:3000/api/cameras/order", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: objetRequest,
      })
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          localStorage.setItem("order", json.orderId);
          location.href = "commande.html";
        });
    });
  }
}

const panier = new Panier();
const number = new Panier();
const removePanier = new Panier();
const remove = new Panier();
const prix = new Panier();
const ValiderFormulaire = new Panier();

panier.display();
number.CartNumberDisplay();
removePanier.listenForCartEmptying();
prix.SubTotal();
ValiderFormulaire.validerFormulaire();
