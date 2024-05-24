<script setup>
import { useCourseStore } from '@/stores/course.js'
import { TrashIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  index: Number,
});

const course = useCourseStore();

const removeWeek = (weekIndex) => {
  course.weeks.splice(weekIndex, 1);
};
</script>

<template>
<button @click="removeWeek(index)" :title="'Remove week ' + (index +++ 1)" class="w-7 h-7 p-1 rounded peer-hover:bg-slate-200 hover:bg-slate-50 hover:text-red-900 absolute transition right-2 z-10">
    <TrashIcon class="w-5 h-5"/>
</button>

</template>