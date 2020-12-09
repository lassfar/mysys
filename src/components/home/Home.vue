<script>
import Inscription from './Inscription';
import Domaine from './Domaine';
import Jumbotron from './Jumbotron';
import OurService from './OurService';
import Chiffre from './Chiffre';
import Client from './Client';
import Partenaire from './Partenaire';
import Expertise from './Expertise';
import Mission from './Mission';
import NavBarForHome from '../commun/NavBarForHome.vue';


export default {
  name: 'Home',
  components: {
    NavBarForHome,
    Inscription,
    Domaine,
    Jumbotron,
    OurService,
    Partenaire,
    Chiffre,
    Expertise,
    Mission,
    Client
  },
  created() {
    document.title = "MySYS • Une plateforme des formations certifiantes";
  },
  mounted() {
  },
  methods: {
  } // mounted
}
</script>


<template>
<div id="home">
  <div class="j-bg-card1">
    <NavBarForHome/>
    <Inscription/>
    <Jumbotron/>
  </div>
  <Domaine/>
  <OurService />
  <div class="d-flex flex-wrap">
    <div class="col-12 col-lg-6 col-xl-6">
      <Expertise />
    </div>
    <div class="col-12 col-lg-6 col-xl-6">
      <Mission />
    </div>
  </div>

  <Partenaire />
  <Chiffre />
  <Client />
  
</div>
</template>