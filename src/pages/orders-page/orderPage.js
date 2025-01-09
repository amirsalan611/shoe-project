import { accessToken, API_KEY, baseURL } from "../../../services/utils.js"
import { activeOrders } from "./getByActive.js"

const homeBTN =document.getElementById("home")
const cartBTN = document.getElementById("cart")
const activeSection = document.getElementById("activeSection")
const sections = document.querySelectorAll('input[name="order"]');

sections.forEach(button => {
    button.addEventListener('change', () => {
        renderOrders();
    });
});

let activeProducts = await activeOrders()

renderOrders()
async function renderOrders() {
const activeBTN = document.querySelector('input[name="order"]:checked')
    if (activeBTN.id === "Active") {
        activeSection.innerHTML = ""
        console.log("is active");
        const products = await activeProducts.filter(item=>item.status === "false")
        console.log(products);
            products.map((item)=>{
            activeSection.innerHTML+=`<div class="shadow-xl flex gap-4 p-5 bg-white rounded-[35px]" >
            <div class="rounded-[20px] min-w-[130px]  overflow-hidden h-[130px] w-[110px]">
              <img
                src="${item.imageURL}"
                alt=""
                class="min-w-[130px]"
              />
            </div>
            <div class="flex flex-col w-full gap-1">
              <h3 class="font-medium text-[20px] truncate max-w-[170px]">${item.ProductName}</h3>
    
              <div class="flex items-center gap-2">
                <div class="bg-${item.color} ${item.color} border-[1px] border-gray-200 rounded-full w-4 h-4"></div>
                <p class="text-gray-400 text-[13px]">${item.color}</p>
                <div class="bg-gray-400 h-[12px] w-[1px]"></div>
                <p class="text-gray-400 text-[13px]">Size = ${item.size}</p>
                <div class="bg-gray-400 h-[12px] w-[1px]"></div>
                <p class="text-gray-400 text-[13px]">Qty = ${item.quantity}</p>
              </div>
    
              <div class="bg-gray-200 text-center mt-1 w-16 rounded-[5px] p-1">
                <h3 class="text-[10px]">In Delivery</h3>
              </div>
    
              <div class="flex items-center justify-between">
                <p class="text-[20px] font-medium">$${item.productPrice}</p>
                <div class="bg-black mx-2 text-center my-auto p-2 rounded-full w-[120px] text-white">
                    <h3 class="text-[12px]">Track Order</h3>
                </div>
              </div>
            </div>
          </div>`})
        postToCompleted()

    }else if(activeBTN.id === "Completed"){
        activeSection.innerHTML = ""
        console.log("is active");
        const products = await activeProducts.filter(item=>item.status === "true")
            products.map((item)=>{
            activeSection.innerHTML+=`<div class="shadow-xl flex gap-4 p-5 bg-white rounded-[35px]">
            <div class="rounded-[20px] min-w-[130px]  overflow-hidden h-[130px] w-[110px]">
              <img
                src="${item.imageURL}"
                alt=""
                class="min-w-[130px]"
              />
            </div>
            <div class="flex flex-col w-full gap-1">
              <h3 class="font-medium text-[20px]">${item.name}</h3>
    
              <div class="flex items-center gap-2">
                <div class="bg-${item.color} ${item.color} rounded-full w-4 h-4"></div>
                <p class="text-gray-400 text-[13px]">${item.color}</p>
                <div class="bg-gray-400 h-[12px] w-[1px]"></div>
                <p class="text-gray-400 text-[13px]">Size = ${item.size}</p>
                <div class="bg-gray-400 h-[12px] w-[1px]"></div>
                <p class="text-gray-400 text-[13px]">Qty = ${item.quantity}</p>
              </div>
    
              <div class="bg-gray-200 text-center mt-1 w-16 rounded-[5px] p-1">
                <h3 class="text-[10px]">Completed</h3>
              </div>
    
              <div class="flex items-center justify-between">
                <p class="text-[20px] font-medium">$${item.productPrice}</p>
                <div class="bg-black mx-2 text-center my-auto p-2 rounded-full w-[120px] text-white">
                    <h3 class="text-[12px]">Leave Review</h3>
                </div>
              </div>
            </div>
          </div>
`
        })

    }else{
        console.log("is not ok");
    }
}

let isPosting = false;

 function postToCompleted() {
    if (isPosting === true) return;

    console.log(isPosting);

    isPosting = true;

    setTimeout(() => {
        console.log("put is start");
        try {
            activeProducts.forEach(async(item) => {
                const response = await fetch(`${baseURL}/api/records/orders/${item.id}`,{
                method : "put",
                headers: {
                    "Content-Type": "application/json",
                    api_key: API_KEY,
                    Authorization: `Bearer ${accessToken()}`,
                  },
                  body : JSON.stringify({
                    status : "true"
                  })
            })
            if (!response.ok) {
                throw new Error("Failed to update quantity");
              }
          } 
        )}catch (error) {
            console.error(`Error updating orders: ${error.message}`);
          }
    }, 3000);
}

homeBTN.addEventListener('click',()=>{
    window.location.href="../home/home.html"
})

cartBTN.addEventListener('click',()=>{
    window.location.href="../cart-page/cartPage.html"
})
