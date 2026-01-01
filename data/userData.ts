import API from "@/hooks/useAxios"

export const getUserData = async(id : string)=>{
    const res = await API.get(`api/admin/user/${id}`)
    return res.data
}
export const updateUserData = async({id,data})=>{
    const res = await API.put(`api/admin/user/${id}`,data)
    return res.data
}
export const postUserData = async(data)=>{
    const res = await API.post(`api/admin/user`,data)
    return res.data
}
export const deleteUserData = async(id : string)=>{
    const res = await API.delete(`api/admin/user/${id}`)
    return res.data
}