import { quantityValueHandel } from "../../../../public/quantity.js";
import { accessToken, API_KEY, baseURL } from "../../../services/utils.js";

const cartsSection = document.getElementById("cartsSection");
const removeProductModal = document.getElementById("removeProductModal");
const backdrop = document.getElementById("backdrop");
const loading = document.getElementById("loading");

let totalPrice = 0

async function getCarts() {
  loading.classList.remove("hidden");
  try {
    const response = await fetch(`${baseURL}/api/records/carts`, {
      method: "GET",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${accessToken()}`,
      },
    });
    if (!response.ok) {
      if (response.status === 403) {
        localStorage.removeItem("token");
        location.href = "../log-in/log-in.html";
      }
      throw new Error("response is not ok!");
    }
    const result = await response.json();
    return result.records;
  } catch (error) {
    console.log(`from cath ${error.message}`);
  loading.classList.add("hidden");
  }
}


renderCarts();
async function renderCarts() {
    totalPrice = 0
    cartsSection.innerHTML = "";
  const carts = await getCarts();
  if (carts.length===0) {
    cartsSection.innerHTML = `<div class="text-center m-[50px]">
        <img src="../../../assets/images/Doc.png" alt="" class=" w-[300px]">
        <h3 class="text-[20px] font-medium">No Cart Has Been Added yet</h3>
      </div>`
  }
  carts.forEach((product) => {
    totalPrice += product.productPrice * product.quantity
    cartsSection.innerHTML += `<div class="shadow-xl flex gap-4 p-5 bg-white rounded-[35px] " >
            <div class="rounded-[20px] min-w-[130px]  overflow-hidden h-[130px] w-[110px]" onclick="productPage(${product.product_id})">
              <img
                src="${product.imageURL}"
                alt=""
                class="min-w-[130px]"
              />
            </div>
            <div class="flex flex-col justify-between w-full gap-1">
                <div class="flex items-center justify-between">
              <h3 class="font-medium truncate max-w-[160px] text-[18px]">${
                product.ProductName
              }</h3>
              <img src="../../../assets/svg/trash.svg" alt="" class="w-[30px] p-1" onclick="removeModal(${product.id},'${product.ProductName}', '${product.color}', '${product.imageURL}', '${product.size}', ${product.quantity} , ${product.productPrice})">
                </div>
              <div class="flex items-center gap-2">
                <div class="bg-${product.color} ${
      product.color
    } rounded-full border border-gray-200 w-4 h-4"></div>
                <p class="text-gray-400 text-[12px]">${product.color}</p>
                <div class="bg-gray-400 h-[12px] w-[1px]"></div>
                <p class="text-gray-400 text-[12px]">Size = ${product.size}</p>
              </div>
    
    
              <div class="flex items-center justify-between">
                <p class="text-[20px] font-medium">$${
                  product.productPrice * product.quantity
                }</p>
                <div class="flex items-center ml-5 gap-3">
                    <div class="flex bg-[#ececed] justify-between w-[90px] rounded-[30px]">
                        <button data-id="${product.id}" class="quantityNegative rounded-[30px] font-medium text-[17px] py-1 pl-4">-</button>
                        <input type="number" id="quantityInput_${product.id}" class=" quantityInput bg-black w-full bg-opacity-0 text-center outline-none text-[17px]" value="${
                          product.quantity
                        }">
                        <button data-id="${product.id}" class=" quantityPlus rounded-[30px] font-medium text-[17px] py-1 pr-4">+</button>
                    </div>
                 </div>
              </div>
            </div>
          </div>`;
        });
        loading.classList.add("hidden");
        checkoutHandler()
        quantityValueHandel()
        productQuantityUpdate()
    }

    function productQuantityUpdate() {
      const plusBTNs = document.querySelectorAll(".quantityPlus");
      const negativeBTNs = document.querySelectorAll(".quantityNegative");
    
      plusBTNs.forEach((item) => {
        item.addEventListener("click", async () => {
          const productId = item.dataset.id;
          const inputField = document.getElementById(`quantityInput_${productId}`);
          let quantity = parseInt(inputField.value);
    
          try {
            const response = await fetch(`${baseURL}/api/records/carts/${productId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                api_key: API_KEY,
                Authorization: `Bearer ${accessToken()}`,
              },
              body: JSON.stringify({ quantity }),
            });
    
            if (!response.ok) {
              throw new Error("Failed to update quantity");
            }
    
            inputField.value = quantity;

            // setTimeout(() => {
            // }, 3000);
            renderCarts();
    
            return
          } catch (error) {
            console.error(`Error updating quantity: ${error.message}`);
          }
        });
      });
    
      negativeBTNs.forEach((item) => {
        item.addEventListener("click", async () => {
          const productId = item.dataset.id;
          const inputField = document.getElementById(`quantityInput_${productId}`);
          let quantity = parseInt(inputField.value);
    
          try {
            const response = await fetch(`${baseURL}/api/records/carts/${productId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                api_key: API_KEY,
                Authorization: `Bearer ${accessToken()}`,
              },
              body: JSON.stringify({ quantity }),
            });
    
            if (!response.ok) {
              throw new Error("Failed to update quantity");
            }
    
            inputField.value = quantity;

            // setTimeout(() => {
            //   renderCarts();
            //   }, 3000);

            return
          } catch (error) {
            console.error(`Error updating quantity: ${error.message}`);
          }
        });
      });
    }
    

function productPage(productId) {
  window.location.href = `../home/product-page/product-page.html?productId=${encodeURIComponent(productId)}`;
}
window.productPage = productPage;
    
function checkoutHandler() {
    document.getElementById("checkout").innerHTML = `<div class="flex flex-col p-5">
            <h3 class="text-[13px] text-gray-500">Total Price</h3>
            <h3 class="text-[25px]">$${totalPrice}</h3>
        </div>
        <div class="flex items-center bg-black rounded-full w-[250px] m-5 text-white items-center justify-center shadow-xl gap-4">
            <h3>Checkout</h3>
            <img src="../../../assets/svg/arrow.svg" alt="" class="w-[20px]">
        </div>`
}

function removeModal(id,name, color, imageURL, size, quantity , price) {
  removeProductModal.classList.remove("hidden");
  backdrop.classList.remove("hidden");

  const productName = document.getElementById("productName");
  productName.textContent = name;

  const Image = document.getElementById("image");
  Image.innerHTML = `<img src="${imageURL}" alt="" class="min-w-[130px]" />`;

  const details = document.getElementById("details")
  details.innerHTML= `<div class="bg-${color} ${color} rounded-full w-4 h-4"></div>
                    <p class="text-gray-400 text-[12px]">${color}</p>
                    <div class="bg-gray-400 h-[12px] w-[1px]"></div>
                    <p class="text-gray-400 text-[12px]">Size = ${size}</p>`

  const Price = document.getElementById("Price")
  Price.textContent="$"+price*quantity

  const quantityInput = document.getElementById("quantityInput")
  quantityInput.value = quantity

  const removeButton = document.getElementById("removeButton")
  removeButton.innerHTML=`<div class="py-3 w-full text-center bg-gray-200 rounded-[30px]" id="closeModal">
                <h3>Cancel</h3>
            </div>
            <div class="py-3 w-full text-center text-white bg-black shadow-xl rounded-[30px]" id="remove">
                <h3>Yes,Remove</h3>
            </div>`

            closeModal()
            document.getElementById("remove").addEventListener('click',()=>{
                remove(id)
            })
            
}
window.removeModal = removeModal;


async function remove(id) {
    try {
        const response = await fetch(`${baseURL}/api/records/carts/${id}`,{
            method: "DELETE",
            headers: {
                api_key: API_KEY,
                Authorization: `Bearer ${accessToken()}`,
              }
        })
        if (!response.ok) {
            throw new Error("response is not ok!");
        }
        console.log("item Removed!");
        removeProductModal.classList.add("hidden");
        backdrop.classList.add("hidden");
        renderCarts()
    } catch (error) {
    console.log(`from cath ${error.message}`);
    }
}

function closeModal() {
    document.getElementById("closeModal").addEventListener('click',()=>{
        removeProductModal.classList.add("hidden");
        backdrop.classList.add("hidden");
    })
}

document.getElementById("home").addEventListener('click',()=>{
    window.location.href="../home/home.html"})
