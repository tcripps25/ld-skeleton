<script setup>
import { ref, computed } from 'vue';
import { useCourseStore } from '@/stores/course.js';
import { PlusIcon } from '@heroicons/vue/24/solid';
import Button from "primevue/button";

const course = useCourseStore();
const currentWeeks = computed(() => course.numberOfWeeks);

const handleAddWeek = () => {
  console.log('Adding a new week');  // Debugging log

  course.incrementWeek(); // Use store action to increment the week

  console.log('Current Weeks:', course.numberOfWeeks);  // Debugging log

  console.log('New week added:', course.weeks[course.weeks.length - 1]);  // Debugging log
};
</script>

<template>
  <Button @click="handleAddWeek" pt:root:class="hover:bg-slate-200 rounded" label="Add Week" title="Add Week">
    <span class="sr-only">Add Week</span>
    <PlusIcon class="w-4 h-4 hover:bg-slate-200 rounded-sm" />
  </Button>
</template>
