<template>
  <ion-content>
    <div class="position">
      <ion-button @click="fetchData()">Refresh</ion-button>
    </div>

    <ion-grid>
      <ion-row
        v-for="(item, index) in items"
        :key="item.id"
        v-if="!isLoading"
        class="list"
      >
        <ion-col>
          <small>Rank</small>
          <h4>{{ index + 1 }}</h4>
        </ion-col>
        <ion-col>
          <small>{{ item.name }}</small>
          <h4>{{ item.symbol }}</h4>
        </ion-col>
        <ion-col>
          <small>{{ item.name }}</small>
          <h4>{{ item.price_usd }}</h4>
        </ion-col>
      </ion-row>
    </ion-grid>

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
  IonLoading,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
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
    IonLoading,
    IonCol,
    IonGrid,
    IonRow,
    IonButton,
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

    return {
      fetchData,
      items,
      isLoading,
    };
  },
});
</script>

<style scoped>
ion-button {
  padding: 2.5vh;
}
.position {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list {
  background-color: #FFFFE0;
  border: 1px solid #ccc;
  padding: 10px;
  font-family: 'Poppins', sans-serif;
}

.list h4 {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}

.list small {
  color: #888;
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
}

ion-col {
  padding: 0 10px;
  text-align: center;
}
</style>
