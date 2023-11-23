import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.VITE_BACKEND_URL}/api`
})

export default clienteAxios;