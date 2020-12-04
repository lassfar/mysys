<script>
import Slick from 'vue-slick';

export default {
  name: 'OurSevice',
  components: {
    Slick
  },
  data() {
    return {
      slickOptions: {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      } // slick options

    } // return
  },
  methods: {
    beforeUpdate() {
      if (this.$refs.slick) {
        this.$refs.slick.destroy();
      }
    },
    updated() {
      this.$nextTick(function () {
        if (this.$refs.slick) {
          this.$refs.slick.create(this.slickOptions);
        }
      });
    },
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
          this.$refs.slick.reSlick();
      });
    },
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/service.scss';
  @import '/node_modules/slick-carousel/slick/slick.scss';
</style>


<template>
<div id="service">
  <div class="container-fluid">
    <div class="main-title">
      <span class="title">Nos Services</span>
    </div>
  </div>
  <!-- end-container -->

  <div class="container-fluid m-0 p-0">
    <slick ref="slick" :options="slickOptions">
      <!-- :style="{
        background: 'url('+require('../../assets/bg/analytic.jpg')+'),'+'no-repeat',
        backgroundSize: 'cover'
      }" -->
      <div class="service bg_gradient px-lg-5 px-4">
        <div class="col-lg-6 col-12 pr-lg-5">
          <div class="d-flex flex-column flex-nowrap">
            <h1 class="font-lg-s12 font-md-s12 font-sm-s11 font-xs-s8">Placement des ressources</h1>
          </div>
          <p class="h5 text_light text-justify">
            Nos offrons à nos clients un service de placement et de
            recrutement de personnel visant lʼexcellence.Les Entreprises
            ,Les freelancers, ou les chercheurs d'emploi permanent devraient
            trouver leur compte
          </p>
          <router-link to="/all-services/#pdr" class="btn btn-sm btn-light font-s2 ml-0 mt-2">savoir plus</router-link>
        </div>
        <div class="col-lg-6">
          <img src="../../assets/bg/placement-resource.jpg" alt="" class="service-img">
        </div>
      </div>
      
      <div class="service bg_gradient px-lg-5 px-4">
        <div class="col-lg-6">
          <img src="../../assets/bg/integration-erp.jpg" alt="" class="service-img">
        </div>
        <div class="col-lg-6 col-12 pl-lg-5">
          <div class="d-flex flex-column flex-nowrap">
            <h1 class="font-lg-s12 font-md-s12 font-sm-s11 font-xs-s8">Conseil & Intégration des ERP et AMOA</h1>
          </div>
          <p class=" text_light text-justify">
            Nous vous aidons à créer ou à customiser votre ERP afi
            n dʼaméliorer lʼefficacité de vos services et vous procurer
            un avantage concurrentiel durable.
          </p>
          <router-link to="/all-services/#erp" class="btn btn-sm btn-light font-s2 ml-0 mt-2">savoir plus</router-link>
        </div>
      </div>
      
      <div class="service bg_gradient px-lg-5 px-4">
        <div class="col-lg-6 col-12 pr-lg-5">
          <div class="d-flex flex-column flex-nowrap">
            <h1 class="font-lg-s12 font-md-s12 font-sm-s11 font-xs-s8">Formations IT</h1>
          </div>
          <p class="font-weight-light text-justify">
            MySys dispose dʼun Centre de formation équipé des dernières technologies
            et conçu selon les meilleurs standards. Nous y dispensons des formations
            professionnelles avec des cursus adaptés à divers métiers, technologies et
            processus.
            Nos formations combinent à la fois expertise pratique, esprit de synthèse,
            pédagogie dʼenseignement et expérience terrain.
          </p>
          <router-link to="/all-services/#fm" class="btn btn-sm btn-light font-s2 ml-0 mt-2">savoir plus</router-link>
        </div>
        <div class="col-lg-6">
          <img src="../../assets/bg/formation-it.jpg" alt="" class="service-img">
        </div>
      </div>
      
      

    </slick>
  </div>
  <!-- end-container -->



</div>
</template>