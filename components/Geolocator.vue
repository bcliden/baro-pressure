<template>
  <b-input-group class="mt-3">
    <template #append>
      <b-button variant="info" @click="geolocate">
        <b-icon-geo title="geolocate" />
      </b-button>
      <b-button variant="success" @click="$emit(location)">Submit</b-button>
    </template>
    <b-form-input
      v-model="location"
      placeholder="Enter your location..."
      @keypress.enter="$emit(location)"
    ></b-form-input>
  </b-input-group>
</template>

<script>
import { BIconGeo } from 'bootstrap-vue'
import { metaweather } from '@/services'

export default {
  components: {
    BIconGeo,
  },
  data() {
    return {
      location: '',
    }
  },
  methods: {
    geolocate() {
      // make request
      navigator.geolocation.getCurrentPosition(
        async (data) => {
          const trim = (str) => {
            return Number.parseFloat(str).toFixed(4)
          }
          const latitude = trim(data.coords.latitude)
          const longitude = trim(data.coords.longitude)

          const d = await metaweather.getLocationFromLatLong(this.$axios, {
            latitude,
            longitude,
          })
          console.log({ d })
          // this.location = `${latitude},${longitude}`
          // setTimeout(() => {
          //   this.$emit('submit', this.location)
          // }, 500)
        },
        (err) => {
          alert('Geolocation failed. Please enter manually or give permission.')
          console.error(err)
        }
      )
    },
  },
}
</script>

<style></style>
