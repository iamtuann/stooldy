<template>
  <header id="header">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between">
        <RouterLink class="logo" :to="{name: 'Home'}">
          Stooldy
        </RouterLink>
        <v-space></v-space>
        <a class="icon-link" href="https://github.com/iamtuann/stooldy" target="_blank">
          <span class="mdi mdi-github"></span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';


</script>

<style scoped>
#header {
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  width: 100%;
}
.logo {
  font-size: 24px;
}
.icon-link {
  font-size: 20px;
  padding: 0 6px;
  color: currentColor;
}
</style>