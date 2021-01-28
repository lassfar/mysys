<script>
import Domaine from './Domaine';
import Jumbotron from './Jumbotron';
import OurService from './OurService';
import Chiffre from './Chiffre';
import Client from './Client';
import Partenaire from './Partenaire';
import Expertise from './Expertise';
import Mission from './Mission';
import NavBarForHome from '../common/NavBarForHome.vue';
import Contactez from '../common/Contactez.vue';


export default {
  name: 'Home',
  components: {
    NavBarForHome,
    Domaine,
    Jumbotron,
    OurService,
    Partenaire,
    Chiffre,
    Expertise,
    Mission,
    Client,
    Contactez,
  },
  data () {
    return {
      error: null,
    }
  },
  mounted() {
  },
  created() {
    document.title = "MySYS • Une plateforme des formations certifiantes";
  },
  methods: {
  } // mounted
}
</script>


<template>
<div id="home" class="home">
  <div class="bg_jumbo">
    <nav-bar-for-home></nav-bar-for-home>
    <jumbotron></jumbotron>
  </div>

  <domaine></domaine>
  <our-service></our-service>

  <div class="d-flex flex-wrap">
    <div class="col-12 col-lg-6 col-xl-6">
      <expertise></expertise>
    </div>
    <div class="col-12 col-lg-6 col-xl-6">
      <mission></mission>
    </div>
  </div>

  <partenaire></partenaire>
  <chiffre></chiffre>
  <client></client>

  <div class="line bg_light_2 py-4">
    <hr />
  </div>
  <contactez></contactez>
  
</div>
</template>