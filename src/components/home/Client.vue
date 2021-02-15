<script>
export default {
  components: { },
  name: 'Client',
  data() {
    return {
      clients: [
        {imgURL: require('../../assets/societe/zine.png'), alt: 'zine-client'},
        {imgURL: require('../../assets/societe/zine-cereales.jpg'), alt: 'zine-client'},
        {imgURL: require('../../assets/societe/itqan.png'), alt: 'itqan-client'},
        {imgURL: require('../../assets/societe/lgmz.jpg'), alt: 'lgmz-client'},
        {imgURL: require('../../assets/societe/lgsz.jpg'), alt: 'lgsz-client'},
        {imgURL: require('../../assets/societe/bmz.png'), alt: 'bmz-client'},
      ]
    }
  } // data
}
</script>

<template>
<div id="client">

  <div class="container-fluid border-bottom">

    <div class="row">
      <div class="p-card col-lg-6 col-sm-12 bg_gradient p-3 border-0 radius_0">
        <div class="card-body d-flex flex-column justify-content-center">
          <h1 class="font-s12 font-md-s10 font-sm-s8 text-capitalize text_bold ">Ils nous font confiance</h1>
          <p class="card-text">
            <!-- Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée 
            à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès
            qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem 
            ipsum ou Lipsum. -->
          </p>
        </div>
      </div>

      <div class="p-card bg-white col-lg-6 col-sm-12 p-3 border-0 radius_0">
        <div class="card-body">
          <div class="row">

            <div v-for="(cl, clIdx) in clients" :key="clIdx" class="col-lg-4 col-md-4 col-sm-6 col-6">
              <img class="p-card-img" :src="(cl.imgURL)" :alt="cl.alt"  />
            </div>

          </div>
          <!-- end-row -->
        </div>
        <!-- end-card-body -->
      </div>
      <!-- end-card -->

    </div>
    <!-- end-row -->
  </div>
  <!-- end-container-fluid -->

</div>

</template>