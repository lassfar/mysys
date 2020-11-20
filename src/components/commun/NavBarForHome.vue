<template>
<div>
  <!-- <img class="navbar-brand" height="60" src="../../assets/img/mysys-logo.png" alt="mysys-logo"> -->
  <nav class="navbar navbar-expand-md navbar-dark bg-transparent text_light p-3">
    <router-link class="navbar-brand" to="#">
      <img class="navbar-brand ml-5" height="35" src="../../assets/img/logo_light.png" alt="mysys-logo">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-between align-items-center font_navbar" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto mx-auto text-md-center text-left">
        <li class="nav-item active" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link class="nav-link" to="/home">Accueil</router-link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link class="nav-link" to="/all-formation">Nos Formations</router-link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link class="nav-link" to="/all-services">Nos Services</router-link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link class="nav-link" to="/about">À Propos</router-link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link class="nav-link" to="/contact">Contact</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap mr-3">
        <li class="nav-item"><a class="nav-link" href=""><i class="fa fa-facebook mr-1"></i></a> </li>
        <li class="nav-item"><a class="nav-link" href=""><i class="fa fa-twitter mr-1"></i></a> </li>
        <li class="nav-item"><a class="nav-link" href=""><i class="fa fa-linkedin mr-1"></i></a> </li>
      </ul>
    </div>
  </nav>

</div>
</template>
<style>
.navforformation{position:relative;z-index:2 !important; margin-bottom:-70px !important}
</style>
<script>
export default {
  name: 'NavBarForHome',
}
</script>

