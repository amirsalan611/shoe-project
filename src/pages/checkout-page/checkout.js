import { getProducts } from "./GetProducts.js";

const orderList = document.getElementById("orderList")
const loadingSection = document.getElementById("loading")
const backArrow = document.getElementById("backArrow");
const chooseShipping = document.getElementById("chooseShipping")
const shippingType = document.getElementById("shippingType")
const payment = document.getElementById("payment")


renderProducts()
async function renderProducts() {
    const products = await getProducts()
    console.log(products);
    products.map((product)=>{
        orderList.innerHTML += `<div class="shadow-xl flex gap-4 p-5 bg-white rounded-[35px]">
            <div class="rounded-[20px] min-w-[130px]  overflow-hidden h-[130px] w-[110px]">
              <img
                src="${product.imageURL}"
                alt=""
                class="min-w-[130px]"
              />
            </div>
            <div class="flex flex-col justify-between w-full gap-1">
                <div class="flex items-center justify-cente justify-between">
              <h3 class="font-medium text-[18px]">${product.productName}</h3>
                </div>
              <div class="flex items-center gap-2">
                <div class="bg-${product.color} ${product.color} border-[1px] border-gray-200 rounded-full w-4 h-4"></div>
                <p class="text-gray-400 text-[12px]">${product.color}</p>
                <div class="bg-gray-400 h-[12px] w-[1px]"></div>
                <p class="text-gray-400 text-[12px]">Size = ${product.size}</p>
              </div>
    
    
              <div class="flex items-center justify-between">
                <p class="text-[20px] font-medium">$${product.productPrice}</p>
                <div class="flex items-center ml-5 gap-3">
                    <div class="flex bg-[#ececed] justify-center items-center w-[40px] h-[40px] rounded-full">
                        <h3>${product.quantity}</h3>
                    </div>
                 </div>
              </div>
            </div>
          </div>`
        })
        loadingSection.classList.add("hidden");
}

chooseShipping.addEventListener('click',()=>{
window.location.href="./shipping-address/shippingAddressPage.html"
})


shippingType.addEventListener('click',()=>{
    window.location.href="./choose-shipping/ChooseShipping.html"
})


backArrow.addEventListener("click", () => {
    history.back();
});

payment.addEventListener('click',()=>{
  window.location.href="./payment-Methods/paymentMethodsPage.html"
})
