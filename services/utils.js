export const baseURL = "http://api.alikooshesh.ir:3000";
export const API_KEY = "9f20T03VzN9oF3aYWJ646BdhCpbXjqzQPDO48b9b4wHYPUBnSWfKylvvwt6fg42peGkbAiyJbNXaJDmFTGFUZ106wKi6BWBsnX0cNCvAX8OromPieqpk8n97GNg6A3e3"
export const accessToken = ()=>{
    const token = localStorage.getItem("token")
    return token
}
