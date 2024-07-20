<script setup>
import { TransitionGroup, computed, onMounted } from 'vue';
import Activity from '@/components/Activity.vue';
import { useCourseStore } from '@/stores/course.js'
import { PlusCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import Panel from './ui/Panel.vue';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import { RouterLink, RouterView } from 'vue-router';

const course = useCourseStore()

// Define props
const props = defineProps({
  week: Object,
  weekIndex: Number,
  showTitle: Boolean,
});

const removeWeek = (weekIndex) => {
  course.weeks.splice(weekIndex, 1);
};



const handleRemoveActivity = (weekIndex, activityIndex) => {
  course.weeks[weekIndex].activities.splice(activityIndex, 1);
};


const panelTitle = computed(() => {
  return props.showTitle ? props.week.name : '';
});

</script>

<template>
  <div class="flex flex-col gap-5 w-full">
    <div class="flex gap-5 overflow-x-auto">
      <RouterLink :to="'/design/' + weekIndex + '/' + index" v-for="(activity, index) in week.activities" :key="index"
        class="bg-white shadow-sm text-sky-800 p-3 rounded grow-0 flex-shrink-0 hover:bg-slate-50">
        <h3 class="font-medium">{{ activity.title }}</h3>
      </RouterLink>
    </div>

    <RouterView />
    <!-- <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-5 pl-5">
      <Activity v-for="(activity, activityIndex) in week.activities" :key="activityIndex" :week="week"
        :weekIndex="weekIndex" :activity="activity" :activityIndex="activityIndex"
        @remove-activity="handleRemoveActivity(weekIndex, activityIndex)" />
    </TransitionGroup>
    -->
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
