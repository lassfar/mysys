<script>
import NavBar from '../../common/NavBar.vue'
import FormationCard from '../../ui/FormationCard.vue'
import Contactez from '../../common/Contactez.vue'
import {store} from '../../store'
// import { mapActions } from 'vuex'

export default {
  name: 'AllFormation',
  components: {
    NavBar,
    FormationCard,
    Contactez
  },
  data () {
    return {
      currDomaineId: null,
      currThemeId: null,
      domaine_param: undefined,
      theme_param: undefined,
    }
  },
  mounted() {
    this.domaine_param = this.$route.params.domaine_param ? Math.round(this.$route.params.domaine_param) : undefined;
    this.theme_param = this.$route.params.theme_param ? Math.round(this.$route.params.theme_param) : undefined;
    this.currDomaineId = this.domaine_param;
    this.currThemeId = this.theme_param;
  },
  async created() {
    document.title = "MySYS • Formations";
    window.scrollTo(0, 0);
    
    // ###### DISPATCH ~ ACTIONS ###### //
    // get Data
    await store.dispatch('FetchDomaineData');
    await store.dispatch('FetchThemeData');
    await store.dispatch('FetchFormationData');
    // get domaine_by_id and themes_by_domaine
    if (this.domaine_param) {
      await store.dispatch('SetDomaineById', this.domaine_param);
      await store.dispatch('SetThemesByDomaine', this.domaine_param);
    } else { // by default
      await store.dispatch('SetDomaineById');
      await store.dispatch('SetThemesByDomaine');
    }
    // get theme_by_id and formations_by_theme
    if (this.theme_param) {
      await store.dispatch('SetThemeById', this.theme_param);
      await store.dispatch('SetFormationsByTheme', this.theme_param);
    } else {
      await store.dispatch('SetThemeById');
      await store.dispatch('SetFormationsByTheme');
    }
  },
  computed: {
    // *** data from state ***
    domaines() { return store.state.domaines; },
    themes_by_domaine() { return store.state.themes_by_domaine; },
    formations_by_theme() { return store.state.formations_by_theme; },
    // > data by id
    domaine_by_id() { return store.state.domaine_by_id; },
    theme_by_id() { return store.state.theme_by_id; },
    // > is data loaded
    is_domaineLoaded() { return store.state.is_domaineLoaded; },
    is_themeLoaded() { return store.state.is_themeLoaded; },
    is_formationLoaded() { return store.state.is_formationLoaded; },
    // > errors
    has_domaineError() { return store.state.has_domaineError },
    has_themeError() { return store.state.has_themeError },
    has_formationError() { return store.state.has_formationError },
  },
  methods: {
    async handleAction(action, targetId = null) {
      await store.dispatch(action, targetId);
    },
  } // METHODS
}
</script>

<style lang="scss">
  @import '../../../assets/css/allformation.scss';
</style>

<template>
<div id="allFormation">
  <NavBar />
  <div class="container-fluid pb-2">
    <div class="main-title">
      <span class="title">Nos Formations</span>
      <select class="subselect" v-if="is_domaineLoaded && domaines" 
        @click="handleAction('SetThemesByDomaine', currDomaineId)" v-model="currDomaineId" >
        <option v-for="(dom, domIndex) in domaines" :value="dom.id" 
          :selected="(currDomaineId === dom.id)" :key="domIndex" >
          {{ dom.name }}
        </option>
      </select>
      <select class="subselect" v-else>
        <option class="subelement">
          {{ "..." }}
        </option>
      </select>
    </div>
  </div>
  
  <div class="container-fluid pb-5">

    <!-- themes -->
    <ul v-if="is_themeLoaded && themes_by_domaine && themes_by_domaine.length > 0" class="onglet w-100 nav nav-tabs align-items-center" id="myTab" role="tablist">
      <!-- button-right -->
      <button class="icon-btn bg-light" id="btnFixedLeft" @click="ScrollLeft(-10)">
        <i class="material-icons">chevron_left</i>
      </button>
      <!-- end-btn-right -->

      <li class="w-auto" v-for="(thm, thmIdx) in themes_by_domaine" :key="thmIdx"
        @click="handleAction('SetFormationsByTheme', thm.id)">

        <router-link :class="(currThemeId === thm.id && 'nav-link active') || 'nav-link'"
          :id="`theme${thm.id}-tab`" :to="`#theme${thm.id}`" data-toggle="tab" role="tab" :aria-controls="`theme${thm.id}`" aria-selected="true">
          <div class="text-center">
            <span class="text-nowrap">
              {{ thm.name ? thm.name : "--" }}
            </span>
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
    <ul v-else-if="is_themeLoaded && themes_by_domaine && themes_by_domaine.length === 0" class="onglet w-100 nav nav-tabs align-items-center text-center" id="myTab" role="tablist">
      <li class="col-12">
        <h4>Aucun thème pour l'instant.</h4>
      </li>
    </ul>
    <!-- else -->
    <ul v-else-if="!is_themeLoaded" class="onglet w-100 nav nav-tabs align-items-center text-center" id="myTab" role="tablist">
      <li class="col-12 loading p-0">
        <img src="../../../assets/img/loading2.gif" class="loading_img_sm" alt="loading pic">
      </li>
    </ul>
    <!-- else -->
    <ul v-else-if="has_themeError" class="onglet w-100 nav nav-tabs text-center" id="myTab" role="tablist">
      <li class="w-100 d-flex flex-nowrap align-items-center justify-content-center">
        <i class="material-icons">error</i>
        <span>{{theme_error}}</span>
      </li>
    </ul>
    <!-- end-themes -->


    <!-- ################################################################# -->

    <div v-if="is_formationLoaded && formations_by_theme && formations_by_theme.length" class="tab-content" id="myTabContent">

      <div class="tab-pane fade show active" id="dev" role="tabpanel" aria-labelledby="dev-tab">
        <div id="dev">
          <formation-card :formations="formations_by_theme"></formation-card>
        </div>
      <!-- end-formation -->
      </div>

    </div>
    <!-- tab-content -->
    <div v-else-if="is_formationLoaded && formations_by_theme && !formations_by_theme.length" class="loading px-4">
      <h3 class="text_mysyscolor1 font-lg-s8 font-xs-s4 font-s4 text-center">
        <!-- <i class="material-icons">assistant_photo</i> -->
        Aucune formation pour l'instant
        <i class="material-icons">golf_course</i>
        <!-- <button class="icon-btn bg-light" @click="handleAction('SetFormationsByTheme', currThemeId)">
          <i class="material-icons">refresh</i>
        </button> -->
      </h3>
    </div>
    <!-- LOADING .. -->
    <div v-else-if="!has_formationError && !is_formationLoaded" class="loading">
      <img src="../../../assets/img/loading.gif" class="loading_img_sm">
    </div>
    <!-- LOADING .. -->
    <!-- ERROR .. -->
    <div v-else-if="has_formationError && !is_formationLoaded" class="loading">
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
