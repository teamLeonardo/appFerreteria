import axios from "axios";

// export const BASEURL = 'https://app-kamt.herokuapp.com/'
export const BASEURL = 'http://localhost:1337/'
const instance = axios.create({
    baseURL: BASEURL,
});

export const externalAxios = axios.create({
    baseURL: BASEURL,
})
export default instance