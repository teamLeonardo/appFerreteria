import instance from "../../../config.axios"

const RUTA1 = "/ingresos/"
const RUTA2 = "/detalle-ingresos/"

export const getDataCompra = async (id) => {
    try {
        if (id) {
            return (await instance.get(`${RUTA1}${id}`)).data
        }
        return (await instance.get(RUTA1)).data
    } catch (error) {
        throw error
    }
}
export const addCompra = async (payload) => {
    try {
        return (await instance.post(RUTA1, payload)).data
    } catch (error) {
        throw error
    }
}
export const editCompra = async (id, payload) => {
    try {
        return (await instance.put(RUTA1 + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletCompra = async (id) => {
    try {
        return (await instance.delete(RUTA1 + id)).data
    } catch (error) {
        throw error
    }
}
///

export const getDataDetaillCompra = async (id) => {
    try {
        if (id) {
            return (await instance.get(`${RUTA2}${id}`)).data
        }
        return (await instance.get(RUTA2)).data
    } catch (error) {
        throw error
    }
}
export const addDetaillCompra = async (payload) => {
    try {
        return (await instance.post(RUTA2, payload)).data
    } catch (error) {
        throw error
    }
}
export const editDetaillCompra = async (id, payload) => {
    try {
        return (await instance.put(RUTA2 + id, payload)).data
    } catch (error) {
        throw error
    }
}
export const deletDetaillCompra = async (id) => {
    try {
        return (await instance.delete(RUTA2 + id)).data
    } catch (error) {
        throw error
    }
}
