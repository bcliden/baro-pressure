const base = 'http://www.metaweather.com/api/location'

module.exports = {
  getLocationFromString: (axios, str) => {
    return axios.get(`${base}/api/location/search/?query=${str}`)
  },
  getLocationFromLatLong: (axios, { latitude, longitude }) => {
    return axios.get(`${base}/search/?lattlong=${latitude},${longitude}`)
  },
  getForecastByWoe: (axios, woe) => {
    return axios.get(`${base}/api/location/${woe}/`)
  },
}
