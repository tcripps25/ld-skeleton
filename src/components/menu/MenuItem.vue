<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
  item: Object,
});
</script>

<template>
  <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route"
    active-class="text-sky-50 bg-gradient-to-br from-sky-600 to-purple-600 font-semibold shadow-sm"
    class="group hover:bg-slate-200 gap-2 flex p-2 rounded items-center ">
    <div class="flex items-center">
      <span class="" :class="item.icon, { 'text-sky-50': $route.path === item.route }"></span>
      <span class="ml-2">{{ item.label }}</span>
    </div>
  </RouterLink>
</template>