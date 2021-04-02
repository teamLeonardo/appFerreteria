import instance from "../../../config.axios"

export const getDataProvedor = async (id) => {
    try {
        if (id) {
            return (await instance.get(`/provedors/${id}`)).data
        }
        return (await instance.get(`/provedors/`)).data
    } catch (error) {
        throw error
    }
}
export const addProvedor = async (payload) => {
    try {
        return (await instance.post("/provedors", payload)).data
    } catch (error) {
        throw error
    }
}
export const editProvedor = async (id, payload) => {
    try {
        return (await instance.put("/provedors/" + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletProvedor = async (id) => {
    try {
        return (await instance.delete("/provedors/" + id)).data
    } catch (error) {
        throw error
    }
}