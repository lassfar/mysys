<script>

export default {
  name: 'Inscription',
	data () {
		return {
			nom: null, prenom: null, tele: null, email: null, type: null, ville: null,
			domaines: [],
			themes: [],
			themes_by_domaine: [],
			formations_by_theme: [],
      domaineId: null,
      themeId: null,
      formationId: null,
      loading: false,
		}
	},
  created() {
    this.FetchAPI('/api/mysys/domaines', '/api/mysys/themes', '/api/mysys/formations');
  },
	methods: {
    // ****** FETCH DATA ******
    async FetchAPI(dom_url, thm_url, form_url) {
      // get domaines
      await this.axios.get(dom_url).then(res => this.domaines = res.data);
      // initialize the domaineId
      // get themes
      await this.axios.get(thm_url).then(res => this.themes = res.data);
      // get formations
      await this.axios.get(form_url).then(res => this.formations = res.data);
      
      this.loading = true;
    },
    // EVENT TRIGGER
    FindThemesByDomaine(domaineId) {
      this.themes_by_domaine = this.themes.filter((themes) => {
        return domaineId && themes.mysysdomain_id === domaineId;
      });
      console.log("Find themes_by_domaine : ", this.themes_by_domaine);
    },
    FindFormationByTheme(themeId) {
      this.formations_by_theme = this.formations.filter((formation) => {
        return themeId && formation.mysystheme_id === themeId;
      });
    }
	}
}
</script>

<style lang="scss">
  @import '../../assets/css/inscription.scss';
</style>



<template>
<div id="inscription">
  <div class="modal fade" id="inscriptionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title h1" id="exampleModalLabel">S'inscrire</span>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="text-light" aria-hidden="true">
              <i class="material-icons">close</i>
            </span>
          </button>
        </div>
        <div class="modal-body p-4">
        
          <div class="container-fluid">
            <form>
              <!-- nom et prenom -->
              <div class="row">
                <div class="col-12 col-md-6 col-lg-6 p-2">
                  <label for="nom" class="col-form-label">Nom</label>
                  <input type="text" class="form-control" id="nom" v-model="nom" placeholder="Alaoui" />
                </div>
                <div class="col-12 col-md-6 col-lg-6 p-2">
                  <label for="prenom" class="col-form-label">Prénom</label>
                  <input type="text" class="form-control" id="prenom" v-model="prenom" placeholder="Ahmad" />
                </div>
              </div>
              <!-- row -->
              <!-- tele adresse -->
              <div class="row">
                <div class="col-12 p-2">
                  <label for="tele" class="col-form-label">Téléphone</label>
                  <input type="text" class="form-control" id="tele" v-model="tele" placeholder="+212 22 22 22 22" />
                </div>
                <div class="col-12 p-2">
                  <label for="email" class="col-form-label">Email</label>
                  <input type="text" class="form-control" id="email" v-model="email" placeholder="Ton adresse e-mail" />
                </div>
              </div>
              <!-- row -->
              <!-- domaines themes -->
              <div class="row">
                <div class="col-12 p-2">
                  <label for="domaine" class="col-form-label">Domaine</label>
                  <select class="form-control" name="domaine" placeholder="Choisir un domaine" id="domaine" v-model="domaineId" v-on:change="FindThemesByDomaine(domaineId)">
                    <option v-for="(dom, domIndex) in domaines" :key="domIndex" :value="dom.id">{{dom.name}}</option>
                  </select>
                </div>
                <div class="col-12 p-2">
                  <label for="theme" class="col-form-label">Thème</label>
                  <select class="form-control"  name="theme" id="theme" v-model="themeId" v-on:change="FindFormationByTheme(themeId)">
                    <option v-for="(thm, themeIndex) in themes_by_domaine" :key="themeIndex" :value="thm.id">{{thm.name}}</option>
                  </select>
                </div>
                <div class="col-12 p-2">
                  <label for="formation" class="col-form-label">Formation</label>
                  <select class="form-control" placeholder="Choisir une formation" name="formation" id="formation" v-model="formationId">
                    <option v-for="(form, formIndex) in formations_by_theme" :key="formIndex" :value="form.id">{{form.name}}</option>
                  </select>
                </div>
              </div>
              <!-- row -->
            </form>
          </div>
          <!-- container-fluid -->
          
          <div class="modal-footer ">
            <button type="button" class="btn btn-light" data-dismiss="modal">Fermer</button>
            <button type="button" class="btn text-light border-0" style="background-color:#188eee;">S'inscrire</button>
          </div>

      </div>

        
      </div>
    </div>
  </div>

</div>
</template>