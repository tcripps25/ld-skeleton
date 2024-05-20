<script setup>
import { useCourseStore } from '@/stores/course.js'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'; 
const course = useCourseStore()




const handleAddWeek = () => {
  course.weeks.push({ title: '', activities: [{ title: '', activityType: 'read watch listen', description: '', notes: '', minutes: '', students: '' }] });
};

</script>

<template>
    <button @click="(handleAddWeek)" class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-1">Add Week <PlusCircleIcon class="w-5 h-5"/> </button>
</template>