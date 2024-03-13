<template>
  <v-layout>
    <v-app-bar>
      <template v-if="true" #prepend>
        <v-btn
          v-if="mdAndDown"
          icon="mdi-menu"
          size="40"
          color="default"
          @click="drawer = !drawer"
        />
      </template>
      <Header />
    </v-app-bar>
    <v-navigation-drawer
      id="nav"
      rail
      rail-width="280"
      v-model="drawer"
    >
      <LeftBar />
    </v-navigation-drawer>
    
    <v-main class="main">
      <RouterView />
      <Footer />
    </v-main>
  </v-layout>
</template>

<script setup>
import Header from '../components/core/Header.vue';
import LeftBar from "../components/core/LeftBar.vue";
import Footer from '../components/core/Footer.vue';
import { useDisplay } from 'vuetify'
import { ref } from "vue";

const {lgAndUp, mdAndDown} = useDisplay()
const drawer = ref(lgAndUp.value)
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}
::v-deep(.v-toolbar__prepend) {
  margin-right: 0;
}
</style>