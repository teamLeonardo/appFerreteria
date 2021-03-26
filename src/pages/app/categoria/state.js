import instance from "../../../config.axios"

export const getDataCategori = async (id) => {
    try {
        if (id) {
            return (await instance.get(`/categorias/${id}`)).data
        }
        return (await instance.get(`/categorias/`)).data
    } catch (error) {
        throw error
    }
}
export const addCategoria = async (payload) => {
    try {
        return (await instance.post("/categorias", payload)).data
    } catch (error) {
        throw error
    }
}
export const editCategoria = async (id, payload) => {
    try {
        return (await instance.put("/categorias/" + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletCategoria = async (id) => {
    try {
        return (await instance.delete("/categorias/" + id)).data
    } catch (error) {
        throw error
    }
}