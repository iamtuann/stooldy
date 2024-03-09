<template>
  <!-- <div class="nav-header">
    <router-link :to="{name: 'Home'}">
      <h1 class="logo">Stooldy</h1>
    </router-link>
  </div> -->
  <div class="list-items">
    <ul class="nav-items">
      
    </ul>
  </div>
</template>
<script>
export default {
  name: "LeftBar",
  data: () => ({
    items: [
      
    ],
  })
}
</script>
<style scoped>
.nav-header {
  overflow: hidden;
  padding: 16px 4px 16px 22px;
  margin-right: 18px;
  min-block-size: 64px;
  display: flex;
  align-items: center;
}

.nav-header .logo {
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 0;
  color: rgba(var(--v-theme-on-background),var(--v-high-emphasis-opacity));
}
.nav-items {
  position: relative;
}
.nav-items .item-active {
  background: linear-gradient(-72.47deg,rgb(var(--v-theme-primary)) 22.16%,rgba(var(--v-theme-primary),.7) 76.47%)!important;
  color: rgb(var(--v-theme-on-primary));
}
.nav-link a {
  position: relative;
  display: block;
  height: 42px;
  border-bottom-right-radius: 3.125rem!important;
  border-top-right-radius: 3.125rem!important;
  margin: 0 18px 6px 0;
  padding: 0 16px 0 22px;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: rgba(var(--v-theme-on-surface),var(--v-high-emphasis-opacity));
}
.nav-link a::before {
  position: absolute;
  border-radius: inherit;
  background: currentcolor;
  block-size: 100%;
  content: "";
  inline-size: 100%;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}
.nav-link a:hover::before {
  opacity: calc(var(--v-hover-opacity) * var(--v-theme-overlay-multiplier));
}
.nav-link a.router-link-active  {
  background: linear-gradient(-72.47deg,rgb(var(--v-theme-primary)) 22.16%,rgba(var(--v-theme-primary),.7) 76.47%)!important;
  color: rgb(var(--v-theme-on-primary));
}
.nav-link .nav-icon {
  flex-shrink: 0;
  font-size: 1.5rem;
  margin-inline-end: 0.625rem;
  inline-size: 1em;
}
.nav-link .nav-link-title {
  letter-spacing: 0.15px;
  overflow: hidden;
  margin-right: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nav-title {
  margin: 24px 18px 8px 0;
  padding: 0 16px 0 22px;
  letter-spacing: 0.4px;
  color: rgba(var(--v-theme-on-surface),var(--v-disabled-opacity));
  font-size: 12px;
  text-transform: uppercase;
}
.title-text {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  column-gap: 0.625rem;
}
.title-text::before {
  flex: 0 1 0.75rem;
  margin-left: -1.375rem;
  border-block-end: 1px solid rgba(var(--v-border-color),var(--v-border-opacity));
  content: "";
}
.title-text::after {
  flex: 1 1 auto;
  border-block-end: 1px solid rgba(var(--v-border-color),var(--v-border-opacity));
  content: "";
}
::v-deep(.v-list-group__items .v-list-item) {
  padding-inline-start: 35px !important;
  padding-top: 4px;
  padding-bottom: 4px;
  line-height: 22px;
}
::v-deep(.v-list-item__append) {
  display: block;
}
</style>