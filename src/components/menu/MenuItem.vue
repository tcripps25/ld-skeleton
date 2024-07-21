<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
  title: String,
  dest: String,
});
</script>

<template>
  <RouterLink :active-class="'bg-slate-200 text-slate-600 hover:!bg-slate-200'"
    class="transition hover:bg-slate-200 gap-2 aria-current:font-semibold flex p-2 rounded items-center" :to="dest">
    <slot />
    {{ title }}
  </RouterLink>
</template>