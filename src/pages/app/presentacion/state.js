import instance from "../../../config.axios"

export const getDataPresentacion = async (id) => {
    try {
        if (id) {
            return (await instance.get(`/presentacions/${id}`)).data
        }
        return (await instance.get(`/presentacions/`)).data
    } catch (error) {
        throw error
    }
}
export const addPresentacion = async (payload) => {
    try {
        return (await instance.post("/presentacions", payload)).data
    } catch (error) {
        throw error
    }
}
export const editPresentacion = async (id, payload) => {
    try {
        return (await instance.put("/presentacions/" + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletPresentacion = async (id) => {
    try {
        return (await instance.delete("/presentacions/" + id)).data
    } catch (error) {
        throw error
    }
}