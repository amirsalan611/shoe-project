// import { accessToken, API_KEY, baseURL } from "../../../../services/utils.js";
import { getAllProducts } from "../getProducts.js";
import { wishlistGetProducts } from "./wishlistGetProducts.js";

const loadingSection = document.getElementById("loading")
const productsSection = document.getElementById("productsSection")
const backArrow = document.getElementById("backArrow");

renderProducts()
async function renderProducts() {
    loadingSection.classList.remove("hidden")

    const wishlistProducts = await wishlistGetProducts()
    const allProducts = await getAllProducts()
    const products = wishlistProducts.map((product) => {
        const myProduct = allProducts.find(item=>item.id === product.product_id)
        return myProduct
    });
    console.log(products);

    products.map((product)=>{
        productsSection.innerHTML += `<div onclick="productPage(${product.id})" class="flex flex-col items-center gap-3 relative">
                    <div class="bg-[#F3F3F3] rounded-[24px] p-5">
                        <img src="${product.imageURL[0]}" alt="">
                    </div>
                    <div class="self-start">
                        <h3 class="font-bold truncate max-w-[170px] pb-2">${product.name}</h3>
                        <div class="relative">
                            <div class="flex gap-2 items-center">
                            <img src="../../../../assets/svg/star.svg" alt="" class="w-5">
                            <h3>4.6</h3>
                            <div class="w-0 h-4 border-l-[1px] border-gray-800"></div>
                            <button class="py-1 px-2 bg-gray-200 rounded-md text-[12px]"> 6.641 sold </button>
                            </div>
                            </div>
                        <h3>$ ${product.price}</h3>
                    </div>
                    <div class="absolute right-3 top-3 w-8 h-8 bg-[#343A40] rounded-full flex justify-center items-center">
                        <img src="../../../../assets/images/icons8-love-52.png" alt="love icon" class="w-6">
                    </div>
                </div>`
    })
    loadingSection.classList.add("hidden")

}

function productPage(productId) {
    console.log(productId);
    window.location.href = `../product-page/product-page.html?productId=${encodeURIComponent(productId)}`;
}
window.productPage = productPage;

backArrow.addEventListener("click", () => {
    history.back();
  });
