const quantityNegative = document.getElementById("quantityNegative")
const quantityInput = document.getElementById("quantityInput")
const quantityPlus = document.getElementById("quantityPlus")

let quantity = 0

export function quantityValueHandel() {
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
