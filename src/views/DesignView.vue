<script setup>
import { ref, computed, watch } from 'vue';
import Week from '@/components/Week.vue';
import PageHeader from '@/components/PageHeader.vue';
import AddWeekButton from '@/components/buttons/AddWeekButton.vue'
import Page from '@/components/Page.vue'
import { useRoute, RouterView } from 'vue-router';
import { useCourseStore } from '@/stores/course.js'

const course = useCourseStore()
const route = useRoute();

const message = ref(course.totalActivities + ' Activities in ' + course.numberOfWeeks + ' Weeks');

// Computed properties to easily watch the course properties
const totalActivities = computed(() => course.totalActivities);
const numberOfWeeks = computed(() => course.numberOfWeeks);

// Watch for changes in totalActivities and numberOfWeeks to update the message
watch([totalActivities, numberOfWeeks], ([newTotalActivities, newNumberOfWeeks]) => {
  message.value = newTotalActivities + ' Activities in ' + newNumberOfWeeks + ' Weeks';
});

// Check if the current route is '/design' or any of its sub-routes
const isDesignPage = computed(() => route.path === '/design');

</script>

<template>
  <div>
    <PageHeader :title="'Design'" :message="message">
    <AddWeekButton />
    </PageHeader>
    <Page>
      <div v-if="isDesignPage" class="w-100">
        <Week v-for="(week, weekIndex) in course.weeks" :key="weekIndex" :week="week" :weekIndex="weekIndex" class="flex flex-col gap-5 mb-8" />
      </div>
      <router-view v-else></router-view>
      
    </Page>
  </div>
</template>

