<script>
import Footer from './components/common/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer
  },
  mounted() {
  },
  created() {
    window.addEventListener('scroll', this.DisplayBackTopOnScroll);
    this.ScrollToTopEvent();
  },
  methods: {
    ScrollToTopEvent() {
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
  @import './assets/css/_style.scss';
  @import './assets/css/loading.scss';
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <Footer/>

    <a href="#" :click="ScrollToTopEvent">
      <i class="material-icons" id="back_to_top">arrow_upward</i>
    </a>
    
  </div>
</template>
