import { Drizzle, Hot, Mostly_Sunny, Partly_Cloudy, Partly_Cloudy_Night, Rain, Rainy, Strong_Wind, Sunny, Thunderstorm, Tornado, Windy } from './importImg'
import './homePage.scss'
import { useEffect, useState } from 'react'
import { List, TypeForecast } from '../types/typeWeatherForecast'
import moment from 'moment'
export default function WeatherForecast(props: TypeForecast | any) {

    const [forecastDayOne, setForecastDayOne] = useState<List>()
    const [forecastDayTwo, setForecastDayTwo] = useState<List>()
    const [forecastDayThree, setForecastDayThree] = useState<List>()
    const [forecastDayFour, setForecastDayFour] = useState<List>()
    const [forecastDayFive, setForecastDayFive] = useState<List>()
    useEffect(() => {
        handleRenderData()
    }, [props.dataForecast])

    const handleRenderData = () => {
        console.log(props.dataForecast)
        const dayOne: any = []
        const dayTwo: any = []
        const dayThree: any = []
        const dayFour: any = []
        const dayFive: any = []

        const timeNow = new Date()

        // console.log(props.dataForecast)
        if (props.dataForecast) {
            props.dataForecast.list.map((itemsList: List) => {
                const unixTime = itemsList.dt
                // moment(itemsList.dt_txt).format('YYYY-MM-DD')
                // console.log(itemsList.dt_txt)
                const dateForecast = new Date(unixTime * 1000)

                if (dateForecast.getDay() - timeNow.getDay() === 1) {
                    dayOne.push(itemsList)
                } else if (dateForecast.getDate() - timeNow.getDate() === 2) {
                    dayTwo.push(itemsList)
                } else if (dateForecast.getDate() - timeNow.getDate() === 3) {
                    dayThree.push(itemsList)
                } else if (dateForecast.getDate() - timeNow.getDate() === 4) {
                    dayFour.push(itemsList)
                } else if (dateForecast.getDate() - timeNow.getDate() === 5) {
                    dayFive.push(itemsList)
                }
            })
        }
        setForecastDayOne(dayOne[4])
        setForecastDayTwo(dayTwo[4])
        setForecastDayThree(dayThree[4])
        setForecastDayFour(dayFour[4])
        setForecastDayFive(dayFive[4])
    }
    console.log("day1", forecastDayOne?.main)
    console.log("day2", forecastDayTwo)
    console.log("day3", forecastDayThree)
    console.log("day4", forecastDayFour)
    console.log("day5", forecastDayFive)




    return (<>
        <div className="infor-forecast flex items-center justify-between">
            <div className='flex items-center'>
                <img src={Sunny} width={55}></img>
                <span className='temps-forecast text-lg'>+29°/<span className='temps-mini text-sm'>+18</span></span>
            </div>
            <span className='month-forecast text-xs'>25 July</span>
            <span className='day-forecast text-xs mr-3'>Thursday</span>
        </div>
        <div className="infor-forecast flex items-center justify-between">
            <div className='flex items-center'>
                <img src={Sunny} width={55}></img>
                <span className='temps-forecast text-lg'>+29°/<span className='temps-mini text-sm'>+18</span></span>
            </div>
            <span className='month-forecast text-xs'>25 July</span>
            <span className='day-forecast text-xs mr-3'>Thursday</span>
        </div>
        <div className="infor-forecast flex items-center justify-between">
            <div className='flex items-center'>
                <img src={Sunny} width={55}></img>
                <span className='temps-forecast text-lg'>+29°/<span className='temps-mini text-sm'>+18</span></span>
            </div>
            <span className='month-forecast text-xs'>25 July</span>
            <span className='day-forecast text-xs mr-3'>Thursday</span>
        </div>
        <div className="infor-forecast flex items-center justify-between">
            <div className='flex items-center'>
                <img src={Sunny} width={55}></img>
                <span className='temps-forecast text-lg'>+29°/<span className='temps-mini text-sm'>+18</span></span>
            </div>
            <span className='month-forecast text-xs'>25 July</span>
            <span className='day-forecast text-xs mr-3'>Thursday</span>
        </div>
        <div className="infor-forecast flex items-center justify-between">
            <div className='flex items-center'>
                <img src={Sunny} width={55}></img>
                <span className='temps-forecast text-lg'>+29°/<span className='temps-mini text-sm'>+18</span></span>
            </div>
            <span className='month-forecast text-xs'>25 July</span>
            <span className='day-forecast text-xs mr-3'>Thursday</span>
        </div>
    </>

    )
}
