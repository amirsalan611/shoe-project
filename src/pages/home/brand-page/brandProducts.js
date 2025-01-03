import { baseURL,API_KEY,accessToken } from "../../../../services/utils.js"


export async function getBrandProduct(brand) {
    const brandName = brand.toUpperCase()
    console.log(brandName);
    try {
        const response = await fetch(`${baseURL}/api/records/products?filterKey=brand&filterValue=${brandName}`,{
            method:'GET',
            headers:{
                api_key:API_KEY,
                Authorization:`Bearer ${accessToken()}`
            }
        })

        if (!response.ok) {
            if (response.status === 403) {
                location.href = "../../log-in/log-in.html"
            }
            throw new Error("response is not ok!");
        }

        const result = await response.json()
        console.log(result.records);
        return result.records
    }catch(error){
        console.log(`from cath${error.message}`);
    }
}
