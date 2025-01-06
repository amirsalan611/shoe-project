export function quantityValueHandel() {

    const quantityPluses = document.querySelectorAll('.quantityPlus');
    const quantityMinuses = document.querySelectorAll('.quantityNegative');
    const quantityInputs = document.querySelectorAll('.quantityInput');

    quantityPluses.forEach((quantityPlus, index) => {
        quantityPlus.addEventListener('click', () => {
            let quantity = parseInt(quantityInputs[index].value) || 1;
            quantity++;
            quantityInputs[index].value = quantity;
            updateCartQuantityInput(index, quantity);
        });
    });

    quantityMinuses.forEach((quantityMinus, index) => {
        quantityMinus.addEventListener('click', () => {
            let quantity = parseInt(quantityInputs[index].value) || 1;
            if (quantity > 1) {
                quantity--;
                quantityInputs[index].value = quantity;
                updateCartQuantityInput(index, quantity);
            }
        });
    });
}

function updateCartQuantityInput(index, quantity) {
    const cartQuantityInputs = document.querySelectorAll('.cartQuantityInput');
    cartQuantityInputs[index].value = quantity;
}
