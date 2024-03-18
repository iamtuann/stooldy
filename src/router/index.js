import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const routes = [
  {
    path: "",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      layout: DefaultLayout,
    }
  },
  {
    path: "/atvbmtt",
    name: "ATVBMTT",
    meta: {displayName: "An toàn và bảo mật thông tin"},
    children: [
      {
        path: "gcd",
        name: "Gcd",
        component: () => import("../views/atvbmtt/Gcd.vue"),
        meta: { 
          layout: DefaultLayout,
          displayName: "Tìm UCLN thuật toán Euclidean"
        },
      },
      {
        path: "power-modulo",
        name: "Power-modulo",
        component: () => import("../views/atvbmtt/Modulo2.vue"),
        meta: { 
          layout: DefaultLayout,
          displayName: "Tính mod với số mũ"
        },
      },
      {
        path: "modular-inverse",
        name: "ModularInverse",
        component: () => import("../views/atvbmtt/ModularInverse.vue"),
        meta: { 
          layout: DefaultLayout,
          displayName: "Tìm phần tử nghịch đảo"
        },
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router