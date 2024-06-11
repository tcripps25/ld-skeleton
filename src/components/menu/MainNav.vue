<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { PaintBrushIcon, HomeIcon, ChartPieIcon, Cog8ToothIcon, ArrowUpOnSquareIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js';
import { computed } from 'vue';
import WeekLink from '@/components/menu/WeekLink.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import MenuItem from './MenuItem.vue';
import Button from 'primevue/button';
import AddWeekButton from '../buttons/AddWeekButton.vue';

const course = useCourseStore();
const route = useRoute();

const showDesign = ref(false);

const toggleShowDesign = () => {
  showDesign.value = !showDesign.value;
}

const isDesignActive = computed(() => route.path === '/design' || route.path.startsWith('/design/'));


</script>

<template>
  <nav id="main-nav" class="flex flex-col gap-2 text-slate-600 relative">
    <MenuItem title="Set Up" to="/">
    <Cog8ToothIcon class="w-5 h-5" />
    </MenuItem>
    <div class="">
      <Button label="Design" @click="toggleShowDesign" pt:root:class="p-1 flex justify-start gap-3 items-center w-full"
        id="show-design-button">
        <ChevronDownIcon class="w-4 h-4 ml-1 -rotate-90 transition" :class="{ '!rotate-0': showDesign }" />
        <h3 :class="{ 'font-semibold': showDesign }">Design</h3>
      </Button>
    </div>
    <Transition>
      <ul v-if="showDesign" class="ml-7">
        <li>
          <MenuItem title="Overview" to="/design/overview">

          </MenuItem>
        </li>
        <li class="mt-3 mb-3">
          <div class="flex justify-between items-center p-1 border-b ml-1">
            <h3>Module Schedule</h3>
            <AddWeekButton />
          </div>
        </li>
        <TransitionGroup v-if="course.weeks.length > 0" class="flex flex-col" name="list" tag="ul">
          <WeekLink v-for="(week, index) in course.weeks" :key="index" :week="week" :index="index">
          </WeekLink>
        </TransitionGroup>


      </ul>
    </Transition>

    <MenuItem title="Visualise" to="/visualise">
    <ChartPieIcon class="w-5 h-5" />
    </MenuItem>
    <MenuItem title="Publish" to="/publish">
    <ArrowUpOnSquareIcon class="w-5 h-5" />
    </MenuItem>
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