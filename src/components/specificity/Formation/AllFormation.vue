<script>
import NavBar from '../../commun/NavBar.vue';

export default {
  name: 'AllFormation',
  components: {
    NavBar
  },
  data () {
    return {
      domaineId: null,
      themeId: null,
      domaine_param: null,
      theme_param: null,
      currentDomaine: [],
      currentTheme: [],
      domaines: null,
      themes: null,
      formations: null,
      themes_by_domaine: [],
      formations_by_theme: [],
      participants: [],
      loading: false
    }
  },
  created() {
    this.domaine_param = this.$route.params.domaine_param ? this.$route.params.domaine_param : undefined;
    this.theme_param = this.$route.params.theme_param ? Math.floor(this.$route.params.theme_param) : undefined;
    this.FetchAPI('/api/mysys/domaines', '/api/mysys/themes', '/api/mysys/formations');
  },
  watch: {
    // appeler la méthode si les paramètres changent
    '$route': 'FetchAPI'
  },
  methods: {
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
    
    // ****** FETCH DATA ******
    async FetchAPI(dom_url, thm_url, form_url) {
      // get domaines
      await this.axios.get(dom_url).then(res => this.domaines = res.data);
      // get themes
      await this.axios.get(thm_url).then(res => this.themes = res.data);
      // get formations
      await this.axios.get(form_url).then(res => this.formations = res.data);
      
      this.GetById(this.domaine_param, this.theme_param);
      this.GetChildsByParent(this.domaine_param, this.theme_param);
      this.loading = true;
    },
    // END FETCH

    // *** GET BY DOMAINE/THEME *** //
    async GetChildsByParent(domaineId, themeId) {
      // get themes by domaine
      console.log("child by parent domaine theme id params : ", domaineId + " " + themeId);
      this.themes_by_domaine = this.themes.filter((theme) => {
        return (
          (domaineId && theme.mysysdomain_id === domaineId) || 
          (theme.mysysdomain_id === (this.currentDomaine[0] ? this.currentDomaine[0].id : this.currentDomaine.id))
        ) 
      });
      // get formations by theme
      this.formations_by_theme = this.formations.filter((formation) => {
        return (
          (themeId && formation.mysystheme_id === themeId) || 
          (formation.mysystheme_id === (this.currentTheme[0] ? this.currentTheme[0].id : this.currentTheme.id))
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
    }

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
      <select class="subselect" v-model="domaineId" v-on:click="FindThemesByDomaine(domaineId)">
        <option :value="dom.id" :selected="((currentDomaine[0] ? currentDomaine[0].id : currentDomaine.id) === dom.id)" class="subelement" 
          :key="domIndex" v-for="(dom, domIndex) in domaines" >
          {{ dom.name }}
        </option>
      </select>
    </div>
  </div>
  
  <div class="container-fluid pb-5">

    <!-- themes -->
    <ul v-if="themes_by_domaine && themes_by_domaine.length > 0 && loading" class="onglet w-100 nav nav-tabs align-items-center" id="myTab" role="tablist">

      <!-- button-right -->
      <button class="icon-btn bg-light" id="btnFixedLeft" v-on:click="ScrollLeft(-10)">
        <i class="material-icons">chevron_left</i>
      </button>
      <!-- end-btn-right -->

      <li class="w-auto" :key="themeIndex" v-for="(thm, themeIndex) in themes_by_domaine" v-on:click="FindFormationByTheme(thm.id)">
        <router-link :class="((currentTheme[0] ? currentTheme[0].id : currentTheme.id) === thm.id && 'nav-link active') || 'nav-link'" :id="`${thm.id}-tab`" data-toggle="tab" :to="`#${thm.id}`" role="tab" :aria-controls="thm.id" aria-selected="true">
          <div class="text-center">
            <span class="text-nowrap">{{ thm.name }}</span>
          </div>
        </router-link>
      </li>

      <!-- button-left -->
      <button class="icon-btn bg-light" id="btnFixedRight" v-on:click="ScrollLeft(10)">
        <i class="material-icons">chevron_right</i>
      </button>
      <!-- end-btn-left -->
      
    </ul>
    <!-- else -->
    <ul v-else-if="themes_by_domaine && themes_by_domaine.length === 0 && loading" class="onglet w-100 nav nav-tabs align-items-center text-center" id="myTab" role="tablist">
      <li class="col-12">
        <h4>Aucun sous domaine pour l'instant.</h4>
      </li>
    </ul>
    <!-- else -->
    <ul v-else class="onglet w-100 nav nav-tabs align-items-center text-center" id="myTab" role="tablist">
      <li class="col-12 loading2">
        <img src="../../../assets/img/loading2.gif" class="loading-img" alt="loading pic">
      </li>
    </ul>
    <!-- end-themes -->
    
    <!-- scroll-buttons -->
    <div class="d-flex justify-content-between">
    </div>
    <!-- scroll-buttons -->


    <!-- ################################################################# -->

    <div v-if="formations_by_theme && formations_by_theme.length && loading" class="tab-content" id="myTabContent">

      <div class="tab-pane fade show active" id="dev" role="tabpanel" aria-labelledby="dev-tab">
        <div id="dev">
          <div class="t-cards">

            <!-- card -->
            <div :key="formIndex" v-for="(form, formIndex) in formations_by_theme" class="t-card">
              <!-- card-header -->
           
              <div class="t-card-header">
                <img class="t-card-img" :src="form.url_img" alt="card-img">
                <span class="t-card-title">{{ form.name.substring(0, 70) }}</span>
                <span class="t-card-desc">
                  {{ form.description.substring(0, 70) + ".." }}
                </span>
                <span class="mt-2" :class="form.certif ? 'badge badge-success' : 'badge badge-warning'">
                  {{form.certif ? "Certifiante" : "Non certifiante"}}
                </span>
              </div>
              <!-- card-content -->
              <div class="t-card-content">
               <router-link :to="{name: 'detailformation', params: { form_param: form.id } }">
                <h1 class="title h5 font-weight-bold">{{ form.name }}</h1>
               </router-link>
                <span class="description font-s4">
                  {{ form.description.substring(0, 100) + ".." }}
                </span>
                <small class="text-secondary w-100 py-1">
                  <span class="font-s3">Formateur : </span>
                  <strong class="font-s3">
                    {{ form.professeur ? form.professeur : "--" }}
                  </strong>
                </small>
                
                <div class="d-block">
                  <router-link :to="{name: 'detailformation', params: { form_param: form.id } }" class="font-s3">En savoir plus</router-link>
                </div>
              </div>    
            

            </div>
            <!-- end-card -->

          </div>
          <!-- end-cards -->
        </div>
      <!-- end-formation -->
      </div>

    </div>
    <!-- tab-content -->
    <div v-else-if="formations_by_theme && !formations_by_theme.length && loading" class="loading">
      <h3>Aucune formation pour l'instant.</h3>
    </div>
    <!-- LOADING .. -->
    <div v-else class="loading">
      <img src="../../../assets/img/loading.gif" class="loading-img">
    </div>
    <!-- LOADING .. -->





  </div>
  <!-- end-container-fluid -->


</div>
</template>
