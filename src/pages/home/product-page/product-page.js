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
const succifullyAdd = document.getElementById("succifullyAdd")
const addToWishlistBTN = document.getElementById("addToWishlistBTN")
const wishlistBTN = document.getElementById("wishlistBTN")

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

let product_Id = ""
let productImageURL = ""
let SinglePrice = ""

getProduct(productId);
async function getProduct(Id) {
  product_Id = Id
  console.log(product_Id);
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
  productImageURL = product.imageURL[0]
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
  SinglePrice = product.price
  productPrice = product.price;
  renderSwiper();
  quantityValueHandel();
  TotalValueHandler()
  addToCart()
  isProductInWishlist()
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
  let ProductName = productName.textContent
  let productPrice = ""

  addToCartButton.addEventListener("click", async () => {
    product_quantity = quantityInput.value
    productPrice = SinglePrice * quantityInput.value

    const colorOption = document.querySelectorAll('input[name="color"]:checked')
    product_color = colorOption[0].id || null 

    const sizeOption = document.querySelectorAll('input[name="size"]:checked')
    product_size = sizeOption[0].id || null 

    if (product_color === null || product_size === null) {
      console.log("color or size is null");
      return;
    }

    const response = await fetch(`${baseURL}/api/records/carts`,{
      method:"POST",
      headers:{
        api_key: API_KEY,
        Authorization : `Bearer ${accessToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "product_id" : product_Id,
        "color" : product_color,
        "size" : product_size,
        "quantity" : product_quantity ,
        "imageURL" : productImageURL,
        ProductName,
        productPrice
      })
    }).then((response)=>{
      console.log("sended to carts");
      succifullyAdd.classList.remove("hidden")

      setTimeout(() => {
        succifullyAdd.classList.add("hidden")
      }, 3000);

      if (!response.ok) {
        if (response.status === 403) {
          window.location.href = "../../log-in/log-in.html"
        }
        throw new Error("Failed to add to cart");
      }
    })
  });
}

let wishlistProduct = ""

async function isProductInWishlist() {
  const response = await fetch(`${baseURL}/api/records/wishlist`,{
    method: "GET",
    headers:{
          api_key:API_KEY,
          Authorization:`Bearer ${accessToken()}`
    },
  })
  if (!response.ok) {
    console.log("Whishlist get response is not ok!");
  }
  const wishlist = await response.json();
  console.log(wishlist.records);
  const isAdded = await wishlist.records.some((item) => item.product_id === product_Id);
  wishlistProduct = await wishlist.records.find((item) => item.product_id === product_Id);
  console.log(wishlistProduct);
  if (isAdded) {
    wishlistBTN.dataset.added = "true";
    wishlistBTN.innerHTML = `<img src="../../../../assets/svg/red heart.svg" alt="heart" class="m-2 w-6" id="addToWishlistBTN"></div>`
  }
  loading.classList.add("hidden");
  addToWishlist()
  removeProductFromWishlist(await wishlistProduct.id)
}

 function addToWishlist() {
  if (wishlistBTN.dataset.added === "false") {
    addToWishlistBTN.addEventListener('click',async()=>{
      wishlistBTN.innerHTML = `<img src="../../../../assets/svg/red heart.svg" alt="heart" class="m-2 w-6" id="addToWishlistBTN"></div>`
      const isAdded = wishlistBTN.dataset.added === "true";
      const response = await fetch(`${baseURL}/api/records/wishlist`,{
        method: 'post',
        headers:{
          "Content-Type" : "application/json",
            api_key:API_KEY,
            Authorization:`Bearer ${accessToken()}`
        },
        body : JSON.stringify({
          "product_id" : product_Id,
        })
    })
    if (!response.ok) {
      console.log("response is not ok!");
    }
    console.log("Product added to wishlist!");
    })
  }
}
async function removeProductFromWishlist(id) {
  if (wishlistBTN.dataset.added === "true") {
    const response = await fetch(`${baseURL}/api/records/wishlist/${id}`,{
      method: 'DELETE',
      headers:{
        "Content-Type" : "application/json",
          api_key:API_KEY,
          Authorization:`Bearer ${accessToken()}`
      }
}).then(()=>{
  wishlistBTN.dataset.added = "false"
  wishlistBTN.innerHTML = `<img src="../../../../assets/svg/heart.svg" alt="heart" class="m-2 w-6" id="addToWishlistBTN"></div>`
})
}}
