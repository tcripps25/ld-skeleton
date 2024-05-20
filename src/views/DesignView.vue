<script setup>
import { ref, computed, watch } from 'vue';
import Week from '@/components/Week.vue';
import PageHeader from '@/components/PageHeader.vue';

import { useCourseStore } from '@/stores/course.js'

const course = useCourseStore()

const message = ref(course.totalActivities + ' Activities in ' + course.numberOfWeeks + ' Weeks');

// Computed properties to easily watch the course properties
const totalActivities = computed(() => course.totalActivities);
const numberOfWeeks = computed(() => course.numberOfWeeks);

// Watch for changes in totalActivities and numberOfWeeks to update the message
watch([totalActivities, numberOfWeeks], ([newTotalActivities, newNumberOfWeeks]) => {
  message.value = newTotalActivities + ' Activities in ' + newNumberOfWeeks + ' Weeks';
});
</script>

<template>
  <div>
    <PageHeader :title="'Design'" :message="message" />
    <div class="py-10">
      <div class="w-100">
        <Week v-for="(week, weekIndex) in course.weeks" :key="weekIndex" :week="week" :weekIndex="weekIndex" class="flex flex-col gap-5 mb-8" />
      </div>
    </div>
  </div>
</template>

