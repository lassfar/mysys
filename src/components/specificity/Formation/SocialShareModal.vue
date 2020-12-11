<script>
export default {
  name: 'SocialShareModal',
  props: {
    formation: {type: Object, required: true}
  }
}
</script>

<template>
  <div id="socialShareModal">
    
    <!-- MODALS -->
    <div class="modal fade bd-example-modal-lg" id="inscriptionModal44" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <ShareNetwork
                  class="btn btn-primary"
                  network="facebook"
                  url="google.com"
                  :title="formation.name"
                  :description="formation.description"
                  :hashtags="formation.category"
                >
                <i class="fa fa-facebook-f"></i> Facebook
              </ShareNetwork>
              <ShareNetwork
                style="background-color:#28adff;"
                class="btn text-light"
                network="twitter"
                url="google.com"
                :title="formation.name"
                :hashtags="formation.category"
                >
                <i class="fa fa-twitter"></i> Twitter
              </ShareNetwork>
              <ShareNetwork
                class="btn text-light"
                style="background-color:#0270ad;"
                network="linkedin"
                url="google.com"
                :title="formation.name"
                >
                <i class="fa fa-linkedin"></i> LinkedIn
                </ShareNetwork>
                <ShareNetwork
                  class="btn btn-success"
                  network="whatsapp"
                  url="google.com"
                  :title="formation.name"
                  :description="formation.description"
                  :hashtags="formation.category"
                  >
                  <i class="fa fa-whatsapp"></i> WhatsApp
                </ShareNetwork>
                <ShareNetwork
                  class="btn btn-danger"
                  network="email"
                  url="google.com"
                  :title="formation.name"
                  :description="formation.description"
                  :hashtags="formation.category"
                  >
                  <i class="fa fa-envelope-open"></i> Email
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