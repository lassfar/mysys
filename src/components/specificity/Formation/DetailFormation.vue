<script>
import Contactez from '../../commun/Contactez.vue';
import NavBarForDFormation from '../../commun/NavBarForDFormation.vue';
import FormationSimilaire from './FormationSimilaire.vue';
export default {
  name: 'DetailFormation',
  components: {
    NavBarForDFormation,
    Contactez,
    FormationSimilaire
  },
  data() {
    return {
      isLoaded: false,
      isProgramLoaded: false,
      isObjectifLoaded: false,
      form_param: undefined,
      formation: {},
      formations_by_cat: {},
      programme: null, prerequis: null, objectif: null,
      data_insc:{
        nom: "",
        prenom: "",
        tele: "",
        email: "",
        ville: "",
        type: "",
      },
      dataTransform : [
        {symbol: '##', tag: 'h3', classes: 'subtitle font-lg-s7 font-md-s7 font-s5 text-capitalize mt-4', addition: ''}, // section title
        {symbol: '&&', tag: 'h4', classes: 'text_mysyscolor1 font-lg-s6 font-md-s6 font-s5 mt-4 mb-2', addition: '⬢ '}, // subtitle bold
        {symbol: '@@', tag: 'ul', classes: 'd-flex flex-row flex-wrap list-unstyled font-weight-bold', addition: ''}, // ul list container
        {symbol: '__', tag: 'li', classes: 'font-weight-light pl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12', addition: '<strong>• </strong>'}, // li list element
        {symbol: '==', tag: 'li', classes: 'font-weight-light pl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2', addition: '<strong class="text_mysyscolor1">✔ </strong>'},
        {symbol: '**', tag: 'strong', classes: '', addition: ''}, // text bold
        {symbol: '//', tag: 'p', classes: 'font-italic', addition: ''}, // italic
        {symbol: '~~', tag: 'u', classes: 'text-underline', addition: ''}, // underline
        {symbol: '||', tag: 'mark', classes: 'bg_gradient', addition: ''},
        {symbol: '""', tag: 'q', classes: '', addition: ''},
      ]
    }
  },
  created() {
    window.scrollTo(0, 0);
    document.title = "Formation en --";
    window.addEventListener('scroll', this.DisplayCardOnScroll);
    // récupérer les formations
    this.form_param = Math.floor(this.$route.params.form_param);
    this.FetchAPI(`/api/mysys/formations/${this.form_param}`, `/api/mysys/formationsbycat/`);
  },
  watch: {
    // appeler la méthode si les paramètres changent
    '$route': 'FetchAPI'
  },
  methods: {
    async FetchAPI(forma_url, theme_url) {
      await this.axios.get(forma_url)
        .then(res => this.formation = res.data)
        .then(() => {
          // récupérer les formations similaires
          // this.Getformations_by_cat(this.formation.category)
          this.axios.get(`${theme_url}${this.formation.mysystheme_id}`)
            .then((res) => {
              this.formations_by_cat = res.data.slice(0, 4)
            })
        });
      this.isLoaded = true;
      document.title = `${this.formation.name} • ${(this.formation.description).substring(0, 50)}..`;

      // TRANSFORMER LES PARAGRAPH EN HTML
      this.ConvertDataTextInView(this.programme, this.formation.programme, 'programme');
      this.isProgramLoaded = true;
      this.ConvertDataTextInView(this.objectif, this.formation.objectif, 'objectif');
      this.isObjectifLoaded = true;
    },
    // async Getformations_by_cat(cat){
    //   console.log("cat : ", cat);
    //   await this.axios.get(`/api/mysys/formationsbycat/${cat}`)
    //     .then(response => this.formations_by_cat = response.data);
    // },

    // **** TRANSFORM CONTENT ****
    TransformContent(textToTransform, symbol, tag, classes, addition) {
      return textToTransform.split(symbol).map(function(value, index) {
        if (index % 2 == 0) {
          return value;
        } else {
          return `<${tag} class="${classes}">${addition}${value}</${tag}>`;
        }
      }).join("");
    },
    ConvertStringToHtml(textToConvert, domId) {
      let domGoal = document.getElementById(domId);
      let newDom = document.createElement('article');
      newDom.innerHTML = textToConvert;
      domGoal.append(newDom);
      // console.log(domGoal.textContent);
    },
    ConvertDataTextInView(myText, originText, domId) {
      // converter le programme de formation au HTML
      myText = originText;
      this.dataTransform.map((trans) => {
        let converted = this.TransformContent(myText, trans.symbol, trans.tag, trans.classes, trans.addition);
        myText = converted;
      });
      // console.log("myText : ", myText);
      this.ConvertStringToHtml(myText, domId);
    },
    // **** END TRANSFORM CONTENT ****
    ScrollUserTo(elemId) {
      document.getElementById(elemId).scrollIntoView();
    },
    // UI METHODES
    DisplayCardOnScroll() {
      let card = document.getElementById('formationCard');
      // let formaJumboHeight = document.getElementById('formaSection').offsetHeight;
      let formaSimHeight = document.getElementById('formationSimilaire').offsetHeight;
      let formaBanner = document.getElementById('formaBanner');
      let contactezHeight = document.getElementById('contactez').offsetHeight;
      let detailFormaHeight = document.getElementById('detailFormation').offsetHeight;
      let FooterHeight = document.getElementById('mysysFooter').offsetHeight;

      let verticalPos = window.scrollY; // récupérer la position de scroll en px
      let divHeight = detailFormaHeight - formaSimHeight - contactezHeight - FooterHeight; // récupérer la taille vertical de 'div'
      // console.log('vert pos : ' + verticalPos + ' div height : ' + divHeight);

      if (screen.width >= 1024) { // fixer 'card' avec les grandes écrans
        formaBanner.setAttribute('style', 'display: none !important');
        if (verticalPos > 100 && verticalPos < divHeight) {
          card.style.position = "fixed";
          card.style.top = 0;
          card.style.display = "block";
        } else { // laisser 'card' avec sa position d'origine 
          card.style.position = "absolute";
          card.style.display = "block";
        }
        if (verticalPos > divHeight) {
          card.style.display = "none";
          // card.style.bottom = 0;
        }
      } else if (screen.width < 1024) { // laisser 'card' relative avec le jumbotron (position d'origine relative)
        card.style.position = "relative";
        // banner formation
        if (verticalPos > 700 && verticalPos < divHeight) {
          formaBanner.style.display = "block";
          formaBanner.style.position = "fixed";
          formaBanner.style.bottom = 0;
        } else { // laisser 'formaBanner' avec sa position d'origine 
          formaBanner.style.display = "block";
          formaBanner.style.position = "relative";
        }
        if (verticalPos > divHeight) {
          formaBanner.style.display =  "none";
        }
      } // screen width
    },

  } // methods
}
</script>

<style lang="scss">
  @import '../../../assets/css/detailformation.scss';
</style>


<template>

<div id="detailFormation">
  <NavBarForDFormation/>
  <div class="container-fluid m-0 p-0">
    <section class="formation-section bg_dark" id="formaSection">

      <div class="row pt-4">

        <div class="col-xl-8 col-lg-8 col-md-7 col-12 w-100 pr-lg-5 pr-md-5 pr-0 py-5">
          <span :class="formation.certif ? 'badge badge-success my-3' : ''">
            {{ formation.certif ? "• Certificat disponible" : "" }}
          </span>
          <span :class="formation.global_event ? 'badge badge-warning my-3' : ''">
            {{ formation.global_event ? "★ Évenement de la semaine" : "" }}
          </span>
          <h1 class="text_bold">{{ formation.name }}</h1>
          <p class="font-weight-light">
            {{ formation.description ? formation.description : "--" }}
          </p>
          <div class="d-flex flex-wrap align-items-center">
            <i class="h5 mb-0 material-icons">person_pin</i>
            <span class="font-weight-light">
              Formateur : 
            </span>
            <span class="text-bold">
              {{ formation.professeur ? formation.professeur : "--" }}
            </span>
          </div>
          <div class="d-flex flex-wrap align-items-center">
            <i class="h5 mb-0 material-icons">access_time</i>
            <span class="font-weight-light">
              Durée : 
            </span>
            <span class="text-bold">
              {{ formation.duration ? formation.duration : "Non spécifié" }}
            </span>
          </div>
          <div class="d-flex flex-wrap align-items-center">
            <i class="h5 mb-0 material-icons">update</i>
            <span class="font-weight-light">
              Dernière mise à jour : 
            </span>
            <span class="text-bold">
              {{ formation.updated_at ? formation.updated_at : "--" | moment("calendar") }}
            </span>
          </div>
          <span class="badge badge-primary mt-3">+ 52 participants inscrits</span>
          <div class="w-100 mt-2">
            <button class="btn btn-light font_sm btn-sm ml-0"  data-target="#inscriptionModal44" data-toggle="modal">Partager <i class="fa fa-share"></i></button>
            <button v-on:click="ScrollUserTo('programme')" class="btn btn-light font_sm btn-sm ml-0">Voir le programme</button>
          </div>
        </div>

        <!-- <div class="col-lg-1 col-md-1 col-0"> -->
          <!-- blank -->
        <!-- </div> -->

        <!-- col -->
        <div class="col-xl-4 col-lg-4 col-md-5 col-12 ml-auto">
          <div class="d-card" id="formationCard" v-if="formation && isLoaded">
            <div class="d-card-header">
              <img class="d-card-img" :src="formation.url_img" alt="formation__img">
            </div>
            <div class="d-card-content">
              <h3 class="text_bold d-inline">
                {{ formation.prix ? formation.prix + " MAD" : "Contactez-nous" }}
              </h3>
              <h6 class="font-weight-light d-inline text-secondary">
                <del> {{ formation.prix_off ? formation.prix_off + " MAD" : "" }}</del>
              </h6>
              <span class="font-weight-light text-secondary d-flex align-items-center">
                <i class="fa fa-arrow-down mr-1"></i>
                <small>
                  {{ formation.prix && formation.prix_off ? 
                    (((formation.prix * 100) / formation.prix_off)).toFixed(0) + "% de réduction" : "--" }}
                </small>
              </span>
              <!-- <div class="d-flex"> -->
                <button class="btn btn-primary btn-block btn-lg mx-0" data-target="#inscriptionModal2" data-toggle="modal">S'inscrire</button>
                <router-link to="/contact" class="btn btn-outline-secondary btn-block btn-lg mx-0">Contacter</router-link>
              <!-- </div> -->

              <div class="w-100 my-3">
                <h6 class="pt-1 text_bold">Caractéristiques :</h6>
                <!-- categorie -->
                <span class="d-flex flex-wrap">
                  <small class="material-icons h6 mb-0 pr-1">error_outline</small>
                  <small class="text_bold pr-2">Catégorie :</small>
                  <small class="">
                    {{ formation.category ? formation.category : "--" }} 
                  </small>
                </span>
                <!-- lieu -->
                <span class="d-flex flex-wrap">
                  <small class="material-icons h6 mb-0 pr-1">location_on</small>
                  <small class="text_bold pr-2">Lieu :</small>
                  <small class="">Casablanca, Maroc</small>
                </span>
                <!-- prerequis -->
                <span class="d-flex flex-wrap">
                  <small class="material-icons h6 mb-0 pr-1">short_text</small>
                  <small class="text_bold pr-2">Prérequis :</small>
                  <small class="" style="white-space: pre-wrap;">
                    {{ formation.prerequisite ? formation.prerequisite : "Non" }}
                  </small>
                </span>


                <!-- <div class="d-flex flex-wrap d-xl-block d-lg-block d-sm-none">
                  <h6 class="text_bold mt-4">Formations Similaires :</h6>
                  <div class="col-12 text-light rounded m-1" 
                    v-bind:style="{background: 'linear-gradient(180deg, rgba(1,1,1,.3) 0%, rgba(1,1,1,.2) 100%),' + 'url(' + forbycat.url_img + '), no-repeat', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}"
                    v-for="forbycat in formations_by_cat" :key="forbycat.id">
                    <div class="text-center p-2">
                      <router-link :to="{name: 'detailformation', params: { form_param: forbycat.id } }">
                        <h6 class="text_bold text-light mb-0"> {{forbycat.name}}</h6>
                      </router-link>
                      <span class="font-weight-light font-s2 p-0">{{ forbycat.description ? forbycat.description.substring(0, 50)+"..." : "--" }}</span>
                    </div>
                    
                  </div>
                </div> -->
      
              </div>
            </div>

          </div>
          <!-- end-d-card -->
          <!-- else -->
          <div v-else class="d-card d-flex flex-nowrap align-items-center justify-content-center" id="formationCard">
            <img class="loading" :src="require('../../../assets/img/loading-circle.gif')" alt="loading ui">
          </div>
        </div>
        <!-- end-col -->
        

      </div>
      <!-- end-row -->
      
    </section>
    <!-- end-formation-section -->

  </div>
  <!-- end-container-fluid -->


  <!-- container-fluid -->
  <div class="container-fluid py-4">
    <div class="main-title">
      <span class="title font-lg-s8 font-md-s8 font-s6">Ce que vous allez apprendre</span>
    </div>
    <div class="row">
      <div id="objectif" class="col-xl-7 col-lg-7 col-md-12 col-12 rounded-right bg_light_2 p-4">
        <!-- objectif convertis -->
        <div v-if="!isObjectifLoaded" class="loading loading_sm">
          <img class="loading_img" :src="require('../../../assets/img/loading-circle.gif')" alt="loading ui">
        </div>
      </div>
      
    </div>
  
    <div class="main-title">
      <span class="title font-lg-s8 font-md-s8 font-s6">Programme</span>
    </div>

    <div class="row px-xl-5 px-md-5 px-sm-4 px-4">
      <div class="col-xl-7 col-lg-7 col-md-12 col-12 mb-5 pr-3" id="programme">
        <!-- programme convertis -->
        
        <div v-if="!isProgramLoaded" class="loading_sm">
          <img class="loading_img" :src="require('../../../assets/img/loading-circle.gif')" alt="loading ui">
        </div>
        
      </div>
    </div>
  </div>
  <!-- end-container-fluid -->
  
  <div id="formaBanner" class="w-100 d-flex flex-nowrap justify-content-between align-items-center bg_dark px-lg-4 px-2">

    <div class="d-flex align-items-center">
      <span class="font-lg-s6 font-md-s6 font-s4 mr-lg-5 mr-2">
        {{ formation.name ? formation.name : "--" }}
      </span>
    </div>

    <div class="d-flex align-items-center">
      <span class="font-lg-s6 font-md-s6 font-s4 mx-2 prix">
        {{ formation.prix ? Math.floor(formation.prix).toFixed(0) + " MAD" : "Contactez-nous" }}
      </span>
      <button class="btn btn-primary" data-target="#inscriptionModal2" data-toggle="modal">S'inscrire</button>
      <button class="btn btn-secondary d-sm-inline-block d-none">Contactez</button>
    </div>

  </div>
  
  <formation-similaire 
    :form_param="form_param"
    :category="formations_by_cat.category"
    :formations="formations_by_cat">
  </formation-similaire>

  <contactez></contactez>

   <div class="modal fade" id="inscriptionModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-primary text-light border-0">S'inscrire</button>
          </div>

        </div>
        <!-- end-modal-body -->

        
      </div>
    </div>
  </div>


  <!-- MODALS -->
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
              :title="formation.name"
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
 <!-- END-MODALS -->

</div>
</template>
