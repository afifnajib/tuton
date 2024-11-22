<template>
  <ion-content>
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ion-list>
      <ion-item :button="true" v-for="item in items" :key="item.id">
        <ion-icon
          slot="start"
          color="primary"
          :icon="item.unread ? ellipse : ''"
        ></ion-icon>
        <ion-label>
          <h2>{{ item.name }}</h2>
          <p>Symbol: {{ item.symbol }}</p>
          <p>Price: ${{ item.price_usd }}</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <ion-loading
      :is-open="isLoading"
      message="Loading..."
      duration="0"
    ></ion-loading>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonLoading,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { ellipse } from "ionicons/icons";
import axios from "axios";

interface Item {
  id: number;
  name: string;
  symbol: string;
  price_usd: string;
  unread: boolean;
}

export default defineComponent({
  components: {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonLoading,
  },
  setup() {
    const items = ref<Item[]>([]);
    const isLoading = ref(false);

    const fetchData = async () => {
      isLoading.value = true;

      try {
        const response = await axios.get(
          "https://api.coinlore.net/api/tickers/"
        );
        items.value = response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          symbol: item.symbol,
          price_usd: item.price_usd,
          unread: false,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    const handleRefresh = (event: CustomEvent) => {
      fetchData().then(() => {
        const target = event.target as HTMLIonRefresherElement;
        target.complete();
      });
    };

    return {
      ellipse,
      handleRefresh,
      items,
      isLoading,
    };
  },
});
</script>

<style scoped>
ion-item {
  --padding-start: 8px;
}

ion-icon {
  font-size: 12px;
  align-self: start;
  margin: 15px 8px;
}
</style>
