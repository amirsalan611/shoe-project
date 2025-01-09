const backArrow = document.getElementById("backArrow");
const apply = document.getElementById("apply")

backArrow.addEventListener("click", () => {
    history.back();
});

apply.addEventListener('click',()=>{
    const address = document.querySelectorAll('input[name="shippingAddress"]:checked') 
    console.log(address[0].id);
    console.log(address[0].dataset.id);
    localStorage.setItem("ShippingAddress",JSON.stringify({
        id : address[0].id,
        data : address[0].dataset.id
    }))
})
