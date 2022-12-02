<template>
  <app-header />
  <router-view />
  <user-msg />
</template>

<script>
import appHeader from './components/app-header.vue'
import userMsg from './components/user-msg.vue';
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    appHeader,
    userMsg
  },
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
}
</script>

<style>
</style>