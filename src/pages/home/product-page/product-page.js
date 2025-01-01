// import { quantityValueHandel } from "./quantity.js";
// quantityValueHandel()

const quantityNegative = document.getElementById("quantityNegative")
const quantityInput = document.getElementById("quantityInput")
const quantityPlus = document.getElementById("quantityPlus")

let quantity = 0

quantityValueHandel()
function quantityValueHandel() {
    quantityPlus.addEventListener('click',()=>{
        quantity++
    updateQuantityInput();
        
    })
    quantityNegative.addEventListener('click',()=>{
        if (quantity>0) {
        quantity--
    updateQuantityInput();

    }})
}

function updateQuantityInput() {
    quantityInput.value = quantity;
}
// add To Cart Button hander
const addToCartButton = document.getElementById("addToCartButton")

addToCartButton.addEventListener('click',()=>{
    
})


var swiper = new Swiper(".mySwiper", {
  spaceBetween: 2,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
