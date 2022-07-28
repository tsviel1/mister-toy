<template>
  <app-header />
  <router-view />
</template>

<script>
import appHeader from './components/app-header.vue'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    appHeader
  },
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
}
</script>

<style>
</style>