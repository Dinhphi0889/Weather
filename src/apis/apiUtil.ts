import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?q=Algeria&APPID=e1655525936d891f89f245b8dda07fa7'
})

api.interceptors.request.use((config: any) => {
    return config
})
export default api