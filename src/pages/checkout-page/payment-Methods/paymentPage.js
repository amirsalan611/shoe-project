const backdrop = document.getElementById("backdrop")
const SuccessfullModal = document.getElementById("SuccessfullModal")
const payBTN = document.getElementById("payBTN")
const viewOrder = document.getElementById("viewOrder")

payBTN.addEventListener('click',()=>{
    backdrop.classList.remove("hidden")
    SuccessfullModal.classList.remove("hidden")
})

viewOrder.addEventListener('click',()=>{
    window.location.href="../../orders-page/ordersPage.html"
})
