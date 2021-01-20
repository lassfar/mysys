<script>
import { mapActions } from 'vuex';
import { store } from '../store';
import Theme from './Theme';

export default {
  name: 'Domaine',
  components: {
    Theme
  },
  mounted () {
  }, // MOUNTED
  computed: {
    domaines() { return store.state.domaines; },
    themes_by_domaine() { return store.state.themes_by_domaine; },
    formations_by_theme() { return store.state.formations_by_theme; },
    is_domaineLoaded() { return store.state.is_domaineLoaded; },
    is_themeLoaded() { return store.state.is_themeLoaded; },
    is_formationLoaded() { return store.state.is_formationLoaded; },
    is_themeByDomaineLoaded() { return store.state.is_themeByDomaineLoaded; },
    is_formationsByThemeLoaded() { return store.state.is_formationsByThemeLoaded; }
  }, // computed
  methods: {
    ...mapActions([
      'FetchDomaineData',
      'FetchThemeData',
      'FetchFormationData',
      'SetThemesByDomaine',
      'SetFormationsByTheme'
    ]),
    handleAction(action, targetId = null) {
      store.dispatch(action, targetId);
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
  @import '../../assets/css/domaine.scss';
</style>

<template>
<div id="domaine">

  <div class="container-fluid py-5">

    <div class="main-title">
      <span class="title">Nos Domaines de Formation</span>
    </div>

    <!-- domaines -->
    <!-- if -->
    <ul v-if="is_domaineLoaded && domaines && domaines.length" class="onglet w-auto nav nav-tabs align-items-center" id="myTab" role="tablist">

      <!-- button-left -->
      <button class="icon-btn bg-light" id="btnFixedRight" @click="ScrollLeft(10)">
        <i class="material-icons">chevron_right</i>
      </button>
      <!-- end-btn-left -->

      <li class="col-lg-6 col-md-6 col-12" :key="`dom${domIndex}`" v-for="(dom, domIndex) in domaines"
        @click="handleAction('SetThemesByDomaine', dom.id)">

        <router-link :class="(domIndex === 0 && 'nav-link active') || 'nav-link'" 
          :id="`domaine${dom.id}-tab`" :to="`#domaine${dom.id}`" data-toggle="tab" role="tab" :aria-controls="dom.id" aria-selected="true">
          <div class="text-center">
            <span class="">
              {{dom.name ? dom.name : "--"}}
            </span>
          </div>
        </router-link>

      </li>

      <!-- button-right -->
      <button class="icon-btn bg-light" id="btnFixedLeft" @click="ScrollLeft(-10)">
        <i class="material-icons">chevron_left</i>
      </button>
      <!-- end-btn-right -->
    </ul>
    <!-- else -->
    <ul v-else-if="is_domaineLoaded && domaines && !domaines.length" class="onglet w-100 nav nav-tabs align-items-center text-center" id="myTab" role="tablist">
      <li class="col-12 loading p-0">
        <img src="../../assets/img/loading2.gif" class="loading_img_sm">
      </li>
    </ul>
    <!-- else -->
    <ul v-else class="onglet w-100 nav nav-tabs text-center" id="myTab" role="tablist">
      <li class="w-100 d-flex flex-nowrap align-items-center justify-content-center">
        <i class="material-icons">error</i>
        <span>{{ "No domaines" }}</span>
      </li>
    </ul>
    <!-- end-domaines -->
  
    <div v-if="is_domaineLoaded && domaines && domaines.length" class="tab-content" id="myTabContent">
      <!-- theme -->
      <div v-for="(domaine, domIndex) in domaines" :class="(domIndex === 0 && 'tab-pane fade show active') || 'tab-pane fade show hide'" 
          role="tabpanel" :aria-labelledby="`domaine${domIndex}-tab`"
          :key="`domaine${domIndex}`">

        <div :id="`domaine${domIndex}`">
          <!-- THEMES -->
          <theme 
            :themes_by_domaine="themes_by_domaine">
          </theme>
          <!-- END-THEMES -->

        </div>
        <!-- end-theme -->
      </div>
      <!-- tab-pane -->
    </div>
    <!-- tab-content -->
    <!-- LOADING .. -->
    <div v-else-if="!is_domaineLoaded && domaines && !domaines.length" class="loading">
      <img :src="require('../../assets/img/loading.gif')" class="loading_img_sm" alt="loading pic">
    </div>
    <!-- LOADING .. -->
    <!-- ERROR .. -->
    <div v-else-if="error" class="loading">
      <li class="w-100 d-flex flex-nowrap align-items-center justify-content-center">
        <i class="material-icons">error</i>
        <span class="font-s10">{{error}}</span>
      </li>
    </div>
    <!-- ERROR .. -->



  </div>
  <!-- end-container-fluid -->
  
</div>
</template>
