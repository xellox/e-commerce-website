            //  RESPONSIVE NAVBAR FOR MOBILE 
let mobileIcon = document.getElementById('mobileNav')
let navbarMenu = document.getElementById('navMenu')
let navbar = document.getElementById('navbar')

mobileIcon.addEventListener('click', mobileShow)
document.addEventListener('scroll', navbarColor)


function mobileShow() {
    if(navbarMenu.style.display === 'flex') {
        navbarMenu.style.display = 'none'
    } else if(mobileIcon.style.display === 'none'){navbarMenu.style.display = 'flex'}
         else {navbarMenu.style.display = 'flex'}
}
// change color of navbar when scrolling down, have it transparent on top
function navbarColor() {
    if(window.scrollY > 0 ) {
        navbar.style.backgroundColor = 'black'
    }else{navbar.style.backgroundColor = ''}
};

            //DISPLAY SHOPPING CART FUNCTION
let cartButton = document.querySelector(".cart");
let cartContainer = document.querySelector(".cartContainer")

function displayCart(){
    if(cartContainer.style.display ==  'flex'){
        cartContainer.style.display = 'none'
    } else  (cartContainer.style.display = 'flex')
}

        //RENDER SHOPPING CART AND ADD ITEMS TO CART 

//required variables for cart functions
const productsElement = document.querySelector(".gridList");
const cartList = document.querySelector(".cartList");
const subTotal = document.querySelector('.totalItems');
const subTotalPrice = document.querySelector('.totalPrice');
const emptyCart = document.querySelector('.emptyCart');
const cartNumber = document.querySelector('.cartNumber')
//get cart from local storage and have the functions updated on reload page
let cart = JSON.parse(localStorage.getItem("CART")) ||  []
renderCartItems();
renderSubTotal();

//render the products on the website through the products.js
function renderProducts(){

    products.forEach((product) => {
        productsElement.innerHTML += `
        <div class="gridItems">
            <div class="productTitle">${product.name}</div>
            <img class="gridImage" src=${product.imgSrc} alt="arabica">
            <div class="selectButtons">
                <div class="priceTag">${product.price}$</div>
                <div title="Add to cart" class="addCart" onclick="addToCart(${product.id})"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg></div>
            </div>
        </div>
        `
    })
}
renderProducts();

//add products to cart, check if there are 2 same items => increment number of units 
function addToCart(id) {
     if (cart.some((item) => item.id === id)) {
       changeNumberOfUnits('plus', id)
    } else  {
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
function updateCart(){
    renderCartItems();
    renderSubTotal();
    localStorage.setItem("CART", JSON.stringify(cart))
}


function renderSubTotal(){
    let totalPrice = 0, totalItems = 0;
    cart.forEach((item) =>{
        totalPrice+= item.price * item.numberOfUnits;
        totalItems+= item.numberOfUnits
    })

    subTotal.innerHTML = `Total <small>(${totalItems} items)</small>`
    subTotalPrice.innerHTML = `${totalPrice.toFixed(2)}$`
    cartNumber.innerHTML= `${totalItems}`
}



//add the specific item to cart for each product clicked
function renderCartItems() {
//display "cart is empty" if the cart has no products
    if(cart.length === 0) {
        emptyCart.style.display = 'flex'
    } else {emptyCart.style.display = 'none'};


        cartList.innerHTML = ''
            if (cart) {
                cart.forEach((item) => {
                    cartList.innerHTML += `
                <div class="itemContainer">
                <div class="photoDesc">
                    <img src=${item.imgSrc} class="itemPhoto"></img>
                    <div class="itemDescription">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
                <div class="itemPrice">
                    <div class="price">${(item.price * item.numberOfUnits).toFixed(2)}$</div>
                    <div class="plusMinus">
                        <div class="plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
                        <div class="quantity">${item.numberOfUnits}</div>
                        <div class="minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                    </div>
                    <div class="removeButton" onclick="removeCartItems(${item.id})">remove</div>
                </div>
                </div>
                `
                })
            }
            
}   

// increment/decrement items on the cart so you can update the value
function changeNumberOfUnits(action, id){
    cart = cart.map((item) =>{
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            if(action === "minus" && numberOfUnits>1){
                numberOfUnits--;
            } else if(action === "plus") {
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
    updateCart()
}

