<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { PaintBrushIcon, HomeIcon, ChartPieIcon, Cog8ToothIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js';
import { computed } from 'vue';

const course = useCourseStore();
const route = useRoute();

const isDesignActive = computed(() => route.path === '/design' || route.path.startsWith('/design/'));

</script>

<template>
  <nav id="main-nav" class="flex flex-col gap-2 text-slate-600">
    <RouterLink :active-class="'bg-blue-600 text-blue-50 hover:!bg-blue-600'" class="transition hover:bg-slate-300 gap-3 aria-current:font-semibold flex p-2 rounded items-center" to="/">
      <Cog8ToothIcon class="w-5 h-5" /> Set Up
    </RouterLink>
    <RouterLink :active-class="'bg-blue-600 text-blue-50 hover:!bg-blue-600'" class="transition hover:bg-slate-300 aria-current:font-semibold flex gap-3 p-2 rounded items-center" to="/design">
      <PaintBrushIcon class="w-5 h-5" /> Design
    </RouterLink>
    <ul v-if="isDesignActive" class="pl-5 flex flex-col">
      <RouterLink v-for="(week, index) in course.weeks" :key="index" :active-class="''" class="transition hover:bg-slate-300 aria-current:font-semibold flex gap-3 p-2 rounded items-center" :to="'/design/' + index">
        {{ week.title }}
    </RouterLink>
    </ul>
    
    <RouterLink :active-class="'bg-blue-600 text-blue-50 hover:!bg-blue-600'" class="transition hover:bg-slate-300 gap-3 aria-current:font-semibold flex p-2 rounded items-center" to="/visualise">
      <ChartPieIcon class="w-5 h-5" /> Visualise
    </RouterLink>
  </nav>
</template>
