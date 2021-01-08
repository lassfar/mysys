<script>
import {store} from '../store'

export default {
  name: 'Search',
  data() {
    return {
      search_value: undefined
    }
  },
  mounted() {
  },
  computed: {
    domaines() { return store.state.domaines; },
    themes() { return store.state.themes; },
    formations() { return store.state.formations; }
  },
  methods: {
    Search() {
      
    },
    ToggleSearchList() {
      let searchResult = document.getElementById('searchResult').classList;
      if (searchResult.contains('d-none')) {
        searchResult.add('d-block');
        searchResult.remove('d-none');
      } else {
        searchResult.add('d-none');
        searchResult.remove('d-block');
      }
    },
  }, // methods
}
</script>

<style lang="scss">
  @import '../../assets/css/search.scss';
</style>

<template>
  <section class="container-fluid py-5">
    <div class="mysys-search-box d-flex flex-nowrap">
      <button class="mysys-search-btn bg-primary"><i class="fa fa-search"></i></button>
      <input class="mysys-search-input" type="search" name="search-input" id="searchInput" placeholder="Que cherchez-vous"
        v-model="search_value" @change="Search(search_value)" @focus="ToggleSearchList()"
        @focusout="ToggleSearchList()" />
    </div>
    <div class="mysys-search-result d-none" id="searchResult">

      <ul v-if="formations" class="mysys-search-list w-100 list-unstyled">
        <li v-for="(forma, formaIdx) in formations" :key="formaIdx" class="mysys-search-item text-secondary">
          <i class="material-icons align-middle pr-4">search</i>
          {{forma.name}}
        </li>
      </ul>
      
      <ul v-else class="mysys-search-list w-100 list-unstyled">
        <li class="mysys-search-item text-secondary">
          <small>Rechercher une formation</small>
        </li>
      </ul>

    </div>
  </section>
</template>