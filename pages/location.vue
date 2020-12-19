<template>
  <div>
    <h1>Your forecast:</h1>
    <ul>
      <li>{{ name }}</li>
      <li>{{ woe }}</li>
    </ul>
    <code>{{ forecast }}</code>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'unknown',
      woe: '123456789',
      forecast: 'snow, doink',
    }
  },
  async created() {
    const { woe } = this.$route.query
    const { data } = await this.$axios.get(`/api/forecast/${woe}`)

    this.forecast = JSON.stringify(data)
    this.woe = woe
    this.name = data.title
  },
}
</script>

<style></style>
