<template>
  <div>
    <h1>Your forecast:</h1>
    <ul>
      <li>{{ woe }}</li>
    </ul>
    {{ forecast }}
  </div>
</template>

<script>
import { metaweather } from '@/services'
/* eslint-disable camelcase */
export default {
  async asyncData({ query, redirect, $axios }) {
    const { woe } = query
    if (!woe) {
      redirect('/')
    }
    // axios call for forecast
    const forecast = await $axios.get(`${metaweather.api}/location`)
    return { woe, forecast: JSON.stringify(forecast) }
  },
}
</script>

<style></style>
