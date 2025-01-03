import { getAllProducts } from "./getProducts.js";
import { BrandNameHandler } from "./brand-page/brandPage.js";''
const productsSection = document.getElementById("productsSection")


renderProducts()
async function renderProducts() {

    const products = await getAllProducts()
    console.log(products);
    products.map((product)=>{
        productsSection.innerHTML+=`<div class="flex flex-col items-center gap-3">
                <div class="bg-[#F3F3F3] rounded-[24px] p-5">
                    <img src="${product.imageURL}" alt="">
                </div>
                <div class="self-start px-2">
                    <h3 class="font-bold text-[17px] truncate max-w-[170px]">${product.name}</h3>
                    <h3 class="font-medium text-[15px]">$ ${product.price}</h3>
                </div>
            </div>`
    })
}

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
