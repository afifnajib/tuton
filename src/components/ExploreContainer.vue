<template>
  <div id="container">
    <ion-grid>
      <ion-row class="header">
        <ion-col>Name</ion-col>
        <ion-col>Symbol</ion-col>
        <ion-col>Harga USD</ion-col>
      </ion-row>
      <template v-if="data.length > 0">
        <ion-row v-for="item in data" :key="item.id" class="body">
          <ion-col>{{ item.name }}</ion-col>
          <ion-col>{{ item.symbol }}</ion-col>
          <ion-col>{{ item.price_usd }}</ion-col>
        </ion-row>
      </template>
    </ion-grid>
    <div class="position">
      <ion-button @click="fetchData" v-if="data.length == 0">
        <ion-icon aria-hidden="true" :icon="sync" />
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { IonCol, IonGrid, IonRow, IonButton, IonMenuToggle } from "@ionic/vue";
import { sync } from "ionicons/icons";
import { defineComponent, ref, onMounted } from "vue";
import { add } from "ionicons/icons";
defineProps({
  name: String,
});

const data = ref([]);

onMounted(async () => {});

const fetchData = async () => {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/");
    data.value = response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

defineComponent({
  components: { IonCol, IonGrid, IonRow, IonButton, IonMenuToggle },
  setup() {
    return { add };
  },
});
</script>

<style scoped>
.header {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
.body {
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
.position {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
