import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './store/mutations'
import { actions } from './store/actions'
import { getters } from './store/getters'

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
    // id's
    currDomaineId: undefined,
    currThemeId: undefined,
    currFormaId: undefined,
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
  getters: getters,
  mutations: mutations, // mutations
  actions: actions,
  // METHODS
  methods: {
    // UPDATE WINDOW'S TITLE
    UpdateDocTitle(title) {
      document.title = title;
    }
  }
  

});