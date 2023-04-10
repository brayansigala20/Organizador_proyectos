import axios from 'axios'

const clientesAxios = axios.create({
    baseURL:  `${import.meta.env.VITE_URL_BACKEND}/api`
})
 export default clientesAxios