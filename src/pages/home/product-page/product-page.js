import { quantityValueHandel } from "../../../../public/quantity.js";
import { accessToken, API_KEY, baseURL } from "../../../../services/utils.js";

const productName = document.getElementById("productName");
const description = document.getElementById("description");
const size = document.getElementById("size");
const color = document.getElementById("color");
const price = document.getElementById("price");
const images = document.getElementById("images");
const backArrow = document.getElementById("backArrow");
const loading = document.getElementById("loading");
const addToCartButton = document.getElementById("addToCartButton");
const quantityInput = document.getElementById("quantityInput");

const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

let product_Id = ""


getProduct(productId);
async function getProduct(Id) {
  product_Id = Id
  console.log(Id);
  loading.classList.remove("hidden");
  try {
    const response = await fetch(
      `${baseURL}/api/records/products?filterKey=id&filterValue=${Id}`,
      {
        method: "GET",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${accessToken()}`,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 403) {
        localStorage.removeItem("token");
        location.href = "../../log-in/log-in.html";
      }
      throw new Error("response is not ok!");
    }

    const result = await response.json();
    renderProduct(result.records[0]);
    console.log(result.records[0]);
    return result.records;
  } catch (error) {
    console.log(`from catch ${error.message}`);
  }
}

let productPrice = "";
function renderProduct(product) {
  product.imageURL.map((item) => {
    images.innerHTML += `<div class="swiper-slide">
    <img
      src="${item}"
      alt=""
    />
  </div>`;
  });
  productName.innerHTML = product.name;
  description.innerHTML =
    product.description + " " + "<strong>view more..</strong>";
  product.sizes.map((item) => {
    size.innerHTML += `<label class="cursor-pointer">
    <input type="radio" name="size" class="hidden peer" id="${item}">
  <div class="peer-checked:bg-[#343A40] peer-checked:text-white peer-checked:border-[#343A40] border-2 border-[#343A40] flex items-center justify-center border border-[#717171] rounded-full w-[40px] h-[40px] py-2 px-2">
    <p class="text-center">${item}</p>
</div>
</label>`;
  });
  product.colors.map((item) => {
    color.innerHTML += `<label class="cursor-pointer border border-gray-200 bg-${item} ${item} rounded-full w-[43px] h-[43px]">
                        <input type="radio" name="color" class="hidden peer" id="${item}">
                      <div class="flex items-center hidden peer-checked:block peer-checked:bg-black peer-checked:bg-opacity-30 justify-center rounded-full  py-2 px-2">
                            <img src="../../../../assets/images/select.png" ></img>
                    </div>
                </label>`;
  });
  price.textContent = "$" + product.price;
  productPrice = product.price;
  loading.classList.add("hidden");
  renderSwiper();
  quantityValueHandel();
  TotalValueHandler()
  addToCart()
}

function renderSwiper() {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 2,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function TotalValueHandler() {
const quantityPlus = document.getElementById("quantityPlus");
const quantityNegative = document.getElementById("quantityNegative");

quantityPlus.addEventListener("click", () => {
  price.innerHTML = "$ " + quantityInput.value * productPrice;
});
quantityNegative.addEventListener("click", () => {
  price.innerHTML = "$ " + quantityInput.value * productPrice;
});

backArrow.addEventListener("click", () => {
  history.back();
});
}

function addToCart() {
  let product_size = ""
  let product_color = ""
  let product_quantity = ""
  
  addToCartButton.addEventListener("click", async () => {
    product_quantity = quantityInput.value
    
    const colorOption = document.querySelectorAll('input[name="color"]:checked')
    product_color = colorOption[0].id

    const sizeOption = document.querySelectorAll('input[name="size"]:checked')
    product_size = sizeOption[0].id

    await fetch(`${baseURL}/api/records/carts`,{
      method:"POST",
      headers:{
        api_key: API_KEY,
        Authorization : `Bearer ${accessToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id" : product_Id,
        "color" : product_color,
        "size" : product_size,
        "quantity" : product_quantity 
      })
    }).then((response)=>{
      if (!response.ok) {
        if (response.status === 403) {
          window.location.href = "../../log-in/log-in.html"
        }
        throw new Error("Failed to add to cart");
      }
    })
  });
}
