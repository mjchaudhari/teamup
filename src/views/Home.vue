<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar size="small">
        <ion-title>Team Up</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div class="div-center">
        <ion-button id="" @click="signin">Sign in</ion-button>  
      </div>
    </ion-content>
  </ion-page>
</template>

<script >
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
export default ({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  data () {
    return {
      auth: null
    }
  },
  mounted () {
    
  },
  methods: {
    signin () {
      // sign in
      this.$router.push({ name: 'PhoneSignIn' })
    }
  }
});
</script>

<style scoped>

</style>