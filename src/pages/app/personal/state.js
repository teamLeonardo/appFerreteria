import instance from "../../../config.axios"

export const getDataPersonal = async (id) => {
    try {
        if (id) {
            return (await instance.get(`/trabajadors/${id}`)).data
        }
        return (await instance.get(`/trabajadors/`)).data
    } catch (error) {
        throw error
    }
}
export const addPersonal = async (payload) => {
    try {
        return (await instance.post("/trabajadors", payload)).data
    } catch (error) {
        throw error
    }
}
export const editPersonal = async (id, payload) => {
    try {
        return (await instance.put("/trabajadors/" + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletPersonal = async (id) => {
    try {
        return (await instance.delete("/trabajadors/" + id)).data
    } catch (error) {
        throw error
    }
}