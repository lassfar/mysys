<script>

import Countdown from 'countdown-vue'
 /* eslint-disable */
export default {
  name: 'Jumbotron',
  components: { Countdown },
	data () {
		return {
			nom: null, prenom: null, tele: null, email: null, type: null, ville: null,
			domaines: [],
			themes: [],
			formations:[],
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
	<div class="container-fluid " >
		<div class="p-5 mt-5 text-light">
               <!-- <Countdown end="August 22, 2021" showDays showHours showMinutes showSeconds  ></Countdown></div> -->
           
				<router-link to="about" class="font_sm text-light">savoir plus</router-link>
				<h1 class="text_bold">MySYS UNE EXPERTISE AU SERVICE DE L'ENTREPRISE.</h1>
				<p class="text_light ">Le lorem ipsum est, en imprimerie, une suite de mots sans
					signification utilisée à titre provisoire pour calibrer une mise en page, le texte 
					définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est a
					chevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
			</div>
			<div class="row p-0 text-light">
					<div class="card col-lg-4 col-sm-12 p-2 bg-primary text_bold border-0">
						<div class="card-body text_light">
							<h3 class="text_bold">
								Placement des ressources
							</h3>
							<p class="font_sm">
								Nos offrons à nos clients un service de placement et de
								recrutement de personnel visant lʼexcellence.
							</p>
							<router-link to="/all-services/#pdr" class="btn btn-sm btn-light font-s2 ml-0 mt-0">savoir plus</router-link>
						</div>
					</div>

					<div class="card col-lg-4 col-sm-12 p-2 bg-primary text_bold border-0">
						<div class="card-body text_light">
							<h3 class="text_bold">
								Conseil Intégration Des ERP et AMOA
							</h3>
							<p class="font_sm">
								Nous sommes intégrateurs d'ERP avec une approche complète "clé en main".
							</p>
							<router-link to="/all-services/#erp" class="btn btn-sm btn-light font-s2 ml-0 mt-0">savoir plus</router-link>
						</div>
					</div>
					

					<div class="card col-lg-4 col-sm-12 p-2 bg-primary text_bold  border-0">
						<div class="card-body text_light">
							<h3 class="text_bold">
								Formations IT
							</h3>
							<p class="font_sm">
								Domaine d’activité en plein essor, l’informatique est un secteur qui recrute.
							</p>
							<router-link to="/all-services/#fm" class="btn btn-sm btn-light font-s2 ml-0 mt-0">savoir plus</router-link>
						</div>
					</div>
				</div>
				<!-- end-row -->
	    
	    	
		<!-- col -->
	
	</div>
</template>
