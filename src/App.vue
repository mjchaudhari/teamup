<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script >
import { IonApp, IonRouterOutlet } from '@ionic/vue';

export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
};
</script>
<style>
.div-center-container {
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
}
.center-item {
  /* margin-top:50%; */
  margin-bottom: 50%;
  
}
</style>