<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js'
const course = useCourseStore()

const props = defineProps({
  name: String
});

const resetCourse = () => {
  course.title = '';
  course.weeks = []; // Reset weeks to an empty array
};
</script>

<template>
<button :title="name" @click="resetCourse" class="border-slate-600 bg-slate-800 border-2 text-slate-100 hover:bg-slate-900 hover:border-blue-500 px-4 py-2 rounded-md h-max flex items-center gap-1 transition"><span class="sr-only">{{ name }} </span><ArrowPathIcon class="w-5 h-5"/></button>
</template>