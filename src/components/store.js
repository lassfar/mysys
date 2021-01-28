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
    doc_title: undefined,
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
    is_themesByDomaineLoaded: false,
    is_formationsByThemeLoaded: false,
    // errors
    domaineError: undefined,
    themeError: undefined,
    formationError: undefined,
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
      console.log("domaines" + state.domaines + " loaded: " + state.is_domaineLoaded);
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
        state.is_themesByDomaineLoaded = true; // isLoaded */
        state.has_domaineError = false; // no errors
        console.log("has dom error", state.has_domaineError);

        state.themes_by_domaine = state.themes.filter((theme) => {
          return theme.mysysdomain_id == domaineId;
        });
        console.log("SET_THEMES_BY_DOMAINE", state.themes_by_domaine)
      }
    },
    SET_FORMATIONS_BY_THEME(state, themeId = state.themes[0].id) {
      console.log("themeId in SET_FORMATIONS_BY_THEME", themeId)
      if ((state.is_formationLoaded && state.is_themeLoaded) && state.formations) {
        state.is_formationsByThemeLoaded = true; // isLoaded */
        state.has_formationError = state.has_themeError = false; // no errors
        console.log("has thm form error", state.has_themeError + " " + state.has_formationError);

        state.formations_by_theme = state.formations.filter((forma) => {
          return forma.mysystheme_id == themeId;
        });
      }
      console.log("SET_FORMATIONS_BY_THEME", state.formations_by_theme)
    },
    SET_DOMAINE_BY_ID(state, domaineId = state.domaines[0].id) {
      state.domaine_by_id = state.domaines.find(dom => dom.id === domaineId);
      console.info("SET_DOMAINE_BY_ID", state.domaine_by_id)
    },
    SET_THEME_BY_ID(state, themeId = state.themes[0].id) {
      state.theme_by_id = state.themes.find(theme => theme.id === themeId);
      console.info("SET_THEME_BY_ID", state.theme_by_id);
    },
    SET_FORMATION_BY_ID(state, formaId = state.formations[0].id) {
      state.formation_by_id = state.formations.find(forma => forma.id === formaId);
      console.info("SET_FORMATION_BY_ID", state.formation_by_id);
    },
    // ERROR MUTATIONS
    SET_DOMAINE_ERROR(state, err) {
      state.has_domaineError = true;
      state.domaineError = err;
    },
    SET_THEME_ERROR(state, err) {
      state.has_themeError = true;
      state.themeError = err;
    },
    SET_FORMATION_ERROR(state, err) {
      state.has_formationError = true;
      state.formationError = err;
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
        .catch((err) => {
          console.error("err domaines", err);
          commit('SET_DOMAINE_ERROR', err);
        });
    },
    async FetchThemeData({commit}) {
      await axios.get('/api/mysys/themes')
        .then((res) => {
          commit('SET_THEMES', res.data);
          console.log("SET_THEMES :", res.data)
        })
        .catch((err) => {
          console.error("err themes", err);
          commit('SET_THEME_ERROR', err);
        });
    },
    async FetchFormationData({commit}) {
      await axios.get('/api/mysys/formations')
        .then((res) => {
          commit('SET_FORMATIONS', res.data);
          console.log("SET_FORMATIONS :", res.data)
        })
        .catch((err) => {
          console.error("err formations", err);
          commit('SET_FORMATION_ERROR', err);
        });
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
    // 
    UpdateDocTitle(title) {
      document.title = title;
    }
  }
  

});