import { accessToken, API_KEY, baseURL } from "../../../services/utils.js";
const loadingSection = document.getElementById("loading")


export async function brandHandler(brand) {

    // loadingSection.classList.remove("hidden")

    try {
        
        const response = await fetch(`${baseURL}/api/records/products?filterKey=brand&filterValue=${brand}`,{
            method: "GET",
            headers:{
                api_key:API_KEY,
                Authorization:`Bearer ${accessToken()}`
            },
        })

        if (!response.ok) {
            if (response.status === 403) {
                localStorage.removeItem("token")
                location.href = "../log-in/log-in.html"
            }
            throw new Error("response is not ok!");
        }

        const result = await response.json()
        // loadingSection.classList.add("hidden")
        return result.records
    } catch (error) {
        console.log(`from cath ${error.message}`);
        // loadingSection.classList.add("hidden")
    }
}
