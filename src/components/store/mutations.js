


export const mutations = {
  // ########################################################### //
  // #################### M U T A T I O N S #################### //
  // ########################################################### //
  // SET ALL DOMAINES
  SET_DOMAINES(state, data) {
    state.domaines = data;
    state.is_domaineLoaded = true; // isLoaded */
    //console.log("domaines" + state.domaines + " loaded: " + state.is_domaineLoaded);
  },
  // SET ALL THEMES
  SET_THEMES(state, data) {
    state.themes = data;
    state.is_themeLoaded = true; // isLoaded */
  },
  // SET ALL FORMATIONS
  SET_FORMATIONS(state, data) {
    state.formations = data;
    state.is_formationLoaded = true; // isLoaded */
  },
  // FIND MULTIPLE THEMES BY ONE DOMAINE
  SET_THEMES_BY_DOMAINE(state, domaineId = state.domaines[0].id) {
    //console.log("domaineId", domaineId)
    // vérifier si les domaines/thèmes sont chargés
    if ((state.is_domaineLoaded && state.is_themeLoaded) && state.themes) {
      state.is_themesByDomaineLoaded = true; // isLoaded */
      state.has_domaineError = false; // no errors
      //console.log("has dom error", state.has_domaineError);

      state.themes_by_domaine = state.themes.filter((theme) => {
        return theme.mysysdomain_id == domaineId;
      });
      //console.log("SET_THEMES_BY_DOMAINE", state.themes_by_domaine)
    }
  },
  // FIND MULTIPLE FORMATIONS BY ONE THEME
  SET_FORMATIONS_BY_THEME(state, themeId = state.themes[0].id) {
    //console.log("themeId in SET_FORMATIONS_BY_THEME", themeId)
    if ((state.is_formationLoaded && state.is_themeLoaded) && state.formations) {
      state.is_formationsByThemeLoaded = true; // isLoaded */
      state.has_formationError = state.has_themeError = false; // no errors
      //console.log("has thm form error", state.has_themeError + " " + state.has_formationError);

      state.formations_by_theme = state.formations.filter((forma) => {
        return forma.mysystheme_id == themeId;
      });
    }
    //console.log("SET_FORMATIONS_BY_THEME", state.formations_by_theme)
  },
  // SET ONE DOMAINE BY ID
  SET_DOMAINE_BY_ID(state, domaineId = state.domaines[0].id) {
    state.domaine_by_id = state.domaines.find(dom => dom.id === domaineId);
    //console.info("SET_DOMAINE_BY_ID", state.domaine_by_id)
  },
  // SET ONE THEME BY ID
  SET_THEME_BY_ID(state, themeId = state.themes[0].id) {
    state.theme_by_id = state.themes.find(theme => theme.id === themeId);
    //console.info("SET_THEME_BY_ID", state.theme_by_id);
  },
  // SET ONE FORMATION BY ID
  SET_FORMATION_BY_ID(state, formaId = state.formations[0].id) {
    state.formation_by_id = state.formations.find(forma => forma.id === formaId);
    //console.info("SET_FORMATION_BY_ID", state.formation_by_id);
  },
  // *** SET CURRENT NEEDED IDs ***
  SET_CURR_DOMAINE_ID(state, domaineId = state.domaines[0].id) {
    //console.log("SET_CURR_DOMAINE_ID", domaineId)
    domaineId && (state.currDomaineId = domaineId);
  },
  // SET IDs
  SET_CURR_THEME_ID(state, themeId = state.themes[0].id) {
    //console.log("SET_CURR_THEME_ID", themeId)
    themeId && (state.currThemeId = themeId);
  },
  // SET IDs
  SET_CURR_FORMATION_ID(state, formaId = state.formations[0].id) {
    //console.log("SET_CURR_FORMATION_ID", formaId)
    formaId && (state.currFormaId = formaId);
  },
  // *** SET ERRORS ***
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
  },
}