import {ForecastStateType} from 'types/StateTypes';
import {
  addNewCity,
  deleteCity,
  getCities,
  requestCurrentWeather,
  weatherReducer
} from 'store/reducers/WeatherReducer';


let initialState: {
  cities: string[],
  forecast: ForecastStateType,
};

beforeEach(() => {
  initialState = {
    cities: ['Madrid', 'Kiev', 'Berlin'] as string[],
    forecast: {} as ForecastStateType,
  }
})


test('correct city should be deleted', () => {
  const endState = weatherReducer(initialState, deleteCity('Madrid'))
  expect(endState.cities.length).toBe(2);
  expect(endState.cities[0]).toBe('Kiev');
});

test('correct city should be added', () => {
  const endState = weatherReducer(initialState, addNewCity('Moscow'))
  expect(endState.cities.length).toBe(4);
  expect(endState.cities[0]).toBe('Moscow');
  expect(endState.cities[3]).toBe('Berlin');
});


test('cities should be added', () => {
  const newCities = ['Mexico', 'Barcelona', 'Milan']
  const endState = weatherReducer(initialState, getCities(newCities))
  expect(endState.cities.length).toBe(3);
  expect(endState.cities[0]).toBe('Mexico');
  expect(endState.cities[2]).toBe('Milan');
});
//
test('forecast for city should be added', () => {
  const odessaForecast = {
    "coord": {"lon": 30.7326, "lat": 46.4775},
    "weather": [{
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }],
    "base": "stations",
    "main": {
      "temp": 25.93,
      "feels_like": 25.86,
      "temp_min": 25.93,
      "temp_max": 25.93,
      "pressure": 1007,
      "humidity": 49,
      "sea_level": 1007,
      "grnd_level": 1001
    },
    "visibility": 10000,
    "wind": {"speed": 3.82, "deg": 164, "gust": 2.53},
    "clouds": {"all": 75},
    "dt": 1659351188,
    "sys": {"country": "UA", "sunrise": 1659321458, "sunset": 1659374943},
    "timezone": 10800,
    "id": 698740,
    "name": "Odesa",
    "cod": 200
  }
  const city = 'Odessa'

  const endState = weatherReducer(initialState, requestCurrentWeather.fulfilled({
      forecast : odessaForecast, city
    },
    '', city))

  expect(endState.forecast[city]).toBeDefined();
  expect(endState.forecast[city].id).toBe(698740);
});
