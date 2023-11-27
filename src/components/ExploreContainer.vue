<template>
  <div id="container" v-if="!isLoading">
    <div class="position">
      <ion-button @click="fetchData">
        <ion-icon aria-hidden="true" :icon="sync" />
      </ion-button>
    </div>
    <ion-grid>
      <ion-row class="header">
        <ion-col>Rank</ion-col>
        <ion-col>Name</ion-col>
        <ion-col>Symbol</ion-col>
        <ion-col>USD</ion-col>
      </ion-row>

      <template v-if="data.length > 0">
        <ion-row v-for="item in data" :key="item.id" class="body">
          <ion-col>{{ item.rank }}</ion-col>
          <ion-col>{{ item.name }}</ion-col>
          <ion-col>{{ item.symbol }}</ion-col>
          <ion-col>{{ item.price_usd }}</ion-col>
        </ion-row>
      </template>
    </ion-grid>
  </div>
  <div v-else>
    <p style="text-align: center">Loading..</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import { IonCol, IonGrid, IonRow, IonButton, IonIcon } from "@ionic/vue";
import { sync } from "ionicons/icons";

type MyData = {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  price_usd: number;
};

export default defineComponent({
  components: {
    IonCol,
    IonGrid,
    IonRow,
    IonButton,
    IonIcon,
  },
  setup() {
    const data = ref<MyData[]>([]);
    const isLoading = ref(false);

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(
          "https://api.coinlore.net/api/tickers/"
        );
        data.value = response.data.data;
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        console.error("Error fetching data:", error);
      }
    };
    return {
      data,
      fetchData,
      sync,
      isLoading,
    };
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
