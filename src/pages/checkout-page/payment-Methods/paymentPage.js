import { accessToken, API_KEY, baseURL } from "../../../../services/utils.js"

const backdrop = document.getElementById("backdrop")
const SuccessfullModal = document.getElementById("SuccessfullModal")
const payBTN = document.getElementById("payBTN")
const viewOrder = document.getElementById("viewOrder")
const backArrow = document.getElementById("backArrow")

payBTN.addEventListener('click',()=>{
    backdrop.classList.remove("hidden")
    SuccessfullModal.classList.remove("hidden")
})

backArrow.addEventListener('click',()=>{
    window.location.href="../checkoutPage.html"
})

viewOrder.addEventListener('click',async ()=>{
    try {
        const response = await fetch(`${baseURL}/api/records/carts`, {
            method: "GET",
            headers: {
              api_key: API_KEY,
              Authorization: `Bearer ${accessToken()}`,
            }
        })
        if (!response.ok) {
            if (response.status === 403) {
                localStorage.removeItem("token")
                location.href = "../../log-in/log-in.html"
            }
            throw new Error("response is not ok!");
        }
        const result = await response.json()
        sendToOrderEndpoint(result.records)
        return result.records
    }catch(error) {
        console.log(`from catch ${error.message}`);
    }
})

 function sendToOrderEndpoint(orders) {
    console.log(orders);
    orders.forEach(async (item) => {
        try {
            const response = await fetch(`${baseURL}/api/records/orders`,{
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    api_key: API_KEY,
                    Authorization: `Bearer ${accessToken()}`,
                  },
                  body : JSON.stringify({
                    product_id : item.product_id,
                    color : item.color,
                    size : item.size,
                    quantity : item.quantity,
                    imageURL : item.imageURL,
                    ProductName : item.ProductName,
                    productPrice : item.productPrice,
                    status : "false"
                  })
            })
            clearCarts()
            console.log("item ok");
          } catch (error) {
            console.log(`from cath ${error.message}`);
          }
    })
    window.location.href="../../orders-page/ordersPage.html"
}


async function clearCarts() {
    try {
        const response = await fetch(`${baseURL}/api/records/carts/delete-all`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                api_key: API_KEY,
                Authorization: `Bearer ${accessToken()}`,
              }
        })
        console.log("carts cleared");
    } catch (error) {
        console.log(`from catCh ${error.message}`);
        
    }
}
