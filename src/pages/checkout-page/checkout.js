import { getProducts } from "./GetProducts.js";

const orderList = document.getElementById("orderList")
const loadingSection = document.getElementById("loading")
const backArrow = document.getElementById("backArrow");
const chooseShipping = document.getElementById("chooseShipping")
const shippingType = document.getElementById("shippingType")
const payment = document.getElementById("payment")
const shippingAddress = document.getElementById("shippingAddress")
const amount = document.getElementById("amount")

const localStorageAddress = localStorage.getItem("ShippingAddress") || []
const address = JSON.parse(localStorageAddress)

const localStorageShippingMethod = localStorage.getItem("chooseShipping")
const shippingMethod = JSON.parse(localStorageShippingMethod)
console.log(shippingMethod);

let totalPrice = +""
renderPage()
async function renderPage() {
  totalPrice = +""
    const products = await getProducts()
    console.log(products);
    shippingAddress.innerHTML = `<h3 class="text-[20px] font-medium">${address.id}</h3>
                <p class="text-[14px] text-gray-500">${address.data}</p>`
    if (shippingMethod) {
      shippingType.innerHTML = `<div class="flex justify-center gap-3 items-center">
                    <img src="${shippingMethod.image}" alt="truck" class="w-[40px]">
                    <div class="flex flex-col gap-2 items-cente">
                        <h3 class="text-[20px] font-medium">${shippingMethod.id}</h3>
                        <p class="text-gray-500">Estimated ..., jun 2024</p>
                    </div>
                    </div>
                    <div class="flex  gap-3">
                        <h3 class="text-[20px] font-medium">$${shippingMethod.data}</h3>
                        <img src="../../../assets/svg/edit.svg" alt="next" class="w-[25px] ">
                    </div>`
      products.forEach(item => {
        totalPrice += +item.productPrice * item.quantity
      });
      amount.innerHTML = `<div class="border-b-[1px] border-b-gray-200 py-2">
                    <div class="flex justify-between text-[17px] font-medium">
                        <h3 class="text-gray-500">Amount</h3>
                        <h3>${totalPrice?"$"+totalPrice:"-"}</h3>
                    </div>
                    <div class="flex justify-between text-[17px] font-medium">
                        <h3 class="text-gray-500">shipping</h3>
                        <h3>${shippingMethod.data?"$"+shippingMethod.data:"-"}</h3>
                    </div>
                </div>
                <div class="flex justify-between text-[17px] font-medium py-2">
                    <h3 class="text-gray-500">Total</h3>
                    <h3>${(totalPrice?totalPrice:"-")+(shippingMethod.data?shippingMethod.data:"-")?"$"+(totalPrice?totalPrice:"-")+(shippingMethod.data?shippingMethod.data:"-"):"-"}</h3>
                </div>`
    }else{
      shippingType.innerHTML = `<div class="flex justify-center gap-2 items-center">
                <img src="../../../assets/svg/truck.svg" alt="truck" class="w-[40px]">
                <h3 class="text-[17px] font-medium">Choose Shipping Type</h3>
                </div>
                <img src="../../../assets/svg/next.svg" alt="next" class="w-[20px] ">`
    }
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
                <div class="flex items-center justify-between">
              <h3 class="font-medium truncate max-w-[170px] text-[18px]">${product.ProductName}</h3>
                </div>
              <div class="flex items-center gap-2">
                <div class="bg-${product.color} ${product.color} border-[1px] border-gray-200 rounded-full w-4 h-4"></div>
                <p class="text-gray-400 text-[12px]">${product.color}</p>
                <div class="bg-gray-400 h-[12px] w-[1px]"></div>
                <p class="text-gray-400 text-[12px]">Size = ${product.size}</p>
              </div>
    
    
              <div class="flex items-center justify-between">
                <p class="text-[20px] font-medium">$${product.productPrice * product.quantity}</p>
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
  window.location.href = "../cart-page/cartPage.html";
  ;
});

payment.addEventListener('click',()=>{
  window.location.href="./payment-Methods/paymentMethodsPage.html"
  localStorage.removeItem("chooseShipping")
})
