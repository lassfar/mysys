<script>
export default {
  name: 'Domaine',
  data () {
    return {
      currentDomaineId: null,
      domaines: [],
      themes: [],
      themes_domaine: [],
      begin: 0, end: 7,
      isLoaded: false,
      error: null,
    }
  },
  created () {
    this.FetchDomaines('/api/mysys/domaines');
  },
  watch: {
    // appeler la méthode si les paramètres changent
    '$route': 'FetchDomaines'
  },
  methods: {
    // FETCH DATA
    async FetchDomaines(url) {
      // get domaines
      await this.axios.get(url)
        .then(response => this.domaines = response.data)
        .catch(error => this.error = error)
      // fetch themes after domaines
      this.FetchThemes('/api/mysys/themes');
      this.isLoaded = true;
    },
    async FetchThemes(url) {
      // get themes
      await this.axios.get(url)
        .then(response => this.themes = response.data);
      // select the first domain name
      this.currentDomaineId = this.domaines[0].id;
      this.FindThemesByDomaine(this.currentDomaineId);
    },
    // get Themes with the selected Domaine
    async FindThemesByDomaine(domaineId) {
      this.themes_domaine = this.themes.filter((theme) => {
        return theme.mysysdomain_id === domaineId;
      });
    },
    ShowMoreLess(begin, end) {
      let moreBtn = document.getElementById('showMoreBtn');
      if (begin === 0 && end === 7) {
        this.begin = 0;
        this.end = 100;
        moreBtn.innerHTML = "△ Afficher moins";
        document.getElementById('setShadow').classList.remove("show_more_shadow");
      } else if (begin === 0 && end === 100) {
        this.begin = 0;
        this.end = 7;
        moreBtn.innerHTML = "▽ Afficher plus";
        document.getElementById('setShadow').classList.add("show_more_shadow");
      }
      // scroll to (top of) myTap after showing more items
      document.getElementById('myTab').scrollIntoView();
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
    <ul v-if="domaines && domaines.length && isLoaded" class="onglet w-100 nav nav-tabs align-items-center" id="myTab" role="tablist">

      <!-- button-left -->
      <button class="icon-btn" id="btnFixedRight" v-on:click="ScrollLeft(10)">
        <i class="material-icons">chevron_right</i>
      </button>
      <!-- end-btn-left -->

      <li class="col-lg-6 col-md-6 col-12" :key="domIndex" v-for="(dom, domIndex) in domaines"
        v-on:click="FindThemesByDomaine(dom.id)">
        <a :class="(domIndex === 0 && 'nav-link active') || 'nav-link'" :id="`${dom.id}-tab`" data-toggle="tab" :href="'#'+dom.id" role="tab" :aria-controls="dom.id" aria-selected="true">
          <div class="text-center">
            <span class="text-nowrap">
              {{dom.name ? dom.name : "--"}}
            </span>
          </div>
        </a>
      </li>

      <!-- button-right -->
      <button class="icon-btn" id="btnFixedLeft" v-on:click="ScrollLeft(-10)">
        <i class="material-icons">chevron_left</i>
      </button>
      <!-- end-btn-right -->
    </ul>
    <!-- else -->
    <ul v-else-if="domaines && !domaines.length && !isLoaded" class="onglet w-100 nav nav-tabs align-items-center text-center" id="myTab" role="tablist">
      <li class="col-12 loading p-0">
        <img src="../../assets/img/loading2.gif" class="loading_img_sm">
      </li>
    </ul>
    <!-- else -->
    <ul v-else-if="error" class="onglet w-100 nav nav-tabs text-center" id="myTab" role="tablist">
      <li class="w-100 d-flex flex-nowrap align-items-center justify-content-center">
        <i class="material-icons">error</i>
        <span>{{error}}</span>
      </li>
    </ul>
    <!-- end-domaines -->
    
  
    <div v-if="domaines && domaines.length && isLoaded" class="tab-content" id="myTabContent">
      <!-- theme -->
      <div :class="(domIndex === 0 && 'tab-pane fade show active') || 'tab-pane fade show hide'" 
          role="tabpanel" :aria-labelledby="`${domIndex}-tab`"
          :key="domIndex" v-for="(domaine, domIndex) in domaines" >

        <div :id="domIndex">
          <div class="m-cards" id="mCards">

            <!-- card -->
            <div class="m-card" :key="themeIndex" v-for="(theme, themeIndex) in themes_domaine.slice(begin, end)">
              <div class="m-card-header">
                <img class="m-card-img" v-bind:src="theme.url_img" :alt="`theme ${themeIndex}`">
                <h2 class="m-card-title">{{theme.name}}</h2>
              </div>
              <div class="m-card-content">
                <h2 class="font-lg-8 font-md-s6 font-sm-4 font-s6 text_bold">{{theme.name}}</h2>
                <p class="m-card-desc text-light ">
                  {{theme.desc ? theme.desc.substring(0, 200) + ".." : "--"}}
                </p>
                                
                <router-link class="text-light font_sm d-block" :to="{ name: 'allformation', params: {theme_param: theme.id, domaine_param: currentDomaineId} }">
                  En savoir plus
                </router-link>

              </div>
            </div>
            <!-- end-card -->
            <div class="show_more_shadow" id="setShadow"></div>

          </div>
          <!-- end-cards -->

          <div class="row p-2 d-flex justify-content-center">
            <a class="font_sm font-weight-light" v-on:click="ShowMoreLess(begin, end)" id="showMoreBtn" style="cursor: pointer;">
             ▽ Afficher plus 
            </a>
          </div>

        </div>
        <!-- end-theme -->
      </div>
      <!-- tab-pane -->
    </div>
    <!-- tab-content -->
    <!-- LOADING .. -->
    <div v-else-if="domaines && !domaines.length && !isLoaded" class="loading">
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
