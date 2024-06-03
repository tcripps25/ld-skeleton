<script setup>
import { ref } from 'vue';
import { useCourseStore } from '@/stores/course.js'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'; 
const course = useCourseStore();
import Button from "primevue/button";

// Make sure to initialize currentWeeks based on the reactive store value
const currentWeeks = ref(course.numberOfWeeks);

// Handle add week function
const handleAddWeek = () => {
  const weekNumber = currentWeeks.value + 1; // Increment currentWeeks value
  currentWeeks.value++; // Increment currentWeeks for next use

  // Ensure the course store is updated reactively
  course.weeks.push({ 
    title: "Week " + weekNumber, // Concatenate "Week " with the incremented week number
    activities: [{ 
      title: '', 
      activityTypes: [], 
      description: '', 
      notes: '', 
      minutes: '', 
      students: '',
      isGroup: false
    }] 
  });
};

</script>

<template>
    <Button @click="handleAddWeek" pt:root:class="bg-blue-600 hover:bg-blue-500" class="text-blue-50 border px-4 py-2 rounded-md flex items-center gap-1">
        Add Week 
        <PlusCircleIcon class="w-5 h-5"/> 
    </Button>
</template>
