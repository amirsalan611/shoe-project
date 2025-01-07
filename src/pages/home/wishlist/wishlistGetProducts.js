import { accessToken, API_KEY, baseURL } from "../../../../services/utils.js";

export async function wishlistGetProducts() {
    try {
    
    const response = await fetch(`${baseURL}/api/records/wishlist`,{
        method:"GET",
        headers:{
            api_key: API_KEY,
            Authorization: `Bearer ${accessToken()}`,
          }
    })
    if (!response.ok) {
        if (response.status === 403) {
            localStorage.removeItem("token");
            window.location.href="../../log-in/log-in.html"
        }
        throw new Error("response is not ok!");
    }
    const result = await response.json()
    return result.records
} catch (error) {
    console.log(`from catch ${error.message}`);
    loadingSection.classList.add("hidden")
}}
