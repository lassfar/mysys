<script>
export default {
  name: 'SocialShareModal',
  props: {
    formation: { type: [Object, Array], required: true }
  },
  data() {
    return {
      social_share: [
        {
          name: 'facebook',
          network: 'facebook',
          class: 'btn btn-primary',
          class_icon: 'fa fa-facebook-f',
          style: '',
          url: 'https://google.com'
        },
        {
          name: 'twitter',
          network: 'twitter',
          class: 'btn text-light',
          class_icon: 'fa fa-twitter',
          style: 'background-color:#28adff;',
          url: 'https://google.com'
        },
        {
          name: 'linkedin',
          network: 'linkedin',
          class: 'btn text-light',
          class_icon: 'fa fa-linkedin',
          style: 'background-color:#0270ad;',
          url: 'https://google.com'
        },
        {
          name: 'whatsapp',
          network: 'whatsapp',
          class: 'btn btn-success',
          class_icon: 'fa fa-whatsapp',
          style: '',
          url: 'https://google.com'
        },
        {
          name: 'email',
          network: 'email',
          class: 'btn btn-danger',
          class_icon: 'fa fa-envelope-open',
          style: '',
          url: 'https://google.com'
        },
      ]
    }
  }
}
</script>

<template>
  <div id="socialShareModal">
    
    <!-- MODALS -->
    <div v-if="formation" class="modal fade bd-example-modal-lg" id="inscriptionModal44" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="exampleModalLabel">Partager sur les réseaux sociaux</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="text-light" aria-hidden="true">
              <i class="material-icons">close</i>
            </span>
          </button>
        </div>
        <div class="modal-body p-3">
          <div class="container-fluid p-3">
            <div class="d-flex justify-content-center">
              <ShareNetwork v-for="(social, idx) in social_share" :key="`social_${idx}`"
                  :class="social.class"
                  :style="social.style"
                  :network="social.network"
                  :url="social.url"
                  :title="social.name"
                  :description="social.description"
                  :hashtags="social.category"
                >
                <i :class="social.class_icon"></i> 
                {{social.name}}
              </ShareNetwork>
              </div>
          </div>
          <div class="modal-footer ">
            <button type="button" class="btn btn-light" data-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    <!-- END-MODALS -->
    
  </div>
</template>