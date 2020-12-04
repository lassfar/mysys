<script>
import Footer from './components/commun/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer
  },
  mounted() {
    window.addEventListener('scroll', this.DisplayBackTopOnScroll);
  },
  created() {
    this.ScrollToTop();
  },
  methods: {
    ScrollToTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    DisplayBackTopOnScroll() {
      let btnTop = document.getElementById('back_to_top');
      if (window.scrollY > 500) {
        btnTop.style.display = "inline-block";
      } else {
        btnTop.style.display = "none";
      }
    },
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

    <a href="#" :click="ScrollToTop">
      <i class="material-icons" id="back_to_top">arrow_upward</i>
    </a>
    
  </div>
</template>
