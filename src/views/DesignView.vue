<script setup>
import { ref, computed } from 'vue';
import Activity from '../components/Activity.vue';
import { PlusCircleIcon, ArrowUpOnSquareIcon, XMarkIcon, PaintBrushIcon } from '@heroicons/vue/24/solid';

// Define props
const props = defineProps({
  weeks: {
    type: Array,
    required: true // Ensure the weeks prop is required
  }
});

// Get the count of weeks as a computed property
const numberOfWeeks = computed(() => props.weeks.length);

// Compute the total number of activities in the course
const totalActivities = computed(() => {
  let count = 0;
  for (const week of props.weeks) {
    count += week.activities.length;
  }
  return count;
});

const addWeek = () => {
  props.weeks.push({ title: '', activities: [{ title: '', activityType: 'read watch listen', description: '', minutes: '', students: '' }] });
};

const removeWeek = (weekIndex) => {
  props.weeks.splice(weekIndex, 1);
};

const addActivity = (weekIndex) => {
  props.weeks[weekIndex].activities.push({ title: '', activityType: 'read watch listen', description: '', minutes: '', students: '' });
};

const handleRemoveActivity = (weekIndex, activityIndex) => {
  props.weeks[weekIndex].activities.splice(activityIndex, 1);
};

const exportJSON = () => {
  const data = props.weeks.map(week => ({
    title: week.title,
    activities: week.activities.map(activity => ({
      title: activity.title,
      activityType: activity.activityType,
      description: activity.description,
      minutes: activity.minutes,
      students: activity.students
    }))
  }));
  const jsonData = JSON.stringify(data, null, 2);
  
  const blob = new Blob([jsonData], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.json';
  a.click();
  URL.revokeObjectURL(a.href);
};
</script>

<template>
  <div>
  <div class="p-2 px-5 bg-slate-200 -mt-5 -mx-5 flex sticky -top-5 shadow-sm border-b border-slate-300 justify-between items-center">
    <h1 class="text-2xl mb-0 font-semibold flex gap-2 items-center"><PaintBrushIcon class="w-5 h-5" /> Design</h1>
    <div class="flex flex-col items-center">
      <h2 class="text-xl mb-0">Course Title</h2>
      <p class="text-sm">{{ totalActivities }} Activities in {{ numberOfWeeks }} Weeks</p>
    </div>
    
    <div class="flex gap-2">
      <button @click="addWeek" class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-1">Add Week <PlusCircleIcon class="w-5 h-5"/> </button>
      <button @click="exportJSON" class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-1">Export Course <ArrowUpOnSquareIcon class="w-5 h-5"/></button>
    </div>
  </div>
  <div class="container py-10">
    <div class="w-100">
      <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="flex flex-col gap-5 mb-8">
        <div class="bg-slate-100 p-5 rounded-md border-slate-200 border">
          <div class="week-header pt-0 flex justify-between">
            <h2 class="text-xl font-semibold mb-4">
              <input v-model="week.title" type="text" class="form-input w-full p-1 rounded-sm bg-transparent" :placeholder="'Week ' + (weekIndex + 1)" />
            </h2>
            <button @click="removeWeek(weekIndex)" class="text-red-500 flex gap-1"><span class="sr-only">Remove Week</span><XMarkIcon class="w-5 h-5"/></button>
          </div>
          <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-5 ">
            <Activity v-for="(activity, activityIndex) in week.activities" :key="activityIndex" :week="week" :weekIndex="weekIndex" :activity="activity" :activityIndex="activityIndex" @remove-activity="handleRemoveActivity(weekIndex, activityIndex)" />
          </TransitionGroup>
          <button @click="addActivity(weekIndex)" class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-1">Add Activity <PlusCircleIcon class="w-5 h-5"/></button>
        </div>
      </div>
    </div>
  </div>
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
