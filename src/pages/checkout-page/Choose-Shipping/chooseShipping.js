const backArrow = document.getElementById("backArrow")
const apply = document.getElementById("apply")


backArrow.addEventListener('click',()=>{
    window.location.href="../checkoutPage.html"
})

apply.addEventListener('click',()=>{
    const choose = document.querySelector('input[name="shippingAddress"]:checked')
    localStorage.setItem("chooseShipping",JSON.stringify({
        id : choose.id,
        data : choose.dataset.id,
        image : choose.value
    }))
})
