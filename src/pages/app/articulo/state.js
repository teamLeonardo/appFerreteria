import instance from "../../../config.axios"

export const getDataArticulo = async (id) => {
    try {
        if (id) {
            return (await instance.get(`/articulos/${id}`)).data
        }
        return (await instance.get(`/articulos/`)).data
    } catch (error) {
        throw error
    }
}
export const getDataExtra = async () => {
    try {
        return {
            presentacion: (await instance.get(`/presentacions/`)).data,
            categoria: (await instance.get(`/categorias/`)).data
        }
    } catch (error) {
        throw error
    }
}
export const addArticulo = async (payload) => {
    try {
        const { imagen: sad, ...resto } = payload
        const newImgAr = new FormData()
        newImgAr.append("files", sad[0].blobFile)
        const instImagen = (await instance.post("/upload", newImgAr, { headers: { "Content-Type": "multipart/form-data" } })).data
        return (await instance.post("/articulos/", { imagen: instImagen, ...resto })).data
    } catch (error) {
        throw error
    }
}
export const editArticulo = async (id, payload) => {
    try {
        const { imagen, oldData, ...resto } = payload
        if (imagen.fileKey === undefined) {
            const newImgAr = new FormData()
            newImgAr.append("files", imagen[0].blobFile)
            const instImagen = (await instance.post("/upload", newImgAr, { headers: { "Content-Type": "multipart/form-data" } })).data
            return (await instance.put("/articulos/" + id, { imagen: instImagen, ...resto })).data
        }
        return (await instance.put("/articulos/" + id, { imagen: { ...imagen, ...oldData }, ...resto })).data
    } catch (error) {
        throw error
    }
}
export const deletArticulo = async (id) => {
    try {
        return (await instance.delete("/articulos/" + id)).data
    } catch (error) {
        throw error
    }
}