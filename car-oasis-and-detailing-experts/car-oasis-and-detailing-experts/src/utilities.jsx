import axios from "axios";

export const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/",
})

// export const signUp = async(email, full_name, number, password) => {
//     const response = await axios.post("api/users/signup/", {email, full_name, number, password})
//     console.log(response)
// }