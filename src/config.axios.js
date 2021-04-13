import axios from "axios";

export const BASEURL = 'https://app-kamt.herokuapp.com/'

const instance = axios.create({
    baseURL: BASEURL,
});

export const externalAxios = axios.create({
    baseURL: BASEURL,
})
export default instance