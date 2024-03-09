<script setup>
</script>

<template>
  <v-app>
    <component :is="$route.meta.layout || 'div'"></component>
  </v-app>
</template>

<style scoped>

</style>
