import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'
import About from '../components/info/About.vue'
import Contact from '../components/info/Contact.vue'
import AllServices from '../components/info/AllServices.vue'
import AllFormation from '../components/specificity/Formation/AllFormation.vue';
import DetailFormation from '../components/specificity/Formation/DetailFormation.vue';
Vue.use(VueRouter)

const routes = [
    { path: '/formation-by-theme/:theme_param/:domaine_param', component: AllFormation, name: 'allformation' },
    { path: '/all-formation', component: AllFormation },
    { path: '/all-services', component: AllServices },
    { path: '/detail-formation', component: DetailFormation },
    { path: '/detail-formation/:form_param', component: DetailFormation, name: 'detailformation' },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/home', component: Home },
    { path: '/', component: Home }
  ]
  
const router = new VueRouter({
  routes
})
export default router