const base = 'http://www.metaweather.com/api/location'

export default {
  getLocationFromString: async (axios, str) => {
    await console.log('not implemented')
  },
  getLocationFromLatLong: (axios, { latitude, longitude }) => {
    return axios.get(`${base}/search/?lattlong=${latitude},${longitude}`)
  },
  getForecast: async (axios, woe) => {
    await console.log('not implemented')
  },
}
