import { baseURL, API_KEY, accessToken } from "../../../../services/utils.js";
const loadingSection = document.getElementById("loading")


export async function getBrandProduct(brand) {
  const brandName = brand.toUpperCase();
  console.log(brandName);

  loadingSection.classList.remove("hidden");

  try {
    const response = await fetch(
      `${baseURL}/api/records/products?filterKey=brand&filterValue=${brandName}`,
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
        localStorage.removeItem("token")
        location.href = "../../log-in/log-in.html";
      }
      throw new Error("response is not ok!");
    }

    const result = await response.json();
    loadingSection.classList.add("hidden");

    console.log(result.records);
    return result.records;
  } catch (error) {
    console.log(`from cath${error.message}`);
    loadingSection.classList.add("hidden");

  }
}
