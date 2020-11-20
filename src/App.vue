<script>
import Footer from './components/commun/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style lang="scss">
  @import './assets/css/style.scss';
  @import './assets/css/loading.scss';
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <Footer/>
  </div>
</template>
