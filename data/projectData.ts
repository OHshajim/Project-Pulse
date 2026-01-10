import API from "@/hooks/useAxios";

export const postProjectData = async (data) => {
    const res = await API.post(`/api/admin/projects`, data);
    return res;
};

export const getAllProjects = async (id : string) => {
    const res = await API.get(`/api/admin/projects/${id}`);
    return res.data;
};
