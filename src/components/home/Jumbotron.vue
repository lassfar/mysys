<script>

import Search from '../common/Search.vue'
 /* eslint-disable */
export default {
  name: 'Jumbotron',
  components: { Search },
	data () {
		return {
			nom: null, prenom: null, tele: null, email: null, type: null, ville: null,
			domaines: [],
			themes: [],
			formations:[],
			jumbotronCards: [
				{
					title: "Placement des ressources",
					desc: "Nos offrons à nos clients un service de placement et de recrutement de personnel visant lʼexcellence.",
					link: "/all-services/#pdr"
				},
				{
					title: "Conseil Intégration Des ERP et AMOA",
					desc: "Nous sommes intégrateurs d'ERP avec une approche complète \"clé en main\"",
					link: "/all-services/#pdr"
				},
				{
					title: "Formations IT",
					desc: "Domaine d’activité en plein essor, l’informatique est un secteur qui recrute.",
					link: "/all-services/#pdr"
				},
			]
		}
	},
	methods: {

	}
}
</script>

<style lang="scss">
  @import '../../assets/css/domaine.scss';
  @import '../../assets/css/jumbotron.scss';
</style>

<template>
	<section class="container-fluid d-flex flex-column justify-items-center my-5">
		<div class="text-light p-4">
			<!-- <Countdown end="August 22, 2021" showDays showHours showMinutes showSeconds></Countdown></div> -->
			<!-- <router-link to="about" class="text-light font_sm">savoir plus</router-link> -->
			<h1 class="display-3 font-xs-s8 text_bold">
				<span class="display-3 font-xs-s8 text_bold text_mysyscolor1">MYSYS</span>,
				UNE EXPERTISE AU SERVICE DE L'ENTREPRISE.
			</h1>
		</div>

		<search></search>

		<div class="row text-light">

			<div class="card col-lg-4 col-sm-12 bg-primary text_bold p-2 border-outline-0 rounded-0"
					v-for="(jcard, jumboIndex) in jumbotronCards" :key="`jumbo${jumboIndex}`" >
				<div class="card-body font-weight-light">
					<h3 class="text_bold">
						{{jcard.title}}
					</h3>
					<p class="font_sm">
						{{jcard.desc}}
					</p>
					<router-link :to="jcard.link" class="btn btn-sm btn-light font-s2 ml-0 mt-0">savoir plus</router-link>
				</div>
			</div>

		</div>
		<!-- end-row -->
	    
	</section>
	<!-- end-container-fluid -->
	
</template>
