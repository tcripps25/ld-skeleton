<script setup>
import { TransitionGroup, computed, onMounted } from 'vue';
import Activity from '@/components/Activity.vue';
import { useCourseStore } from '@/stores/course.js'
import { PlusCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import Panel from './ui/Panel.vue';
import Button from 'primevue/button';
import ActivityClass from '@/classes/Activity';

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

const addActivity = (weekIndex) => {

  const newActivity = new ActivityClass;

  course.weeks[weekIndex].activities.push(newActivity);
};

const handleRemoveActivity = (weekIndex, activityIndex) => {
  course.weeks[weekIndex].activities.splice(activityIndex, 1);
};


const panelTitle = computed(() => {
  return props.showTitle ? props.week.name : '';
});

</script>

<template>
  <Panel v-if="week" :title="panelTitle">
    <template v-slot:action>
      <button @click="removeWeek(weekIndex)" class="text-red-500 flex gap-1"><span class="sr-only">Remove Week</span>
        <XMarkIcon class="w-5 h-5" />
      </button>
    </template>
    <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-5 ">
      <Activity v-for="(activity, activityIndex) in week.activities" :key="activityIndex" :week="week"
        :weekIndex="weekIndex" :activity="activity" :activityIndex="activityIndex"
        @remove-activity="handleRemoveActivity(weekIndex, activityIndex)" />
    </TransitionGroup>
    <Button @click="addActivity(weekIndex)"
      pt:root:class="bg-blue-600 hover:bg-blue-500 text-blue-50 px-3 py-2 rounded-md flex items-center gap-1 w-max">
      Add
      Activity
      <PlusCircleIcon class="w-5 h-5" />
    </Button>
  </Panel>
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
