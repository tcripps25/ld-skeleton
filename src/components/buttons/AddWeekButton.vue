<script setup>
import { ref } from 'vue';
import { useCourseStore } from '@/stores/course.js'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'; 
const course = useCourseStore();
import Button from "primevue/button";

// Initialize currentWeeks based on the reactive store value
const currentWeeks = ref(course.numberOfWeeks);

const handleAddWeek = () => {
  console.log('Adding a new week');  // Debugging log

  const weekNumber = currentWeeks.value + 1;
  currentWeeks.value++;

  console.log('Current Weeks:', currentWeeks.value);  // Debugging log

  course.weeks.push({
    title: "Week " + weekNumber,
    activities: [{
      title: '',
      selectedActivityTypes: [],
      description: '',
      notes: '',
      minutes: '',
      students: '',
      isGroup: false
    }]
  });

  console.log('New week added:', course.weeks[course.weeks.length - 1]);  // Debugging log
};
</script>

<template>
    <Button @click="handleAddWeek" pt:root:class="bg-blue-600 hover:bg-blue-500" class="text-blue-50 border px-4 py-2 rounded-md flex items-center gap-1">
        Add Week 
        <PlusCircleIcon class="w-5 h-5"/> 
    </Button>
</template>
