<script>
import FormationCard from '../../ui/FormationCard.vue'

export default {
  name: 'FormationSimilaire',
  components: {
    FormationCard
  },
  data() {
    return {
      formationsSimilaire: []
    }
  },
  props: {
    formations: { type: Array, required: true},
    category: String,
    form_param: Number
  },
  created() {
    this.RemoveCurrentFormationObject();
  },
  methods: {
    RemoveCurrentFormationObject() {
      // supprimer la formation actuelle affiché et récupérer le reste
      this.props.formations = this.props.formations.filter((formation) => {
        return formation.id !== this.props.form_param;
      });
    },
  }
}
</script>

<template>
  <div id="formationSimilaire" class="bg_light_2">

    <div class="container-fluid pt-5">
      <h1 class="text-center text-dark font-lg-s10 font-md-s8 font-s6 text_bold py-3">
        Formations similaire sur ❝{{ formations[0].category }}❞
      </h1>
      <!-- card-formation -->
      <formation-card :formations="formations"></formation-card>
      <!-- card-formation -->

    </div>
    <div class="line">
      <hr >
    </div>

  </div>
</template>