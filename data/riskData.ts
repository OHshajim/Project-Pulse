import API from "@/hooks/useAxios";

export const postRiskData = async (data) => {
    const res = await API.post(`/api/admin/risks`, data);
    return res;
};

export const getAllRisks = async (id: string) => {
    const res = await API.get(`/api/admin/risks/${id}`);
    return res.data;
};
