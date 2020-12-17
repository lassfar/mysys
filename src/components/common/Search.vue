<script>
export default {
  name: 'Search',
  data() {
    return {
      search_value: undefined,
      domaines: [],
      themes: [],
    }
  },
  methods: {
    async MysysSearch() {
      
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/search.scss';
</style>

<template>
  <section class="container-fluid py-5">
    <div class="mysys-search-box d-flex flex-nowrap">
      <button class="mysys-search-btn bg-primary"><i class="fa fa-search"></i></button>
      <input class="mysys-search-input" type="search" name="search-input" id="searchInput" placeholder="Que cherchez-vous"
        v-model="search_value" v-on:change="MysysSearch(search_value)" v-on:focus="ToggleSearchList()"
        v-on:focusout="ToggleSearchList()" />
    </div>
    <div class="mysys-search-result d-none" id="searchResult">
      <ul class="mysys-search-list w-100 list-unstyled">
        <li class="mysys-search-item text-secondary">Formation Javascript ?</li>
      </ul>
    </div>
  </section>
</template>