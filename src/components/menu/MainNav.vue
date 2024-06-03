<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { PaintBrushIcon, HomeIcon, ChartPieIcon, Cog8ToothIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js';
import { computed } from 'vue';
import WeekLink from '@/components/menu/WeekLink.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const course = useCourseStore();
const route = useRoute();

const isDesignActive = computed(() => route.path === '/design' || route.path.startsWith('/design/'));


</script>

<template>
  <nav id="main-nav" class="flex flex-col gap-2 text-slate-600 relative">
    <RouterLink :active-class="'bg-blue-600 text-blue-50 hover:!bg-blue-600'" class="transition hover:bg-slate-300 gap-3 aria-current:font-semibold flex p-2 rounded items-center" to="/">
      <Cog8ToothIcon class="w-5 h-5" /> Set Up
    </RouterLink>
    <RouterLink :active-class="'bg-blue-600 text-blue-50 hover:!bg-blue-600'" class="transition hover:bg-slate-300 aria-current:font-semibold flex gap-3 p-2 rounded items-center" to="/design">
      <PaintBrushIcon class="w-5 h-5" /> Design
    </RouterLink>
    <Transition>
    <TransitionGroup v-if="isDesignActive" class="flex flex-col" name="list" tag="ul" id="draggable-list">
            <WeekLink
            v-for="(week, index) in course.weeks"
            :key="index"
            :week="week"
            :index="index"
            >
            <template #default="{ week }">
            {{ week.title }}
            </template>
            </WeekLink>
  </TransitionGroup>
</Transition>
    <RouterLink :active-class="'bg-blue-600 text-blue-50 hover:!bg-blue-600'" class="transition hover:bg-slate-300 gap-3 aria-current:font-semibold flex p-2 rounded items-center" to="/visualise">
      <ChartPieIcon class="w-5 h-5" /> Visualise
    </RouterLink>
    <RouterLink :active-class="'bg-blue-600 text-blue-50 hover:!bg-blue-600'" class="transition hover:bg-slate-300 gap-3 aria-current:font-semibold flex p-2 rounded items-center" to="/publish">
      <ArrowUpOnSquareIcon class="w-5 h-5" /> Publish
    </RouterLink>
  </nav>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  height: 0px;
  position: absolute;
  top: 6rem;
}
</style>