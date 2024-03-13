<template>
  <div class="container">
    <div class="mt-4">
      <div v-for="route in routes" :key="route.name">
        <div v-if="route.children !== null">
          <h4>{{ route?.meta?.displayName }}</h4>
          <Router-Link v-for="path in route.children" :key="path.name" :to="{name:path.name}">
            - {{ path.meta.displayName }} <br>
          </Router-Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '../router';
import { ref } from "vue";
const routes = router.options.routes;
</script>

<style lang="scss" scoped>

</style>