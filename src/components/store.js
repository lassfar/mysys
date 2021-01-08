import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  // ################################################### //
  // #################### S T A T E #################### //
  // ################################################### //
  state: {
    domaines: [],
    themes: [],
    formations: [],
    domaine_by_id: [],
    theme_by_id: [],
    formation_by_id: [],
    themes_by_domaine: [],
    formations_by_theme: [],
    // is loaded
    is_domaineLoaded: false,
    is_themeLoaded: false,
    is_formationLoaded: false,
    // errors
    has_domaineError: false,
    has_themeError: false,
    has_formationError: false,
  },
  // ####################################################### //
  // #################### G E T T E R S #################### //
  // ####################################################### //
  getters: {
    //
  },
  // ########################################################### //
  // #################### M U T A T I O N S #################### //
  // ########################################################### //
  mutations: {
    SET_DOMAINES(state, data) {
      state.domaines = data;
      state.is_domaineLoaded = true; // isLoaded */
        console.log("domaines", state.domaines)
    },
    SET_THEMES(state, data) {
      state.themes = data;
      state.is_themeLoaded = true; // isLoaded */
    },
    SET_FORMATIONS(state, data) {
      state.formations = data;
      state.is_formationLoaded = true; // isLoaded */
    },
    SET_THEMES_BY_DOMAINE(state, domaineId = state.domaines[0].id) {
      console.log("domaineId", domaineId)
      // vérifier si les domaines/thèmes sont chargés
      if ((state.is_domaineLoaded && state.is_themeLoaded) && state.themes) {
        state.is_themeByDomaineLoaded = true; // isLoaded */
        state.themes_by_domaine = state.themes.filter((theme) => {
          return theme.mysysdomain_id === domaineId;
        });
        console.log("themes_by_domaine", state.themes_by_domaine)
      }
    },
    SET_FORMATIONS_BY_THEME(state, themeId = state.themes[0].id) {
      console.log("themeId", themeId)
      if ((state.is_formationLoaded && state.is_themeLoaded) && state.formations) {
        state.is_formationByThemeLoaded = true; // isLoaded */
        state.formations_by_theme = state.formations.filter((forma) => {
          return forma.mysystheme_id === themeId;
        });
      }
      console.log("formations_by_theme", state.formations_by_theme)
    },
    SET_DOMAINE_BY_ID(state, domaineId) {
      state.domaine_by_id = state.domaines.find(dom => dom.id === domaineId);
      console.info("state.domaine_by_id", state.domaine_by_id)
    },
    SET_THEME_BY_ID(state, themeId) {
      state.theme_by_id = state.themes.find(theme => theme.id === themeId);
      console.info("state.theme_by_id", state.theme_by_id);
    },
    SET_FORMATION_BY_ID(state, formaId) {
      state.formation_by_id = state.formations.find(forma => forma.id === formaId);
      console.info("state.formation_by_id", state.formation_by_id);
    }
  }, // mutations
  // ####################################################### //
  // #################### A C T I O N S #################### //
  // ####################################################### //
  actions: {
    // FETCH DATA
    async FetchDomaineData({commit}) {
      await axios.get('/api/mysys/domaines')
        .then((res) => {
          commit('SET_DOMAINES', res.data);
          console.log( "SET_DOMAINES :", res.data)
        })
        .catch((err) => console.error("err domaines", err));
    },
    async FetchThemeData({commit}) {
      await axios.get('/api/mysys/themes')
        .then((res) => {
          commit('SET_THEMES', res.data);
          console.log( "SET_THEMES :", res.data)
        })
        .catch((err) => console.error("err themes", err));
    },
    async FetchFormationData({commit}) {
      await axios.get('/api/mysys/formations')
        .then((res) => {
          commit('SET_FORMATIONS', res.data);
          console.log("SET_FORMATIONS :", res.data)
        })
        .catch((err) => console.error("err formations", err));
    },
    // SET CHILDREN BY PARENT
    async SetThemesByDomaine({commit}, domaineId) {
      await commit('SET_THEMES_BY_DOMAINE', domaineId);
    },
    async SetFormationsByTheme({commit}, themeId) {
      await commit('SET_FORMATIONS_BY_THEME', themeId);
    },
    // Set BY ID
    async SetDomaineById({commit}, domaineId) {
      commit('SET_DOMAINE_BY_ID', domaineId);
    },
    async SetThemeById({commit}, themeId) {
      commit('SET_THEME_BY_ID', themeId);
    },
    async SetFormationById({commit}, formaId) {
      commit('SET_FORMATION_BY_ID', formaId)
    },
  },
  methods: {
    
  }
  

});