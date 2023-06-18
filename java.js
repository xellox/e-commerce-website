//  RESPONSIVE NAVBAR FOR MOBILE
let mobileHamburger = document.querySelector(".hamburger");
let navbarMenu = document.querySelector(".navMenu");
let navbar = document.getElementById("navbar");
let greyBg = document.querySelector(".greyBg");
let cartButton = document.querySelector(".cart");
document.addEventListener("scroll", navbarColor);
mobileHamburger.addEventListener("click", hamburgerMenu);
window.addEventListener("resize", adjustNavbarDisplay);

function hamburgerMenu() {
  if (navbarMenu.style.display === "flex") {
    navbarMenu.style.display = "none";
  } else {
    navbarMenu.style.display = "flex";
  }

  if (navbarMenu.style.display === "flex") {
    greyBg.style.display = "flex";
    cartButton.style.pointerEvents = "none";
  } else {
    greyBg.style.display = "none";
    cartButton.style.pointerEvents = "all";
  }
}

//if u have display none in hamburger menu and resize, the nav is gon change to flex
function adjustNavbarDisplay() {
  if (window.innerWidth > 600 /* Add your mobile breakpoint value here */) {
    navbarMenu.style.display = "flex";
    greyBg.style.display = "none";
  }
}
//make the hamburger menu slide when closing with class toggle//

// change color of navbar when scrolling down, have it transparent on top
function navbarColor() {
  if (window.scrollY > 0) {
    navbar.style.backgroundColor = "black";
  } else {
    navbar.style.backgroundColor = "";
  }
}

//DISPLAY SHOPPING CART FUNCTION
let cartContainer = document.querySelector(".cartContainer");

function displayCart() {
  if (cartContainer.style.display == "flex") {
    cartContainer.style.display = "none";
  } else cartContainer.style.display = "flex";
}

//RENDER SHOPPING CART AND ADD ITEMS TO CART

//required variables for cart functions
const productsElement = document.querySelector(".gridList");
const cartList = document.querySelector(".cartList");
const subTotal = document.querySelector(".totalItems");
const subTotalPrice = document.querySelector(".totalPrice");
const emptyCart = document.querySelector(".emptyCart");
const cartNumber = document.querySelector(".cartNumber");
//get cart from local storage and have the functions updated on reload page
let cart = JSON.parse(localStorage.getItem("CART")) || [];
renderCartItems();
renderSubTotal();

//render the products on the website through the products.js
function renderProducts() {
  products.forEach((product) => {
    productsElement.innerHTML += `
    <div class= 'gridWrapper'>
        <div class="gridImage">
           <img class="gImage" src=${product.imgSrc} alt="arabica"></img>
           <div class="hoverImage" onclick="addToCart(${product.id})">Add to Cart</div>
        </div>

        <div class='productDetails'>
          <div class='titlePrice'> 
            <div class="productTitle">${product.name}</div>
            <div class="priceTag">${product.price}$</div>
          </div>  
          <div class="productDesc"> ${product.description}</div>
        </div>
    </div>      
        `;
  });
}
renderProducts();

//add products to cart, check if there are 2 same items => increment number of units
function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  //keep the cart updated after every action
  updateCart();
}

//have all the values of the cart on a single function || set them to local storage
function updateCart() {
  renderCartItems();
  renderSubTotal();
  localStorage.setItem("CART", JSON.stringify(cart));
}

function renderSubTotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subTotal.innerHTML = `Shopping bag <small>(${totalItems})</small>`;
  subTotalPrice.innerHTML = `${totalPrice.toFixed(2)}$`;
  cartNumber.innerHTML = `${totalItems}`;
}

//add the specific item to cart for each product clicked
function renderCartItems() {
  //display "cart is empty" if the cart has no products
  if (cart.length === 0) {
    emptyCart.style.display = "flex";
  } else {
    emptyCart.style.display = "none";
  }

  cartList.innerHTML = "";
  if (cart) {
    cart.forEach((item) => {
      cartList.innerHTML += `
                <div class="itemContainer">
                <div class="removeButton" onclick="removeCartItems(${
                  item.id
                })"><p>+</p></div>
                <div class="photoDesc">
                    <img src=${item.imgSrc} class="itemPhoto"></img>
                </div>
                <div class="itemDescription">
                    <div class="itemName">${item.name}</div>
                    <p>${item.description}</p>
                </div>
                <div class="itemPrice">
                    <div class="plusMinus">
                        <div class="minus" onclick="changeNumberOfUnits('minus', ${
                          item.id
                        })">-</div>
                        <div class="quantity">${item.numberOfUnits}</div>
                        <div class="plus" onclick="changeNumberOfUnits('plus', ${
                          item.id
                        })">+</div>
                    </div>
                </div>
                    <div class="price">${(
                      item.price * item.numberOfUnits
                    ).toFixed(2)}$</div>
                </div>
                `;
    });
  }
}

// increment/decrement items on the cart so you can update the value
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}
//remove items from cart by filtering the array
function removeCartItems(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// HOVER EFFECT ON PRODUCTS FOR ADD TO CART  //
