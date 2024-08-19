<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
  item: Object,
});
</script>

<template>
  <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route"
    exact-active-class="text-sky-50 bg-gradient-to-br from-sky-600 to-purple-600 font-semibold shadow-sm"
    active-class="font-semibold" class="group hover:bg-slate-200 gap-2 flex p-2 rounded items-center "
    :class="item.week ? 'ml-3' : ''">
    <div class="flex items-center">
      <span v-if="item.icon" class="mr-2" :class="item.icon, { 'text-sky-50': $route.path === item.route }"></span>
      <span>{{ item.label }}</span>
    </div>
  </RouterLink>
</template>