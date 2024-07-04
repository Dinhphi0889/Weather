import { APIKEY } from "../constants/variable";
import { TypeWeather } from "../types/typeWeather";
import api from "./apiUtil";

export const apiGetData = async (country: any) => {
    try {
        const response = await api.get<TypeWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${country}&APPID=${APIKEY}`)
        return response.data
    }
    catch (error: any) {
        throw Error(error)
    }
}