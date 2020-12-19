<template>
  <b-input-group class="mt-3">
    <template #append>
      <b-button variant="info" @click="geolocate">
        <b-icon-geo title="geolocate" />
      </b-button>
      <b-button variant="success" @click="search">Submit</b-button>
    </template>
    <b-form-input
      v-model="location"
      placeholder="Enter your location..."
      @keypress.enter="search"
    ></b-form-input>
  </b-input-group>
</template>

<script>
import { BIconGeo } from 'bootstrap-vue'

export default {
  components: {
    BIconGeo,
  },
  data() {
    return {
      location: '',
      // buttonStatus: 'idle',
      // buttonStatusEnum: Object.freeze({
      //   IDLE: 'idle',
      //   LOADING: 'loading',
      //   ERROR: 'error',
      // }),
    }
  },
  methods: {
    promiseGeolocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (data) => resolve(data),
          (error) => reject(error)
        )
      })
    },

    async geolocate() {
      let locationData = {}
      try {
        locationData = await this.promiseGeolocation()
      } catch (err) {
        alert('Geolocation failed. Please enter manually or give permission.')
        this.location = ''
        return
      }
      const trim = (str) => {
        return Number.parseFloat(str).toFixed(4)
      }
      const latitude = trim(locationData.coords.latitude)
      const longitude = trim(locationData.coords.longitude)

      this.location = `${latitude},${longitude}`

      const { data } = await this.$axios.get('/api/location/latlong', {
        params: {
          latitude,
          longitude,
        },
      })
      this.$emit('submit', data.locations[0])
    },

    async search() {
      const { data } = await this.$axios.get('/api/location/query', {
        params: {
          q: this.location.trim(),
        },
      })
      this.$emit('submit', data.locations[0])
    },
  },
}
</script>

<style></style>
