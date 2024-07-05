import { Button, Col, Row, Input, Dropdown, Space, MenuProps } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

import './homePage.scss'

import { Drizzle, Hot, Mostly_Sunny, Partly_Cloudy, Partly_Cloudy_Night, Rain, Rainy, Strong_Wind, Sunny, Thunderstorm, Tornado, Windy } from './importImg'

import { ReactNode, useEffect, useRef, useState } from 'react';
import api from '../apis/apiUtil';

import { apiGetData } from '../apis/apiGetData';
import { ChartWinds } from './ChartWinds';
import ChartSunTime from './ChartSunTime';
import { TypeWeather } from '../types/typeWeather';
import nameCountry from '../constants/nameCountry';
import { CalendarDays, Droplets, EyeOff, Gauge, Map } from 'lucide-react';
import { apiGetDataForecast } from '../apis/apiGetDataForecast';
import WeatherForecast from './WeatherForecast';
import { TypeForecast } from '../types/typeWeatherForecast';

export default function HomePage() {
    const style: React.CSSProperties = { padding: '10px' };
    const [data, setData] = useState<TypeWeather>()

    const [dataForecast, setDataForecast] = useState<TypeForecast>()

    const [country, setCountry] = useState('Vietnam')
    const [tempsNow, setTempsNow] = useState<any>()
    const [tempsMin, setTempsMin] = useState<any>()
    const [tempsMax, setTempsMax] = useState<any>()
    const [descWeather, setDescWeather] = useState<any>()
    const [timeNow, setTimeNow] = useState<any>()
    const [dateNow, setDateNow] = useState<any>()
    const [timezone, setTimeZone] = useState<any>()


    const handleOnClick = (values: any) => {
        setCountry(values)
    }
    const items: MenuProps['items'] = [
        {
            key: 1,
            label: (
                <div
                    style={{
                        height: '200px',
                        overflow: 'hidden',
                        overflowY: 'scroll',
                    }}>{nameCountry.map((name: any) => {
                        return <p className='nameCountry' onClick={() => { handleOnClick(name) }}>
                            {name}
                        </p>
                    })}</div>
            )
        }
    ]

    // callApi()
    const callApi = async () => {
        const result = await apiGetData(country)

        if (result) {
            // setIsLoading(false)
            setData(result)
        } else {
            alert("Can't found country")
        }
    }
    useEffect(() => {
        callApi()

    }, [country])

    const apiForecast = async () => {
        if (data) {
            const { lon, lat } = data?.coord
            const result = await apiGetDataForecast(lat, lon)
            setDataForecast(result)
        }
    }


    // handle convertTemps
    const convertTemps = (Celsius: any) => {
        const Kelvin = 273.15
        return Math.round(Celsius - Kelvin)
    }
    // handle convert to time GMT

    const handleRenderData = () => {
        if (data) {
            // Get temps
            const tempsNow = data.main.feels_like
            const calcTemps = convertTemps(tempsNow)
            const minTemps = convertTemps(data.main.temp_min)
            const maxTemps = convertTemps(data.main.temp_max)
            setTempsNow(calcTemps)
            setTempsMin(minTemps)
            setTempsMax(maxTemps)

            // Get desc weather
            const desc = data.weather[0].description
            setDescWeather(desc)

            // Get Time
            const unixTimes = data.dt
            const date = new Date(unixTimes * 1000)
            const dateSplit = String(date).split(" ")
            if (dateSplit) {
                setDateNow(dateSplit[1] + " " + dateSplit[2] + " " + dateSplit[3])
                setTimeNow(dateSplit[4])
                setTimeZone(dateSplit[5])
            }

        }
    }

    useEffect(() => {
        handleRenderData()
        apiForecast()

    }, [data])



    return (
        <div className='backgroundHome' style={{ height: '100vh' }}>
            <div className='container mx-auto'>
                <div className='information grid'>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col style={style} className='gutter-row' span={5}>
                            <div className='card card-weather'>
                                {/* card-weather-top */}
                                <div className='card-weather-top'>
                                    <img
                                        src={Partly_Cloudy_Night}
                                        style={{
                                            width: '130px',
                                            height: '100px',
                                            objectFit: 'cover'
                                        }} className='rounded-s-full'>

                                    </img>
                                    <div className='temperature mb-1'>{tempsNow}°C</div>

                                    <div className='desc flex items-center mb-2'>
                                        <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} width={50}></img>

                                        <span>{descWeather}</span>
                                    </div>

                                    <div className='temps-low-high flex justify-evenly mb-2 w-full'>
                                        <p className='temps-low'>Low <i className="fa-solid fa-temperature-arrow-down"></i>:  {tempsMin}°C
                                        </p>
                                        <p className='temps-high'>High <i className="fa-solid fa-temperature-arrow-up"></i>: {tempsMax}°C
                                        </p>
                                    </div>
                                </div>

                                {/* card-weather-bottom */}
                                <div className='card-weather-bottom ml-5'>
                                    <div className='location'>
                                        <i className="fa-solid fa-location-dot mr-3 mb-2"></i><span>{data?.name}</span>
                                    </div>

                                    <div className='calendar pb-5 flex items-center justify-between'>
                                        <div>
                                            <i className="fa-solid fa-calendar-days mr-2"></i><span>{dateNow}</span>
                                        </div>
                                        <div>
                                            <span className='mr-3'>
                                                <i className="fa-regular fa-clock"></i> {timeNow}
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </Col>
                        <Col style={style} span={19}>
                            <div className='today-highlight'>
                                <div className='flex items-center'>
                                    <h1 className='ml-3 pt-3 text-xs font-semibold '>Today's Highlight</h1>
                                    <Dropdown
                                        className='dropdown-menu'
                                        menu={{ items }}
                                        trigger={['click']}
                                    >
                                        <button className='dropdown-button text-xs mt-3 ml-10' onClick={(e) => e.preventDefault()}>
                                            <Space>{data?.name}
                                                <DownOutlined />
                                            </Space>
                                        </button>
                                    </Dropdown>
                                </div>

                                <div className='flex'>
                                    {/* Wind */}
                                    <div className='wind-status bg-card py-2 px-2'>
                                        <div className='wind-status-top'>
                                            <h1 className='tittle-today-highlight'>Wind Status</h1>
                                            <div className='chart'>
                                                <ChartWinds />
                                            </div>
                                        </div>
                                        <div className='wind-status-bottom flex items-center justify-between mt-3 mx-4'>
                                            <div className='wind-speeds text-lg'>
                                                <div>
                                                    <span className='text-xs'>speed:
                                                    </span> <span className='text-base'>{data?.wind.speed}<span className='wind-speeds-param'>m/s
                                                    </span></span>
                                                </div>
                                                <div>
                                                    <span className='text-xs'>Strongest Wind:
                                                    </span> <span className='text-base'>{data?.wind.gust}</span>
                                                    <span className='wind-speeds-param'>Km/h
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className='text-xs'>Wind Direction:
                                                    </span> <span className='text-base'>{data?.wind.deg}°</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Suntime */}
                                    <div className='suntime py-2 px-2 relative bg-card'>
                                        <h1 className=' tittle-today-highlight'>Sunrise & Sunset</h1>
                                        <div className='suntime-top flex items-center justify-center flex-col relative'>
                                            <div className='chart-sun-time w-full'>
                                                <ChartSunTime />
                                            </div>
                                            <div className='label-suntime-top flex justify-between w-full'>
                                                <div className='icon-suntime-top'>
                                                    <i className="fa-solid fa-cloud-sun">
                                                    </i>
                                                    <span>Sunrise</span>
                                                    <p>5:00 AM</p>
                                                </div>
                                                <div>
                                                    <span className='text-xs'>{timezone}
                                                    </span>
                                                </div>
                                                <div className='icon-suntime-top'>
                                                    <i className="fa-solid fa-cloud-moon"></i>
                                                    <span>Sunset</span>
                                                    <p>5:00 PM</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Other information */}
                                    <div className='other-information bg-card py-2 px-2'>
                                        <h1 className='tittle-today-highlight'>
                                            Other Information</h1>
                                        {/* Pressure */}
                                        <div className='pressure flex items-center'>
                                            <Gauge width={50} />
                                            <h2 className='tittle-information'>Atmospheric  Pressure: <span>{data?.main.pressure} hPa</span></h2>

                                        </div>
                                        {/* Humidity */}
                                        <div className='humidity flex items-center'>
                                            <Droplets width={50} />
                                            <h2 className='tittle-information'>Humidity: <span>{data?.main.humidity}%</span></h2>
                                        </div>
                                        {/* Visibility */}
                                        <div className='humidity flex items-center'>
                                            <EyeOff width={50} />
                                            <h2 className='tittle-information'>Visibility: <span>{data?.visibility}m</span></h2>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='flex justify-between w-3/6'>
                    <div className='flex'>
                        <CalendarDays className='mr-2' /><h1>7 Days Forecast</h1>
                    </div>
                    <div className='flex'>
                        <Map className='mr-2' /><h1>Weather Condition Map</h1>
                    </div>
                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='weather-bottom'>
                    <Col className='col-forecast' span={5} style={{ padding: '0' }}>
                        <div className='forecast'>
                            <WeatherForecast dataForecast={dataForecast}/>

                            {/* <div className="infor-forecast flex items-center justify-between">
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
                            </div> */}

                        </div>
                    </Col>
                    <Col span={19} className='map mt-3'>
                        <iframe src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${data?.coord.lat}&lon=${data?.coord.lon}&zoom=10`}
                            style={{ width: '100%', height: '300px' }}></iframe>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


