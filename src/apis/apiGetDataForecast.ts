import { APIKEY } from "../constants/variable";
import { TypeForecast } from "../types/typeWeatherForecast";
import api from "./apiUtil";

export const apiGetDataForecast = async (lat: any, lon: any) => {
    try {
        const response = await api.get<TypeForecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
        return response.data

    }
    catch (error: any) {
        throw Error(error)
    }
}