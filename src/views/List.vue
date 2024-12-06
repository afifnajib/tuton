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
      <Grid name="Tugas 3" />
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
import Grid from "@/components/Grid.vue";
</script>
