<script>
import NavBar from '../../common/NavBar.vue';
import FormationCard from '../../ui/FormationCard.vue';
import Contactez from '../../common/Contactez.vue';

export default {
  name: 'AllFormation',
  components: {
    NavBar,
    FormationCard,
    Contactez
  },
  data () {
    return {
      domaineId: undefined,
      themeId: undefined,
      domaine_param: undefined,
      theme_param: undefined,
      currentDomaine: [],
      currentTheme: [],
      domaines: undefined,
      themes: undefined,
      formations: undefined,
      themes_by_domaine: [],
      formations_by_theme: [],
      domaine_error: undefined,
      theme_error: undefined,
      forma_error: undefined,
      isLoaded: false
    }
  },
  created() {
    window.scrollTo(0, 0);
    document.title = "MySYS • Formations";
    this.domaine_param = this.$route.params.domaine_param ? this.$route.params.domaine_param : undefined;
    this.theme_param = this.$route.params.theme_param ? Math.round(this.$route.params.theme_param) : undefined;
    this.FetchAPI('/api/mysys/domaines', '/api/mysys/themes', '/api/mysys/formations');
  },
  watch: {
    // appeler la méthode si les paramètres changent
    // '$route': 'FetchAPI'
  },
  methods: {
    // ****** FETCH DATA ******
    async FetchAPI(dom_url, thm_url, form_url) {
      // get domaines
      await this.axios.get(dom_url).then(res => this.domaines = res.data).catch((err) => this.domaine_error = err);
      console.log("dom_url :", this.domaine_error)
      // get themes
      await this.axios.get(thm_url).then(res => this.themes = res.data).catch((err) => this.theme_error = err);
      console.log("thm_url :", this.theme_error)
      // get formations
      await this.axios.get(form_url).then(res => this.formations = res.data).catch((err) => this.forma_error = err);
      console.log("form_url :", this.forma_error)
      
      this.GetById(this.domaine_param, this.theme_param);
      this.GetChildsByParent(this.domaine_param, this.theme_param);
      this.isLoaded = true;
    },
    // END FETCH

    // *** GET BY DOMAINE/THEME *** //
    async GetChildsByParent(domaineId, themeId) {
      // get themes by domaine
      console.log("child by parent domaine theme id params : ", domaineId + " " + themeId);
      this.themes_by_domaine = this.themes.filter((theme) => {
        return (
          // récup. formations à partir theme.id url
          (domaineId && theme.mysysdomain_id === domaineId) || 
          // sinon récupérer le premier 'domaine' avec ses 'thèmes'
          (theme.mysysdomain_id === ((this.currentDomaine[0] && this.currentDomaine[0].id) || this.currentDomaine.id))
        ) 
      });
      // get formations by theme
      this.formations_by_theme = this.formations.filter((formation) => {
        return (
          // récup. formations à partir theme.id url
          (themeId && formation.mysystheme_id === themeId) || 
          // sinon récupérer le premier 'thème' avec ses 'formations'
          (formation.mysystheme_id === ((this.currentTheme[0] && this.currentTheme[0].id) || this.currentTheme.id))
        ) 
      });
      console.log("domaines", this.domaines);
      console.log("themes", this.themes);
      console.log("formations", this.formations);
      console.log("themes_by_domaine", this.themes_by_domaine);
      console.log("formations_by_theme", this.formations_by_theme);
    },

    // *** GET BY ID *** //
    async GetById(domaineId, themeId) {
      console.log("by id domaine theme id params : ", domaineId + " " + themeId);
      // get current domaine from url param
      this.currentDomaine = this.domaines.filter((domaine) => {
        return domaineId ? 
          domaine.id === domaineId : 
          domaine.id === this.domaines[0].id;
      });
      // initialiser l'id domaine par defaut
      this.domaineId = this.domaines[0].id;
      // get current theme from url param
      this.currentTheme = this.themes.filter((theme) => {
        return themeId ? 
          theme.id === themeId : 
          theme.id === this.themes[0].id;
      });
      console.log("current domaine", this.currentDomaine, "current theme", this.currentTheme);
    },
    // EVENT TRIGGER
    FindThemesByDomaine(domaineId) {
      this.themes_by_domaine = this.themes.filter((themes) => {
        return domaineId && themes.mysysdomain_id === domaineId;
      });
      console.log("Find themes_by_domaine : ", this.themes_by_domaine);
    },
    FindFormationByTheme(themeId) {
      this.formations_by_theme = this.formations.filter((formation) => {
        return themeId && formation.mysystheme_id === themeId;
      });
    },
    // scroll
    ScrollLeft(valToScroll) { 
      let myTab = document.getElementById('myTab');
      let amount = 0;
      let scrollInterv = setInterval(function () {
        myTab.scrollLeft += valToScroll;
        amount += valToScroll;
        amount === 200 | amount === -200 && clearInterval(scrollInterv);
      }, 10);
    },
    

  } // METHODS
}
</script>

<style lang="scss">
  @import '../../../assets/css/allformation.scss';
</style>

<template>
<div id="allFormation">
  <NavBar/>
  <div class="container-fluid pb-2">
    <div class="main-title">
      <span class="title">Nos Formations</span>
      <!-- <span class="subtitle">{{domaine[0].name}}</span> -->
      <select class="subselect" v-if="domaines && isLoaded" v-model="domaineId" @click="FindThemesByDomaine(domaineId)">
        <option :value="dom.id" :selected="((currentDomaine[0] ? currentDomaine[0].id : currentDomaine.id) === dom.id)" class="subelement" 
          :key="domIndex" v-for="(dom, domIndex) in domaines" >
          {{ dom.name }}
        </option>
      </select>
      <select class="subselect" v-else>
        <option class="subelement">
          {{ domaine_error }}
        </option>
      </select>
    </div>
  </div>
  
  <div class="container-fluid pb-5">

    <!-- themes -->
    <ul v-if="themes_by_domaine && themes_by_domaine.length > 0 && isLoaded" class="onglet w-100 nav nav-tabs align-items-center" id="myTab" role="tablist">

      <!-- button-right -->
      <button class="icon-btn bg-light" id="btnFixedLeft" @click="ScrollLeft(-10)">
        <i class="material-icons">chevron_left</i>
      </button>
      <!-- end-btn-right -->

      <li class="w-auto" :key="themeIndex" v-for="(thm, themeIndex) in themes_by_domaine" @click="FindFormationByTheme(thm.id)">
        <router-link :class="((currentTheme[0] ? currentTheme[0].id : currentTheme.id) === thm.id && 'nav-link active') || 'nav-link'" :id="`${thm.id}-tab`" data-toggle="tab" :to="`#${thm.id}`" role="tab" :aria-controls="thm.id" aria-selected="true">
          <div class="text-center">
            <span class="text-nowrap">{{ thm.name }}</span>
          </div>
        </router-link>
      </li>

      <!-- button-left -->
      <button class="icon-btn bg-light" id="btnFixedRight" @click="ScrollLeft(10)">
        <i class="material-icons">chevron_right</i>
      </button>
      <!-- end-btn-left -->
      
    </ul>
    <!-- else -->
    <ul v-else-if="themes_by_domaine && themes_by_domaine.length === 0 && isLoaded" class="onglet w-100 nav nav-tabs align-items-center text-center" id="myTab" role="tablist">
      <li class="col-12">
        <h4>Aucun thème pour l'instant.</h4>
      </li>
    </ul>
    <!-- else -->
    <ul v-else-if="!theme_error && !isLoaded" class="onglet w-100 nav nav-tabs align-items-center text-center" id="myTab" role="tablist">
      <li class="col-12 loading p-0">
        <img src="../../../assets/img/loading2.gif" class="loading_img_sm" alt="loading pic">
      </li>
    </ul>
    <!-- else -->
    <ul v-else-if="theme_error && !isLoaded" class="onglet w-100 nav nav-tabs text-center" id="myTab" role="tablist">
      <li class="w-100 d-flex flex-nowrap align-items-center justify-content-center">
        <i class="material-icons">error</i>
        <span>{{theme_error}}</span>
      </li>
    </ul>
    <!-- end-themes -->


    <!-- ################################################################# -->

    <div v-if="formations_by_theme && formations_by_theme.length && isLoaded" class="tab-content" id="myTabContent">

      <div class="tab-pane fade show active" id="dev" role="tabpanel" aria-labelledby="dev-tab">
        <div id="dev">
          <formation-card :formations="formations_by_theme"></formation-card>
        </div>
      <!-- end-formation -->
      </div>

    </div>
    <!-- tab-content -->
    <div v-else-if="formations_by_theme && !formations_by_theme.length && isLoaded" class="loading px-4">
      <h3 class="text_mysyscolor1 font-lg-s8 font-xs-s4 font-s4 text-center">
        <!-- <i class="material-icons">assistant_photo</i> -->
        Aucune formation pour l'instant.
        <i class="material-icons d-sm-none">assistant_photo</i>
      </h3>
    </div>
    <!-- LOADING .. -->
    <div v-else-if="!forma_error && !isLoaded" class="loading">
      <img src="../../../assets/img/loading.gif" class="loading_img_sm">
    </div>
    <!-- LOADING .. -->
    <!-- ERROR .. -->
    <div v-else-if="forma_error && !isLoaded" class="loading">
      <li class="w-100 d-flex flex-nowrap align-items-center justify-content-center">
        <i class="material-icons">error</i>
        <span class="font-s10">{{forma_error}}</span>
      </li>
    </div>
    <!-- ERROR .. -->


  </div>
  <!-- end-container-fluid -->
  
  <contactez></contactez>


</div>
</template>
