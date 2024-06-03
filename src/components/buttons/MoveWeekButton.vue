<script setup>
import { useCourseStore } from '@/stores/course.js'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  index: Number,
});

const course = useCourseStore();

const moveWeekUp = (weekIndex) => {
  if (weekIndex > 0) {
    const temp = [...course.weeks]; // Create a copy of the array
    const movedWeek = temp.splice(weekIndex, 1)[0];
    temp.splice(weekIndex - 1, 0, movedWeek);
    course.weeks = temp; // Update the store with the modified array
  }
};

const moveWeekDown = (weekIndex) => {
  if (weekIndex < course.weeks.length - 1) {
    const temp = [...course.weeks]; // Create a copy of the array
    const movedWeek = temp.splice(weekIndex, 1)[0];
    temp.splice(weekIndex + 1, 0, movedWeek);
    course.weeks = temp; // Update the store with the modified array
  }
};

</script>

<template>
  <div class="flex items-center relative z-10">
    <button @click="moveWeekUp(index)" :title="'Move week ' + (index + 1) + ' up'" class="w-7 h-7 p-1 rounded peer-hover:bg-slate-200 hover:bg-slate-50 hover:text-blue-900 transition ">
      <ArrowUpIcon class="w-5 h-5"/>
    </button>
    <button @click="moveWeekDown(index)" :title="'Move week ' + (index + 1) + ' down'" class="w-7 h-7 p-1 rounded peer-hover:bg-slate-200 hover:bg-slate-50 hover:text-red-900 transition">
      <ArrowDownIcon class="w-5 h-5"/>
    </button>
  </div>
</template>
