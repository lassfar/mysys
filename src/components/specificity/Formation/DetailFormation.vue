<script>
import NavBarForDFormation from '../../commun/NavBarForDFormation.vue';
export default {
  name: 'DetailFormation',
  components: {
    NavBarForDFormation
  },
  data() {
    return {
      form_param: undefined,
      formation: {},
      formationbycat:{},
      programme: null, prerequis: null, objectif: null,
      data_insc:{
        nom:"",
        prenom:"",
        tele:"",
        email:"",
        ville:"",
        type:"",
      }
    }
  },
  created() {
    this.form_param = Math.floor(this.$route.params.form_param);
    this.FetchAPI(`/api/mysys/formations/${this.form_param}`);
  },
  watch: {
    // appeler la méthode si les paramètres changent
    '$route': 'FetchAPI'
  },
  methods: {
    async FetchAPI(url) {
      await this.axios.get(url)
        .then(res => this.formation = res.data)
        .then(()=>{
          this.getFormationByCat(this.formation.category)
        })
    
    },
    // AlignParagraph
    AlignParagraph(paragraph) {
      return paragraph.split("--").map(function (value, index) {
        if(index % 2 == 0) {
          return value
        } else {
          return "<strong>• " + value + "</strong>"
        }
      }).join("");
    },
    ConvertStringToHtml(textToConvert) {
      /*********** */
      // let str = document.createElement(textToConvert);
      var el = document.createElement( 'div' );
      
      el.append(textToConvert);
      console.log("convert result : ", el);
      return (el);
    },
    getFormationByCat(cat){
    this.axios.get(`/api/mysys/formationsbycat/${cat}`).then(response => this.formationbycat = response.data);
    }
    
  }
}
</script>

<style lang="scss">
  @import '../../../assets/css/detailformation.scss';
</style>


<template>

<div id="detailFormation">
  <NavBarForDFormation/>
  <div class="container-fluid m-0 p-0">
  <div class="formation-section bg-dark">

    <div class="row" style="padding-top:40px !important;">

      <div class="col-lg-8 col-md-7 col-12 w-100 pr-lg-5 pr-md-5 pr-0 py-5">
        <span :class="formation.certif ? 'badge badge-success my-3' : ''">
          {{ formation.certif ? "• Certificat disponible" : "" }}
        </span>
        <span :class="formation.global_event ? 'badge badge-warning my-3' : ''">
          {{ formation.global_event ? "★ Évenement de la semaine" : "" }}
        </span>
        <h1 class="text_bold">{{ formation.name }}</h1>
        <p class="text_light">
          {{ formation.description ? formation.description : "--" }}
        </p>
        <div class="d-flex flex-wrap align-items-center">
          <i class="h5 mb-0 material-icons">person_pin</i>
          <span class="text_light">
            Formateur : 
          </span>
          <span class="text-bold">
            {{ formation.professeur ? formation.professeur : "--" }}
          </span>
        </div>
        <div class="d-flex flex-wrap align-items-center">
          <i class="h5 mb-0 material-icons">access_time</i>
          <span class="text_light">
            Durée : 
          </span>
          <span class="text-bold">
            {{ formation.duration ? formation.duration : "Non spécifié" }}
          </span>
        </div>
        <div class="d-flex flex-wrap align-items-center">
          <i class="h5 mb-0 material-icons">update</i>
          <span class="text_light">
            Dernière mise à jour : 
          </span>
          <span class="text-bold">
            {{ formation.updated_at ? formation.updated_at : "--" | moment("calendar") }}
          </span>
        </div>
        <span class="badge badge-primary mt-3">+ 52 participants inscrits</span>
        <div class="w-100 mt-2">
          <button class="btn btn-light font_sm btn-sm ml-0"  data-target="#inscriptionModal44" data-toggle="modal">Partager <i class="fa fa-share"></i></button>
          <a href="#prog" class="btn btn-light font_sm btn-sm ml-0">Voir le programme</a>
        </div>
      </div>

      <!-- <div class="col-lg-1 col-md-1 col-0"> -->
        <!-- blank -->
      <!-- </div> -->

      <!-- col -->
      <div class="col-lg-4 col-md-5 col-12 ml-auto">
        <div class="d-card">
          <div class="d-card-header">
            <img class="d-card-img" :src="formation.url_img" alt="formation__img">
          </div>
          <div class="d-card-content">
            <h3 class="text_bold d-inline">
              {{ formation.prix ? formation.prix + " MAD" : "Contactez-nous" }}
            </h3>
            <h6 class="text_light d-inline text-secondary">
             <del> {{ formation.prix_off ? formation.prix_off + " MAD" : "" }}</del>
            </h6>
            <span class="text_light text-secondary d-flex align-items-center">
              <i class="fa fa-arrow-down mr-1"></i>
              <small>
                {{ formation.prix && formation.prix_off ? 
                  (((formation.prix_off - formation.prix) / formation.prix) * 100).toFixed(2) + "% de réduction" : "--" }}
              </small>
            </span>
            <button class="btn btn-dark btn-block btn-lg mx-0" data-target="#inscriptionModal33" data-toggle="modal">S'inscrire</button>
            <router-link to="/contact" class="btn btn-dark btn-block btn-lg mx-0">Contacter</router-link>
            <div class="w-100 my-3">
              <h6 class="pt-1 text_bold">Caractéristiques :</h6>
              <!-- categorie -->
              <span class="d-flex flex-wrap align-items-center">
                <small class="material-icons h6 mb-1 pr-1">error_outline</small>
                <small class="text_bold pr-2">Catégorie :</small>
                <small class="">
                  {{ formation.category ? formation.category : "--" }} 
                </small>
              </span>
              <!-- lieu -->
              <span class="d-flex flex-wrap align-items-center">
                <small class="material-icons h6 mb-1 pr-1">location_on</small>
                <small class="text_bold pr-2">Lieu :</small>
                <small class="">Casablanca, Maroc</small>
              </span>
              <!-- prerequis -->
              <span class="d-flex flex-wrap align-items-center">
                <small class="material-icons h6 mb-0 pr-1">short_text</small>
                <small class="text_bold pr-2">Prérequis :</small>
                <small class="" style="white-space: pre-wrap;">
                  {{ formation.prerequisite ? formation.prerequisite : "Non" }}
                </small>
              </span> 
              <h6 class="mt-5 text_bold">Formations Similaires :</h6>
              <div class="card border-0 mt-2 text-light" v-bind:style="{background: 'linear-gradient(180deg, rgba(1,1,1,.4) 0%, rgba(1,1,1,.2) 100%),' + 'url(' + forbycat.url_img + '), no-repeat', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}" v-for="forbycat in formationbycat" :key="forbycat.id">
                <div class="card-body pb-0">
                 <router-link :to="{name: 'detailformation', params: { form_param: forbycat.id } }"> <h6 class="text_bold text-light"> {{forbycat.name}}</h6></router-link>
                  <p class="text_light font-s2">Dernière mise à jour : {{ forbycat.updated_at ? forbycat.updated_at : "--" | moment("calendar") }}</p>
                </div>
              </div>
    
            </div>
          </div>

        </div>
        <!-- end-d-card -->
      </div>
      <!-- end-col -->

    </div>
    <!-- end-row -->
    
  </div>
  <!-- end-formation-section -->

  </div>
  <!-- end-container-fluid -->

  <div class="container-fluid py-5">
    
    <div class="main-title">
      <span class="title font-s10">Ce que vous allez apprendre</span>
    </div>
    <div class="row pl-5">
      <div class="col-lg-6 col-md-8 col-12">
        <span>
          <li class="pb-3" style="white-space: pre-wrap;">
            {{ formation.objectif ? formation.objectif : "En cours de planification ..." }}
          </li>
        </span>

      </div>
    </div>
  
    <div class="main-title" id="prog">
      <span class="title font-s10">Programme</span>
    </div>

    <div class="row pl-5">
      <div class="col-lg-7 col-md-8 col-12">
        <span>
          <span class="pb-3" style="white-space: pre-wrap;">
          {{ formation.programme ? formation.programme : "En cours de planification ..." }}
          </span>
        </span>
      </div>
    </div>
  </div>

   <div class="modal fade" id="inscriptionModal33" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title h1" id="exampleModalLabel">S'inscrire à {{ formation.name }}</span>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="text-light" aria-hidden="true">
              <i class="material-icons">close</i>
            </span>
          </button>
        </div>
        <div class="modal-body p-4">
        
          <div class="container-fluid">
            <form>
              <!-- nom et prenom -->
              <div class="row">
                <div class="col-12 col-md-6 col-lg-6 p-2">
                  <label for="nom" class="col-form-label">Nom</label>
                  <input type="text" class="form-control" id="nom" v-model="data_insc.nom" placeholder="Alaoui" />
                </div>
                <div class="col-12 col-md-6 col-lg-6 p-2">
                  <label for="prenom" class="col-form-label">Prénom</label>
                  <input type="text" class="form-control" id="prenom" v-model="data_insc.prenom" placeholder="Ahmad" />
                </div>
              </div>
              <!-- row -->
              <!-- tele adresse -->
              <div class="row">
                <div class="col-12 p-2">
                  <label for="tele" class="col-form-label">Téléphone</label>
                  <input type="text" class="form-control" id="tele" v-model="data_insc.tele" placeholder="+212 22 22 22 22" />
                </div>
                <div class="col-12 p-2">
                  <label for="email" class="col-form-label">Email</label>
                  <input type="text" class="form-control" id="email" v-model="data_insc.email" placeholder="Ton adresse e-mail" />
                </div>
              </div>

                <div class="row my-3">
                <div class="col-6 p-2">
                  <label for="type" class="col-form-label mr-2">Vous êtes?</label>
                    <select name="type" id="type" v-model="data_insc.type">
                     <option value="">Entreprise</option>
                     <option value="">Particulier</option>
                   </select>
                </div>
                <div class="col-6 p-2">
                  <label for="ville" class="col-form-label mr-2">Ville</label>
                  <select name="ville" id="ville" v-model="data_insc.ville">
                  <option value="">Casablanca</option>
                  <option value="">Rabat</option>
                  <option value="">Tanger</option>
                  </select>
                </div>
              </div>
         
            </form>
          </div>
          <!-- container-fluid -->
          
          <div class="modal-footer ">
            <button type="button" class="btn btn-light" data-dismiss="modal">Fermer</button>
            <button type="button" class="btn text-light border-0" style="background-color:#188eee;">S'inscrire</button>
          </div>

      </div>

        
      </div>
    </div>
  </div>

  <div class="modal fade bd-example-modal-lg" id="inscriptionModal44" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <span class="modal-title h1" id="exampleModalLabel">Partager sur les réseaux sociaux</span>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span class="text-light" aria-hidden="true">
             <i class="material-icons">close</i>
           </span>
         </button>
       </div>
       <div class="modal-body p-3">
         <div class="container-fluid p-5">
           <div class="row">
               <ShareNetwork
               class="btn btn-primary"
               network="facebook"
               url="google.com"
               :title="formation.name"
               :description="formation.description"
               :hashtags="formation.category"
                >
               <i class="fa fa-facebook-f"></i> en Facebook
               </ShareNetwork>
                <ShareNetwork
                style="background-color:#28adff;"
                class="btn text-light"
               network="twitter"
               url="google.com"
               :title="formation.name"
               :hashtags="formation.category"
                >
               <i class="fa fa-twitter"></i> en Twitter
               </ShareNetwork>
                <ShareNetwork
                 class="btn text-light"
                style="background-color:#0270ad;"
                network="linkedin"
                url="google.com"
                >
               <i class="fa fa-linkedin"></i> en LinkedIn
               </ShareNetwork>
                <ShareNetwork
                class="btn btn-success"
                network="whatsapp"
                url="google.com"
                :title="formation.name"
                :description="formation.description"
                :hashtags="formation.category"
                >
               <i class="fa fa-whatsapp"></i> en WhatsApp
               </ShareNetwork>
                <ShareNetwork
                class="btn btn-danger"
               network="email"
               url="google.com"
               :title="formation.name"
               :description="formation.description"
               :hashtags="formation.category"
                >
               <i class="fa fa-envelope-open"></i> en Email
               </ShareNetwork>
             </div>
         </div>
         <div class="modal-footer ">
           <button type="button" class="btn btn-light" data-dismiss="modal">Fermer</button>
         </div>
     </div>
   </div>
  </div>
 </div>

</div>
</template>
