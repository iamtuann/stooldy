<template>
  <div class="list-item">
    <template v-for="route in routes" :key="route.name">
      <div v-if="route.children">
        <h4 class="fs-5">{{ route?.meta?.displayName }}</h4>
        <Router-Link v-for="path in route.children" :key="path.name" :to="{name:path.name}">
          {{ path.meta.displayName }} <br>
        </Router-Link>
      </div>
    </template>
  </div>
</template>
<script setup>
import router from '../../router';
import { ref } from "vue";
const routes = router.options.routes;
</script>
<style scoped>
.list-item {
  padding: 30px 16px;
}
</style>