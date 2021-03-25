import instance from "../../../config.axios"

export const getDataCliente = async (id) => {
    try {
        if (id) {
            return (await instance.get(`/clientes/${id}`)).data
        }
        return (await instance.get(`/clientes/`)).data
    } catch (error) {
        throw error
    }
}
export const addCliente = async (payload) => {
    try {
        return (await instance.post("/clientes", payload)).data
    } catch (error) {
        throw error
    }
}
export const editClient = async (id, payload) => {
    try {
        return (await instance.put("/clientes/" + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletClient = async (id) => {
    try {
        return (await instance.delete("/clientes/" + id)).data
    } catch (error) {
        throw error
    }
}