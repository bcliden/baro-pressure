<template>
  <b-input-group class="mt-3">
    <template #append>
      <b-button variant="info" @click="geolocate">
        <b-icon-geo title="geolocate" />
      </b-button>
      <b-button variant="success" @click="$emit('submit', location)"
        >Submit</b-button
      >
    </template>
    <b-form-input
      v-model="location"
      placeholder="Enter your location..."
      @keypress.enter="$emit('submit', location)"
    ></b-form-input>
  </b-input-group>
</template>

<script>
import { BIconGeo } from 'bootstrap-vue'
// import { metaweather } from '@/services'

export default {
  components: {
    BIconGeo,
  },
  data() {
    return {
      location: '',
      buttonStatus: 'idle',
      buttonStatusEnum: Object.freeze({
        IDLE: 'idle',
        LOADING: 'loading',
        ERROR: 'error',
      }),
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
      let data = {}
      try {
        data = await this.promiseGeolocation()
      } catch (err) {
        alert('Geolocation failed. Please enter manually or give permission.')
        this.location = ''
        return
      }
      const trim = (str) => {
        return Number.parseFloat(str).toFixed(4)
      }
      const latitude = trim(data.coords.latitude)
      const longitude = trim(data.coords.longitude)

      this.location = `${latitude},${longitude}`
      this.$emit('submit', location)
    },
  },
}
</script>

<style></style>
