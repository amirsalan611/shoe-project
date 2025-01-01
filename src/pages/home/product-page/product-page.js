import { quantityValueHandel } from "./quantity.js";
quantityValueHandel()

// add To Cart Button handler
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
