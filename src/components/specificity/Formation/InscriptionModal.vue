<script>
export default {
  name: 'InscriptionModal',
  props: {
    formation: { type: [Object, Array], required: true }
  },
  data() {
    return {
      nom: undefined,
      prenom: undefined,
      type: undefined,
      tele: undefined,
      email: undefined,
      ville: undefined,
      mysysformation_id: undefined
    }
  }, // data
  methods: {
    HandleRegister() {
      this.axios.post('/api/mysys/participants', {
        nom: this.nom,
        prenom: this.prenom,
        type: this.type,
        tele: this.tele,
        email: this.email,
        ville: this.ville,
        mysysformation_id: this.mysysformation_id
      })
      .then(() => {
        alert("Inscription effectué avec succès !");
      })
      .catch((err) => {
        alert(err);
      });
    }
  }
}
</script>

<template>
  <div id="inscriptionModal">
    
    <div class="modal fade" id="inscriptionModal2" tabindex="-1" role="dialog" aria-labelledby="inscriptionModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

          <div class="modal-header">
            <h1 class="modal-title" id="inscriptionModalLabel">S'inscrire à {{ formation.name }}</h1>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-light" aria-hidden="true">
                <i class="material-icons">close</i>
              </span>
            </button>
          </div>
          
          <div class="modal-body p-4">
            <div class="container-fluid">
              <form @submit="HandleRegister" method="POST">
                <!-- nom et prenom -->
                <input type="hidden" v-model="formation.mysysformation_id">
                <div class="row">
                  <div class="col-12 col-md-6 col-lg-6 p-2">
                    <label for="nom" class="col-form-label">Nom<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" name="nom" id="nom" v-model="nom" placeholder="Alaoui" />
                  </div>
                  <div class="col-12 col-md-6 col-lg-6 p-2">
                    <label for="prenom" class="col-form-label">Prénom <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" name="prenom" id="prenom" v-model="prenom" placeholder="Ahmad" />
                  </div>
                </div>
                <!-- row -->
                <!-- tele adresse -->
                <div class="row">
                  <div class="col-12 p-2">
                    <label for="tele" class="col-form-label">Téléphone <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" name="tele" id="tele" v-model="tele" placeholder="06 00 00 00 00" />
                  </div>
                  <div class="col-12 p-2">
                    <label for="email" class="col-form-label">Email <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" name="email" id="email" v-model="email" placeholder="votre adresse email" />
                  </div>
                </div>

                <div class="row my-3">
                  <div class="col-6 p-2">
                    <label for="type" class="col-form-label">Vous êtes? <span class="text-danger">*</span></label>
                    <select class="form-control" name="type" id="type" v-model="type">
                      <option value="Entreprise">Entreprise</option>
                      <option value="Particulier">Particulier</option>
                    </select>
                  </div>
                  <div class="col-6 p-2">
                    <label for="ville" class="col-form-label">Ville <span class="text-danger">*</span></label>
                    <select class="form-control" name="ville" id="ville" v-model="ville">
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Tanger">Tanger</option>
                    </select>
                  </div>
                </div>
          
              </form>
            </div>
            <!-- container-fluid -->
            
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-dismiss="modal">Fermer</button>
              <button type="submit" class="btn btn-primary border-0">S'inscrire</button>
            </div>

          </div>
          <!-- end-modal-body -->
          
        </div>
      </div>
    </div>
    <!-- end-inscripton-modal -->

    
  </div>
</template>