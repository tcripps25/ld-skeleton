<script setup>
import { ref, computed } from 'vue';
import { useCourseStore } from '@/stores/course.js';
import { PlusCircleIcon } from '@heroicons/vue/24/solid'; 
import Button from "primevue/button";

const course = useCourseStore();
const currentWeeks = computed(() => course.numberOfWeeks);

const handleAddWeek = () => {
  console.log('Adding a new week');  // Debugging log

  const weekNumber = currentWeeks.value + 1;
  course.incrementWeek(); // Use store action to increment the week

  console.log('Current Weeks:', course.numberOfWeeks);  // Debugging log

  console.log('New week added:', course.weeks[course.weeks.length - 1]);  // Debugging log
};
</script>

<template>
  <button @click="handleAddWeek">hi</button>
</template>
