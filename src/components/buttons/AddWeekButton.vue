<script setup>
import { ref } from 'vue';
import { useCourseStore } from '@/stores/course.js'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'; 
const course = useCourseStore()


const currentWeeks = ref(course.numberOfWeeks);

const handleAddWeek = () => {
  const weekNumber = currentWeeks.value + 1; // Increment currentWeeks value
  currentWeeks.value++; // Increment currentWeeks for next use
  course.weeks.push({ 
    title: "Week " + weekNumber, // Concatenate "Week " with the incremented week number
    activities: [{ 
      title: '', 
      activityType: 'read watch listen', 
      description: '', 
      notes: '', 
      minutes: '', 
      students: '' 
    }] 
  });
};

</script>

<template>
    <button @click="(handleAddWeek)" class="bg-blue-600 hover:bg-blue-500 text-blue-50 border px-4 py-2 rounded-md flex items-center gap-1">Add Week <PlusCircleIcon class="w-5 h-5"/> </button>
</template>