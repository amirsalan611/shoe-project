import { baseURL , API_KEY } from "../../../services/utils.js";
const incorrectAlert = document.getElementById("incorrect") 

export async function loginUser(email,password) {
    try{
        const response = await fetch(`${baseURL}/api/users/login`,{
            method: "POST",
            headers:{
                api_key : API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        })
    
        if (!response.ok) {
            incorrectAlert.classList.remove("hidden")
            return false
        }
        const result = await response.json()
        if (result && result.accessToken) {
            localStorage.setItem("token",result.accessToken)
            return true
        }

        return false
    }
    catch(err){
        console.log(err)
        return false
    }

}
