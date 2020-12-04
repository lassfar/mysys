<style lang="scss">
  @import '../../assets/css/about.scss';
</style>
<template>
<div id="about">
<NavBar/>
<div class="container-fluid mb-5">
    <div class="main-title">
      <span class="title">Qui Sommes-Nous?</span>
    </div>
    <div class="row ">
     <div class="col-lg-6"> <div class="card p-lg-5 bg-transparent text_bold m-3 border-0 ">
        <div class="card-body ">
        <div class="card-title ">
        <h1 class="text_bold">MySYS</h1>  
        </div>
          <p class="text_bold">
           MySYS est un centre de formation et certification au Casablanca (Maârif). Préparer un diplôme, accroître sa qualification, que l’on ait 18 ans ou 60 ans représentent chaque fois un acte fort. Celui qui va en formation  accepte de se remettre en cause dans ses savoirs, ses acquis, parfois ses « certitudes » il sait qu’il va devoir donner pour recevoir. La formation tout au long de la vie ne doit pas être qu’un slogan, le Centre de Formation ITAB ACADEMY œuvre dans ce sens et à plusieurs niveaux de formation et de qualification.  Bonne découverte des formations que nous vous proposons
          </p>
        </div>
     </div></div>

   <div class="col-lg-6"> <div class="card p-lg-5 text-light about-d-bg text_bold m-3 border-0 ">
   <div class="card-body font-weight-light">
     <div class="card-title text_bold">
     <h1 class="text_bold" >Nos Themes De Formaton</h1> 
     </div>
      <ul class="ml-3">
      <li>Développement Web/Standard/Mobile</li>
      <li>Project Management•Gouvernance IT</li>
      <li>Sécurité Informatique</li>
      <li>Réseaux Et Télécommunications</li>
      <li>ERP/SAP•Bases De Données</li>
      <li>Systèmes D’exploitation Et Virtualisation</li>
      <li>Nouvelles Technologies : Big Data, Business Intelligence</li>
      </ul>
      <p>
      Ces axes sontpar ailleurs revus de manière permanente et enrichis continuellementavec les dernières avancées sur le marché.
     </p>
   </div></div></div></div>


   <div class="row ">
       <div class="col-lg-6"> <div class="card p-lg-5 text-light about-i-bg text_bold m-3 border-0 ">
   <div class="card-body font-weight-light">
     <div class="card-title text_bold">
     <h1 class="text_bold">Intégrateurs d'ERP</h1> 
     </div>
     <p >
     Nous sommes intégrateurs d'ERP avec une approche complète "clé en main".
     Nous développons des logiciels customisés pour répondre aux demandes spécifiques de nos clients avec un support continuintégré, notamment sur des solutions Web, E-commerce, E-Learning ainsi que Business Intelligence.
     Une des compétences clés que nous maîtrisons et qui nous distingue clairement sur le marché est le Marketing Digital. Notre savoir-faire à ce niveau a permis à plusieurs de nos clients d'augmenter considérablement leur chiffre d’affaire tout en en élargissant davantage leur base de prospects.
     Nous disposons d'un centre de compétence en coaching Agile et nous accompagnons de grandes entreprises dans une agilisation des processus avec certification, notamment via la méthode Scrum
     </p>
   </div></div></div>

     <div class="col-lg-6"> <div class="card p-lg-5 bg-transparent text_bold m-3 border-0 ">
        <div class="card-body ">
        <div class="card-title text_bold">
    <h1 class="text_bold">Notre Vision</h1>  
     </div>
          <p class="text_bold">
          MySYS est une société multi-compétence. Nous sommes un centre de formation et de certification, une entreprise de développement et d'intégration logicielle et également un cabinet de consulting et d'accompagnement. Nous nous positionnons naturellement en tant que leader sur les marchés marocain et africain, tant au niveau des entreprises,qu’au niveau des particuliers. Notre ambition est de démocratiser la formation professionnelle d'Excellence en proposant une offre de grande qualité et adaptée aux besoins spécifiques de nos clients, en vue de les encourager à investir sur leur patrimoine immatériel pour créer de la valeur. Nos formateurs partagent notre vision et possèdent une expérience notable tant sur le plan pédagogique qu'au niveau pratique, ce qui apporte de la pertinence et de la clarté à leurs interventions.
          </p>
        </div>
      </div></div>
</div>
 <div class="row "> 
 <div class="col-lg-6"><div class="card  bg-transparent p-lg-5 text_bold m-3 border-0">
        <div class="card-body text_light p-lg-5 mt-lg-5">
          <div class="card-title text_bold ">
          <h3 class="text_bold">Notre Présence Géographique</h3> 
          </div>
          <p>Nous avons plusieurs antennes nationales et régionales nous permettant d'être au plus proche de nos clients</p>
          <ul style="list-style-type: none;">
          <li><p><span class="text_bold">Maroc :</span> 39 Rue Al Fourate, Casablanca 20330 </p></li>
          </ul>
        </div>
      </div></div>  
 <div class="col-lg-6"><div class="card text-light about-v-bg p-lg-5 text_bold m-3 border-0">
        <div class="card-body font-weight-light">
          <div class="card-title text_bold">
          <h1 class="text_bold">Nos Valeurs</h1> 
          </div>
          <ul style="list-style-type: none;">
          <li><p><span class="text_bold">L'Engagement :</span> Nous donnons le meilleur de nous même et nous sommes engagés à apporterun vrai retour sur investissement et de la valeur tangible à nos clients </p></li>
          <li><p><span class="text_bold">La Confiance :</span> Nous construisons des relations de confiance Gagnant-Gagnant avec nos partenaires basées sur une écoute permanente et une communication transparente</p></li>
          <li><p><span class="text_bold">L'Innovation :</span> Nous sommes tournés vers l'avenir, avec une pédagogienovatrice et une veille permanente pour faire monter en compétence nos clients sur les dernières tendances en technologies et en Savoir-être</p></li>
          </ul>
        </div>
      </div></div>     
</div>

<div class="col-lg-12"><div class="card text-light bg-transparent text_bold border-0">
  <div class="card-body">
    <Client/>
  </div></div></div>  

 <div class="col-lg-12"><div class="card bg-transparent text_bold border-0">
  <div class="card-body ">
    <Partenaire/>
  </div></div></div>  
   



</div>
</div>
</template>

<script>
import NavBar from '../commun/NavBar.vue';
import Client from '../home/Client';
import Partenaire from '../home/Partenaire';

export default {
  name: 'About',
   components: {
    NavBar,
    Client,
    Partenaire
  },
}
</script>

