<script>
import Contactez from '../../common/Contactez.vue'
import NavBarForDFormation from '../../common/NavBarForDFormation.vue'
import FormationSimilaire from './FormationSimilaire.vue'
import InscriptionModal from './InscriptionModal.vue'
import SocialShareModal from './SocialShareModal.vue'
import { store } from '../../store'

export default {
  name: 'DetailFormation',
  components: {
    NavBarForDFormation,
    Contactez,
    FormationSimilaire,
    InscriptionModal,
    SocialShareModal
  },
  data() {
    return {
      isProgramLoaded: false,
      isObjectifLoaded: false,
      form_param: undefined,
      formation: {},
      formations_by_cat: [],
      dataTransform : [
        {symbol: '##', tag: 'h3', classes: 'subtitle font-lg-s7 font-md-s7 font-s5 text-capitalize mt-4', addition: ''}, // section title
        {symbol: '&&', tag: 'h4', classes: 'text_mysyscolor1 font-lg-s6 font-md-s6 font-s5 mt-4 mb-2', addition: '⬢ '}, // subtitle bold
        {symbol: '@@', tag: 'ul', classes: 'd-flex flex-row flex-wrap list-unstyled font-weight-bold', addition: ''}, // ul list container
        {symbol: '__', tag: 'li', classes: 'font-weight-light pl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-1', addition: '<strong>• </strong>'}, // li list element
        {symbol: '==', tag: 'li', classes: 'font-weight-light pl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2', addition: '<strong class="text_mysyscolor1">✔ </strong>'},
        {symbol: '**', tag: 'strong', classes: 'text_bold', addition: ''}, // text bold
        {symbol: '//', tag: 'p', classes: 'font-italic', addition: ''}, // italic
        {symbol: '~~', tag: 'u', classes: 'text-underline', addition: ''}, // underline
        {symbol: '||', tag: 'mark', classes: 'bg_gradient', addition: ''},
        {symbol: '""', tag: 'q', classes: '', addition: ''},
      ],
      // styles
      isFormSimShowed: false,
      formSimStyle: "translate(100%)"
    }
  },
  // ######### MOUNTED #########
  mounted() {
    this.ResetAll();
    this.form_param = Math.round(this.$route.params.form_param);
  },
  // ######### CREATED #########
  async created() {
    document.title = "Formation en ...";
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.DisplayCardOnScroll);

    // ****** DISPATCH ~ ACTIONS ****** //
    await store.dispatch('FetchThemeData');
    await store.dispatch('FetchFormationData');
    await store.dispatch('SetFormationById', this.form_param);
    await store.dispatch('SetFormationsByTheme', this.formation_by_id.mysystheme_id);
    
    
    // !TRANSFORMER LES PARAGRAPHS EN HTML
    this.ConvertDataTextToView(this.formation_by_id.programme, 'programme');
    this.isProgramLoaded = true;
    this.ConvertDataTextToView(this.formation_by_id.objectif, 'objectif');
    this.isObjectifLoaded = true;
    this.RemoveCurrentFormationObject(this.form_param);

    document.title = `${this.formation_by_id.name} • ${this.formation_by_id.description.substring(0, 50)}...`;
  },
  // ######### COMPUTED ######### 
  computed: {
    // *** data from state ***
    formation_by_id() { return store.state.formation_by_id; },
    formations_by_theme() { return store.state.formations_by_theme; },
    // > is data loaded
    is_themeLoaded() { return store.state.is_themeLoaded; },
    is_formationsByThemeLoaded() { return store.state.is_formationsByThemeLoaded; }
  },
  // ######### WATCH #########
  watch: {
    // déclencher une function si les "params" changent
    $route: async function(to, from) {
      if (to !== from) {
        this.ResetAll();
        // ****** DISPATCH ~ ACTIONS ****** //
        await store.dispatch('SetFormationById', this.form_param);
        await store.dispatch('SetFormationsByTheme', this.formation_by_id.mysystheme_id || 1);
    
        // !TRANSFORMER LES PARAGRAPHS EN HTML
        this.ConvertDataTextToView(this.formation_by_id.programme, 'programme');
        this.isProgramLoaded = true;
        this.ConvertDataTextToView(this.formation_by_id.objectif, 'objectif');
        this.isObjectifLoaded = true;
        
        this.RemoveCurrentFormationObject(this.form_param);
      } //end if
    }
  },
  // ######### METHODS #########
  methods: {
    // DATA MANIPULATION
    RemoveCurrentFormationObject(formId) {
      // supprimer la formation actuelle affiché et récupérer le reste
      // let arr = undefined;
      this.formations_by_cat = this.formations_by_theme.filter((formation) => {
        return formation.id !== formId;
      });
      console.log("form by cat ", this.formations_by_cat);
    },
    // **** TRANSFORM CONTENT ****
    TransformContent(textToTransform, symbol, tag, classes, addition) {
      return textToTransform ? textToTransform.split(symbol).map(function(value, index) {
        if (index % 2 == 0) {
          return value;
        } else {
          return `<${tag} class="${classes}">${addition}${value}</${tag}>`;
        }
      }).join("") : null;
    },
    ConvertStringToHtml(textToConvert, domId) {
      let domGoal = document.getElementById(domId);
      let newDom = document.createElement('article');
      newDom.innerHTML = textToConvert ? textToConvert : "(vide)";
      domGoal.innerHTML = ""; // clean old paragraph
      domGoal.append(newDom); // append new paragraph
      // console.log(domGoal.textContent);
    },
    ConvertDataTextToView(originText, domId) {
      let myText = originText;
      // remplacer les symboles du paragraph de formation par des tags HTML
      this.dataTransform.map((trans) => {
        let converted = this.TransformContent(myText, trans.symbol, trans.tag, trans.classes, trans.addition);
        myText = converted;
        // console.log("domId", domId);
      });
      // convert transformed text to HTML
      this.ConvertStringToHtml(myText, domId);
    },
    // **** END TRANSFORM CONTENT ****
    //***************************************************************/
    ResetAll() {
      window.scrollTo(0, 0);
      // récup. NOUVEAU paramètre
      this.form_param = parseInt(this.$route.params.form_param);
      // reset variable
      this.is_formationsByThemeLoaded = this.isObjectifLoaded = this.isProgramLoaded = false;
      // cacher la section 'formationSimilaire'
      let formaSim = document.getElementById('formationSimilaire');
      formaSim.style.opacity = 0;
      this.isFormSimShowed = false;
    },
    //***************************************************************/
    // **** UI METHODES ****
    ScrollUserTo(elemId) {
      document.getElementById(elemId).scrollIntoView();
    },
    DisplayCardOnScroll() {
      let card = document.getElementById('formationCard');
      // let formaJumboHeight = document.getElementById('formaSection').offsetHeight;
      let formaSim = document.getElementById('formationSimilaire');
      let formaBanner = document.getElementById('formaBanner');
      let contactezHeight = document.getElementById('contactez').offsetHeight;
      let detailFormaHeight = document.getElementById('detailFormation').offsetHeight;
      let FooterHeight = document.getElementById('mysysFooter').offsetHeight;

      let verticalPos = window.scrollY; // récupérer la position de scroll en px
      let divHeight = detailFormaHeight - formaSim.offsetHeight - contactezHeight - FooterHeight; // récupérer la taille vertical de 'div'
      // console.log('vert pos : ' + verticalPos + ' div height : ' + divHeight);

      if (screen.width >= 1024) { // fixer 'card' avec les grandes écrans
        formaBanner.setAttribute('style', 'display: none !important');
        if (verticalPos > 100 && verticalPos < divHeight) {
          card.setAttribute("style", "position: fixed; top: 0; opacity: 1; z-index: 10;");
          // hide formSimilaire on scroll
          if (!this.isFormSimShowed) {
            formaSim.setAttribute("style", "opacity: 0");
          }
        } else { // laisser 'card' avec sa position d'origine 
          card.setAttribute("style", "position: absolute; opacity: 1; z-index: 10;");
        }
        if (verticalPos > divHeight) {
          card.setAttribute('style', "opacity: 0; z-index: 0;");
          // *** show formSimilaire on scroll ***
          formaSim.setAttribute("style", "opacity: 1");
          this.isFormSimShowed = true;
        }
      } else if (screen.width < 1024) { // laisser 'card' relative avec le jumbotron (position d'origine relative)
        card.style.position = "relative";
        // banner formation
        if (verticalPos > 700 && verticalPos < divHeight) {
          formaBanner.setAttribute("style", "display: block; position: fixed; bottom: 0;");
        } else { // laisser 'formaBanner' avec sa position d'origine 
          formaBanner.setAttribute("style", "display: block; position: relative;");
        }
        if (verticalPos > divHeight) {
          formaBanner.style.display =  "none";
        }
        // *** show formSimilaire on scroll ***
        formaSim.setAttribute("style", "opacity: 1");
        this.isFormSimShowed = true;
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
          <span :class="formation_by_id.certif ? 'badge badge-success my-3' : ''">
            {{ formation_by_id.certif ? "• Certificat disponible" : "" }}
          </span>
          <span :class="formation_by_id.global_event ? 'badge badge-warning my-3' : ''">
            {{ formation_by_id.global_event ? "★ Évenement de la semaine" : "" }}
          </span>
          <h1 class="text_bold">{{ formation_by_id.name }}</h1>
          <p class="font-weight-light">
            {{ formation_by_id.description || "--" }}
          </p>
          <div class="d-flex flex-wrap align-items-center">
            <i class="h5 mb-0 material-icons">person_pin</i>
            <span class="font-weight-light">
              Formateur : 
            </span>
            <span class="text-bold">
              {{ formation_by_id.professeur || "--" }}
            </span>
          </div>
          <div class="d-flex flex-wrap align-items-center">
            <i class="h5 mb-0 material-icons">access_time</i>
            <span class="font-weight-light">
              Durée : 
            </span>
            <span class="text-bold">
              {{ formation_by_id.duration || "Non spécifié" }}
            </span>
          </div>
          <div class="d-flex flex-wrap align-items-center">
            <i class="h5 mb-0 material-icons">update</i>
            <span class="font-weight-light">
              Dernière mise à jour : 
            </span>
            <span class="text-bold">
              {{ formation_by_id.updated_at || "--" | moment("calendar") }}
            </span>
          </div>
          <span class="badge badge-primary mt-3">+ 52 participants inscrits</span>
          <div class="w-100 mt-2">
            <button class="btn btn-light font_sm btn-sm ml-0"  data-target="#inscriptionModal44" data-toggle="modal">Partager <i class="fa fa-share"></i></button>
            <button @click="ScrollUserTo('programme')" class="btn btn-light font_sm btn-sm ml-0">Voir le programme</button>
          </div>
        </div>

        <!-- <div class="col-lg-1 col-md-1 col-0"> -->
          <!-- blank -->
        <!-- </div> -->

        <!-- col -->
        <div class="col-xl-4 col-lg-4 col-md-5 col-12 ml-auto">
          <div class="d-card" id="formationCard" v-if="formation_by_id && is_formationsByThemeLoaded">
            <div class="d-card-header">
              <img class="d-card-img" :src="formation_by_id.url_img" alt="formation__img">
            </div>
            <div class="d-card-content">
              <h3 class="text_bold d-inline">
                {{ formation_by_id.prix ? formation_by_id.prix + " MAD" : "Contactez-nous" }}
              </h3>
              <h6 class="font-weight-light d-inline text-secondary">
                <del> {{ formation_by_id.prix_off ? formation_by_id.prix_off + " MAD" : "" }}</del>
              </h6>
              <span class="font-weight-light text-secondary d-flex align-items-center">
                <i class="fa fa-arrow-down mr-1"></i>
                <small>
                  {{ formation_by_id.prix && formation_by_id.prix_off ? 
                    (((formation_by_id.prix * 100) / formation_by_id.prix_off)).toFixed(0) + "% de réduction" : "--" }}
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
                    {{ formation_by_id.category || "--" }} 
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
                    {{ formation_by_id.prerequisite || "Non" }}
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
  
  <!-- FORMATION MOBILE BANNER -->
  <div id="formaBanner" class="w-100 d-flex flex-nowrap justify-content-between align-items-center bg_dark px-lg-4 px-2">

    <div class="d-flex align-items-center">
      <span class="font-lg-s6 font-md-s6 font-s4 mr-lg-5 mr-2">
        {{ formation_by_id.name || "--" }}
      </span>
    </div>

    <div class="d-flex align-items-center">
      <span class="font-lg-s6 font-md-s6 font-s4 mx-2 prix">
        {{ formation_by_id.prix ? Math.floor(formation_by_id.prix).toFixed(0) + " MAD" : "Contactez-nous" }}
      </span>
      <button class="btn btn-primary" data-target="#inscriptionModal2" data-toggle="modal">S'inscrire</button>
      <button class="btn btn-secondary d-sm-inline-block d-none">Contactez</button>
    </div>

  </div>
  <!-- END FORMATION MOBILE BANNER -->
  
  <!-- Formations by Category -->
  <formation-similaire
    v-if="formations_by_cat"
    :isLoaded="is_formationsByThemeLoaded"
    :category="formation_by_id.category"
    :formations="formations_by_cat">
  </formation-similaire>

  <contactez></contactez>

  <inscription-modal v-if="is_formationsByThemeLoaded" :formation="formation_by_id">
  </inscription-modal>

  <social-share-modal v-if="is_formationsByThemeLoaded" :formation="formation_by_id">
  </social-share-modal>

</div>
<!-- END-DETAIL-FORMATION -->

</template>
