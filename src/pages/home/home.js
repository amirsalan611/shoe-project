import { brandHandler } from "./brandHandler.js";
import { getAllProducts } from "./getProducts.js";
const loadingSection = document.getElementById("loading")
const productsSection = document.getElementById("productsSection")
const cart = document.getElementById("cart")

document.addEventListener('DOMContentLoaded', () => {
    const selectedOption = document.querySelector('input[name="filter"]:checked');
    if (selectedOption.id === "all") {
        renderProducts();
    }
});

const filterOptions = document.querySelectorAll('input[name="filter"]');

filterOptions.forEach((option) => {
    option.addEventListener('change', () => {
        const selectedOption = document.querySelector('input[name="filter"]:checked');

        switch (selectedOption.id) {
            case "all":
                renderProducts();
                break;
            default:
                renderBrandProducts(selectedOption.id.toUpperCase())
                break;
        }
    });
});



async function renderBrandProducts(brand) {
    console.log(brand);
    const products = await brandHandler(brand)
    console.log(products);
    productsSection.innerHTML= ""

    loadingSection.classList.remove("hidden")
    console.log(loadingSection);

    products.map((product)=>{
        productsSection.innerHTML+=`<div onclick="productPage(${product.id})" class="flex flex-col items-center gap-3">
                <div class="bg-[#F3F3F3] rounded-[24px] p-5">
                    <img src="${product.imageURL[0]}" alt="">
                </div>
                <div class="self-start px-2">
                    <h3 class="font-bold text-[17px] truncate max-w-[170px]">${product.name}</h3>
                    <h3 class="font-medium text-[15px]">$ ${product.price}</h3>
                </div>
            </div>`
    })
}

async function renderProducts() {

    const products = await getAllProducts()
    console.log(products);
    productsSection.innerHTML= ""
    products.map((product)=>{
        productsSection.innerHTML+=`<div onclick="productPage(${product.id})" class="flex flex-col items-center gap-3">
                <div class="bg-[#F3F3F3] rounded-[24px] p-5">
                    <img src="${product.imageURL[0]}" alt="">
                </div>
                <div class="self-start px-2">
                    <h3 class="font-bold text-[17px] truncate max-w-[170px]">${product.name}</h3>
                    <h3 class="font-medium text-[15px]">$ ${product.price}</h3>
                </div>
            </div>`
    })
}


function productPage(productId) {
    window.location.href = `./product-page/product-page.html?productId=${encodeURIComponent(productId)}`;
}

window.productPage = productPage;


const brandCards = document.querySelectorAll("#brandBox > div");

brandCards.forEach((card) => {
    card.addEventListener("click", () => {
        const brand = card.getAttribute("data-id");
        BrandNameHandler(brand);
        GoToBrandPage(brand);
    });
});


function GoToBrandPage(brand) {
    window.location.href=`./brand-page/brand-page.html?brand=${encodeURIComponent(brand)}`
}
goToCartPage()
function goToCartPage() {
    cart.addEventListener('click',()=>{
        window.location.href="../cart-page/cartPage.html"
    })
}








async function BrandNameHandler() {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("brand");
    console.log(brand);
    if (brand) {
      brandName.innerHTML = `<h3 class=" pb-1 text-[20px] font-semibold" id="${brand}">${brand}</h3>`;
      productsRender(brand)
    } else {
      console.error("No brand found in URL");
    }
  }
  
async function productsRender(brand) {
      const products = await getBrandProduct(brand);
      console.log(products);
      products.map((product) => {
        productsSection.innerHTML += `<div class="flex flex-col items-center gap-3">
          <div class="bg-[#F3F3F3] rounded-[24px] p-5">
            <img src="${product.imageURL[0]}" alt="" />
          </div>
          <div class="self-start">
            <h3 class="font-bold text-[17px] truncate max-w-[170px]">${product.name}</h3>
            <h3 class="font-medium text-[15px]">$ ${product.price}</h3>
          </div>
        </div>`;
      });
  }
