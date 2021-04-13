import instance from "../../../config.axios"

const RUTA1 = "/ventas/"
const RUTA2 = "/detalle-ventas/"

export const getDataVenta = async (id) => {
    try {
        if (id) {
            return (await instance.get(`${RUTA1}${id}`)).data
        }
        return (await instance.get(RUTA1)).data
    } catch (error) {
        throw error
    }
}
export const addVenta = async (payload) => {
    try {
        return (await instance.post(RUTA1, payload)).data
    } catch (error) {
        throw error
    }
}
export const editVenta = async (id, payload) => {
    try {
        return (await instance.put(RUTA1 + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletVenta = async (id) => {
    try {

        return (await instance.delete(RUTA1 + "all/" + id)).data

    } catch (error) {
        throw error
    }
}
///

export const getDataDetaillVenta = async (id) => {
    try {
        if (id) {
            return (await instance.get(`${RUTA2}venta/${id}`)).data
        }
        return (await instance.get(RUTA2)).data
    } catch (error) {
        throw error
    }
}

export const addDetaillVenta = async (payload) => {
    try {
        return (await instance.post(RUTA2, payload)).data
    } catch (error) {
        throw error
    }
}
export const editDetaillVenta = async (id, payload) => {
    try {
        return (await instance.put(RUTA2 + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletDetaillVenta = async (id) => {
    try {
        return (await instance.delete(RUTA2 + id)).data
    } catch (error) {
        throw error
    }
}
