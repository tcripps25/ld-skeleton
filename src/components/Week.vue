<script setup>
import { TransitionGroup, computed, onMounted } from 'vue';
import Activity from '@/components/Activity.vue';
import { useCourseStore } from '@/stores/course.js'
import { PlusCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import Panel from './ui/Panel.vue';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';

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

  <div class="bg-slate-50 backdrop-blur-md px-5 -mt-5 py-5 -mx-5 sticky top-9 mb-5 z-10">
    <Carousel :value="week.activities" :numVisible="4" :numScroll="1" pt:itemList="" pt:item="" pt:content="">
      <template #item="slotProps">
        <div class=" bg-slate-300 text-sky-80 p-3 rounded mx-5 h-24 ">
          <h3 class="text-md font-medium">{{ slotProps.data.title }}</h3>
        </div>
      </template>
    </Carousel>
  </div>

  <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-5">
    <Activity v-for="(activity, activityIndex) in week.activities" :key="activityIndex" :week="week"
      :weekIndex="weekIndex" :activity="activity" :activityIndex="activityIndex"
      @remove-activity="handleRemoveActivity(weekIndex, activityIndex)" />
  </TransitionGroup>


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
