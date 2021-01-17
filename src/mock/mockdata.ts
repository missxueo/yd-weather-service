import { WeatherRealtimeThridModel, WeatherForecastThirdModel } from "../business/weather/consumers/weatherTask.consumer";
import * as dayJs from 'dayjs';

export const real: WeatherRealtimeThridModel = {
  air_quality: {
    desc: '空气良好',
    value: 3,
  },
  temperature: 15,
  humidity: 10,
  skycon: 'NO_CLOUD',
  rain: 23,
  wind: {
    level: 1,
    direction: 'w2e',
  }
}

const today = dayJs();

export const forecasts: WeatherForecastThirdModel[] = [
  {
    air_quality: {
      desc: '空气良好',
      value: 3,
    },
    temperature: {
      higher: 19,
      lower: 1,
    },
    humidity: 10,
    skycon: 'NO_CLOUD',
    rain: 23,
    wind: {
      level: 1,
      direction: 'w2e',
    },
    date: new Date().getTime(),
  },
  // {
  //   air_quality: {
  //     desc: '空气良好',
  //     value: 3,
  //   },
  //   temperature: {
  //     higher: 19,
  //     lower: 1,
  //   },
  //   humidity: 10,
  //   skycon: 'NO_CLOUD',
  //   rain: 23,
  //   wind: {
  //     level: 1,
  //     direction: 'w2e',
  //   },
  //   date: today.clone().add(1, 'day').toDate().getTime(),
  // },
  // {
  //   air_quality: {
  //     desc: '空气良好',
  //     value: 3,
  //   },
  //   temperature: {
  //     higher: 19,
  //     lower: 1,
  //   },
  //   humidity: 10,
  //   skycon: 'NO_CLOUD',
  //   rain: 23,
  //   wind: {
  //     level: 1,
  //     direction: 'w2e',
  //   },
  //   date: today.clone().add(2, 'day').toDate().getTime(),
  // },
  // {
  //   air_quality: {
  //     desc: '空气良好',
  //     value: 3,
  //   },
  //   temperature: {
  //     higher: 19,
  //     lower: 1,
  //   },
  //   humidity: 10,
  //   skycon: 'NO_CLOUD',
  //   rain: 23,
  //   wind: {
  //     level: 1,
  //     direction: 'w2e',
  //   },
  //   date: today.clone().add(3, 'day').toDate().getTime(),
  // },
]

