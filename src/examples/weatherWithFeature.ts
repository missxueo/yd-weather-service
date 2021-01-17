
export const WEATHER_WITH_FORECAST = `{
  "code": 200,
  "data": {
    "real": {
      "areaCode": "101210101",
      "realTemperature": 15,
      "weatherType": "NO_CLOUD",
      "windLevel": 1,
      "windDirection": "w2e",
      "airQualityType": "空气良好",
      "airQualityValue": 3,
      "airHumidity": 10,
      "rainPercent": null
    },
    "forecast": [
      {
        "areaCode": "101210101",
        "temperatureLowest": 1,
        "temperatureHighest": 19,
        "weatherType": "NO_CLOUD",
        "windLevel": 1,
        "windDirection": "w2e",
        "airQualityType": "空气良好",
        "airQualityValue": 3,
        "airHumidity": 10,
        "rainPercent": null,
        "forecastDate": "2021-01-16T16:00:00.000Z"
      }
    ]
  },
  "msg": "success"
}`

export const WEATHER_PURE = `{
  "code": 200,
  "data": {
    "areaCode": "101210101",
    "airHumidity": 10,
    "realTemperature": 15,
    "weatherType": "NO_CLOUD",
    "windLevel": 1,
    "windDirection": "w2e",
    "airQualityValue": 3,
    "airQualityType": "空气良好"
  },
  "msg": "success"
}`