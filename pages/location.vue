<template>
  <div>
    <h1>Your forecast:</h1>
    <ul>
      <li>{{ name }}</li>
      <li>{{ woe }}</li>
    </ul>
    <code>{{ forecast }}</code>
    <baro-chart v-if="!!forecast" :forecast="forecast"></baro-chart>
  </div>
</template>

<script>
import BaroChart from '@/components/BaroChart.vue'

export default {
  components: {
    BaroChart,
  },
  async asyncData({ query, $axios }) {
    const { woe } = query
    const { data } = await $axios.get(`/api/forecast/${woe}`)

    return {
      forecast: data,
      woe,
      name: data.title,
    }
  },
  data() {
    return {
      name: 'unknown',
      woe: '123456789',
      forecast: 'snow, doink',
    }
  },
}
</script>

<style></style>
