import axios from "axios";

export const Login = async(data:any)=>{
    const res = await axios.post("/api/auth/login", data)
    return res.data
}
export const Register = async(data:any)=>{
    const res = await axios.post("/api/auth/register", data)
    return res.data
}