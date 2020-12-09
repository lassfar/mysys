<script>
export default {
  created() {
    window.scrollTo(0, 0);
    document.title = "MySYS • Contact";
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/contact.scss';
</style>
<template>
<div id="contact">
  <NavBar/>
  <div class="container-fluid mb-5">
 
    <div class="p-lg-5 mt-5">
    <div class="row">

    <div class="col-lg-6">
    <div class="card border-0 p-lg-5">
      <div class="card-body">
    <form >
    <div class="form-group ">
    <h1 class="text_bold">Prenez Contact Avec Nous</h1>
    </div>
     <div class="form-group ">
     <label class="col-form-label font_sm" for="nom">Nom Complet</label>
     <input type="text" class="form-control" id="nom" placeholder="Ahmad Mohamed" autofocus>
    </div>
    <div class="form-group ">
     <label  class="col-form-label font_sm ">Entreprise</label>
     <input type="text" class="form-control" placeholder="AhTech">
    </div>
    <div class="form-group ">
     <label  class="col-form-label font_sm">Adresse E-Mail</label>
     <input type="email" class="form-control" placeholder="ahmadmohamed@gmail.com">
    </div>
    <div class="form-group ">
     <label  class="col-form-label font_sm">Téléphone</label>
     <input type="text" class="form-control" placeholder="+212 6 61 54 54 54" >
    </div>
     <div class="form-group ">
     <label  class="col-form-label font_sm">Message</label>
     <textarea class="form-control" rows="10" placeholder="Ton Message"></textarea></div> 
     <button type="submit" class="btn btn-lg btn-dark font_sm ">Envoyer</button>
    </form>
      </div>
    </div>
    </div>
    <div class="col-lg-6">
    <div class="card  contact-c-bg p-lg-5 text-light border-0 ">
      <div class="card-body p-lg-3">
        <h2 class="card-title text_bold">Coordonnées</h2>
        <p class="card-text">Bienvenue sur notre nouveau site internet!</p>
        <h6 class="text_bold mt-lg-5">Téléphone</h6>
        <ul style="list-style-type: none;" >
        <li class="font_sm">+212522986758</li>
        <li class="font_sm">+212522986758</li>
        <li class="font_sm">Mme Nadia: +212522986758</li>
        </ul>
        <h6 class="text_bold">Adresse </h6>
        <p class="font_sm">39 Rue Al Fourate, Casablanca 20330</p>
        
      </div>
    </div>
    <div class="card  bg-transparent p-0 border-0">
      <div class="card-body p-0">
        <div class="mapouter">
        <div class="gmap_canvas">
        <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=39%20Rue%20Al%20Fourate%2C%20Casablanca%2020330&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div></div>
      </div>
    </div>
    </div>
      
    </div>
    </div>
 
    <!-- end-row -->

  </div>
  <!-- end-container -->

</div>
</template>

<script>
import NavBar from '../commun/NavBar.vue';


export default {
  name: 'Contact',
  components: {
    NavBar
  },
}
</script>

<style>
</style>
