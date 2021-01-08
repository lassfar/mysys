<script>
export default {
  name: 'Theme',
  data () {
    return {
      begin: 0, end: 7,
    }
  },
  props: {
    themes_by_domaine: {type: Array, required: true},
  },
  methods: {
    // UI Events
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
      // scroll to (top of) myTap after loading more items
      document.getElementById('myTab').scrollIntoView();
    },
  }
}
</script>

<template>
  <div id="themes">
  
    <!-- THEMES -->
    <div class="m-cards" id="mCards">

      <!-- card -->
      <div class="m-card" :key="themeIdx" v-for="(theme, themeIdx) in themes_by_domaine.slice(begin, end)">
        <div class="m-card-header">
          <img class="m-card-img" v-bind:src="theme.url_img" :alt="`theme ${themeIdx}`">
          <h2 class="m-card-title">{{theme.name}}</h2>
        </div>
        <div class="m-card-content">
          <h2 class="font-lg-8 font-md-s6 font-sm-4 font-s6 text_bold">{{theme.name}}</h2>
          <p class="m-card-desc text-light ">
            {{theme.desc ? theme.desc.substring(0, 200) + ".." : "--"}}
          </p>
                          
          <router-link class="d-block text-light font_sm" :to="{ name: 'allformation', params: {theme_param: theme.id, domaine_param: theme.mysysdomain_id} }">
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
</template>

<style lang="scss">
  @import '../../assets/css/domaine';
</style>