<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tugas 2 - Tuton</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tugas 3</ion-title>
        </ion-toolbar>
      </ion-header>

<<<<<<< HEAD
      <Container name="Tugas 2" />
=======
      <Grid name="Tugas 3" />
>>>>>>> 045c89a (after fix bug)
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import Container from "@/components/Container.vue";
</script>
