const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios')

const metaweather = require('./metaweather')

app.use(bodyParser.json())
app.get('/location/latlong', async (req, res) => {
  const { latitude, longitude } = req.query
  const { data: locations } = await metaweather.getLocationFromLatLong(axios, {
    latitude,
    longitude,
  })
  res.json({ locations })
})
app.get('/location/query', async (req, res) => {
  const { q } = req.query
  const { data: locations } = await metaweather.getLocationFromString(axios, q)
  res.json({ locations })
})
app.get('/forecast/:woe', async (req, res) => {
  const { woe } = req.params
  const { data: forecast } = await metaweather.getForecastByWoe(axios, woe)
  res.json(forecast)
})

module.exports = app
