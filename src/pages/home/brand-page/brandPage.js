import { getBrandProduct } from "./brandProducts.js";

const brandName = document.getElementById("brandName");
const backBtn = document.getElementById("back");
const productsSection = document.getElementById("productsSection");
const brandCards = document.querySelectorAll("#brandBox > div");

console.log(brandCards);

BrandNameHandler();
export async function BrandNameHandler() {
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

// export async function productsRender(brand) {
//     const products = await getBrandProduct(brand);
//     console.log(products);
//     products.map((product) => {
//       productsSection.innerHTML += `<div class="flex flex-col items-center gap-3">
//         <div class="bg-[#F3F3F3] rounded-[24px] p-5">
//           <img src="${product.imageURL}" alt="" />
//         </div>
//         <div class="self-start">
//           <h3 class="font-bold text-[17px] truncate max-w-[170px]">${product.name}</h3>
//           <h3 class="font-medium text-[15px]">$ ${product.price}</h3>
//         </div>
//       </div>`;
//     });
// }

export async function productsRender(brand) {
    const products = await getBrandProduct(brand);
    console.log(products);
    if (products && products.length > 0) {
        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('flex', 'flex-col', 'items-center', 'gap-3');

            const productDetails = `
                <div class="bg-[#F3F3F3] rounded-[24px] p-5">
                    <img src="${product.imageURL}" alt="${product.name}" />
                </div>
                <div class="self-start">
                    <h3 class="font-bold text-[17px] truncate max-w-[170px]">${product.name}</h3>
                    <h3 class="font-medium text-[15px]">$ ${product.price}</h3>
                </div>
            `;
            productDiv.innerHTML = productDetails;
            productsSection.appendChild(productDiv);
        });
    } else {
        console.error("No products found for the brand:", brand);
    }
}


// backBtn.addEventListener('click',()=>{
//     window.location.href="../home.html"
// })

// backBtn.addEventListener('click', () => {
//     history.back();
// });
