<script>
export default {
  name: 'Partenaire',
  data() {
    return {
      partenaires: [
        {imgURL: require('../../assets/societe/pearson.png'), alt: 'pearson-partenaire'},
        {imgURL: require('../../assets/societe/odoo.png'), alt: 'odoo-partenaire'},
        {imgURL: require('../../assets/societe/oracle.png'), alt: 'oracle-partenaire'},
        {imgURL: require('../../assets/societe/microsoft.png'), alt: 'microsoft-partenaire'},
        {imgURL: require('../../assets/societe/sap.png'), alt: 'sap-partenaire'},
        {imgURL: require('../../assets/societe/ibm.png'), alt: 'ibm-partenaire'},
        {imgURL: require('../../assets/societe/pmi.png'), alt: 'pmi-partenaire'},
      ]
    }
  } // data
}
</script>

<style lang="scss">
  @import '../../assets/css/partenaire.scss';
</style>


<template>
<div id="partenaire">
 <div class="container-fluid mb-4 border-bottom">

  <div class="row">
   <div class="card col-lg-6 col-sm-12 bg_gradient p-3 border-0 radius_0">
    <div class="card-body d-flex flex-column justify-content-center">
      <h1 class="card-title text_bold">Nos Partenaires</h1>
      <p class="card-text">
        Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée 
        à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès
        qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem 
        ipsum ou Lipsum.
      </p>
    </div>
   </div>

  <div class="card bg-white col-lg-6 col-sm-12 p-3 border-0 radius_0">
    <div class="card-body">
      <div class="row">

        <div v-for="(part, partIndex) in partenaires" :key="partIndex" class="col-lg-4 col-md-4 col-sm-6 col-6">
          <img :src="(part.imgURL)" :alt="part.alt" class="p-card-img">
        </div>

      </div>
      <!-- end-row -->
    </div>
    <!-- end-card-body -->
  </div>
  
 </div>
</div>
<!-- end-container-fluid -->

</div>
</template>