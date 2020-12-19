const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios')

const metaweather = require('./metaweather')

app.use(bodyParser.json())
app.get('/location', async (req, res) => {
  const { latitude, longitude } = req.query
  const { data: locations } = await metaweather.getLocationFromLatLong(axios, {
    latitude,
    longitude,
  })
  res.json({ locations })
})

module.exports = app
