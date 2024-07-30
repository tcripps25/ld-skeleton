<script setup>
import { ref, computed, watch } from 'vue';
import WeekSummary from '@/components/WeekSummary.vue';
import PageHeader from '@/components/PageHeader.vue';
import Panel from '@/components/ui/Panel.vue';
import Page from '@/components/Page.vue'
import { useRoute, RouterView } from 'vue-router';
import { useCourseStore } from '@/stores/course.js'
import Button from 'primevue/button';
import { PlusCircleIcon } from '@heroicons/vue/24/solid';

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
const isDesignPage = computed(() => route.path === '/design/overview');


</script>

<template>
  <div>
    <Page v-if="isDesignPage">
      <template v-slot:page-header>
        <PageHeader title="Design" />
      </template>
      <Panel>
        <div class="w-100 flex flex-col gap-5">
          <TransitionGroup>
            <WeekSummary v-for="(week, weekIndex) in course.weeks" :key="weekIndex" :week="week" :weekIndex="weekIndex"
              class="flex flex-col gap-5" />
          </TransitionGroup>
          <Button @click="course.incrementWeek();"
            pt:root:class="ring group rounded-lg grow w-full h-full h-full flex justify-center items-center hover:shadow transition text-slate-800 p-5"
            label="Add Week" title="Add Week">
            <PlusCircleIcon class="h-10 w-10 text-blue-500 group-hover:text-blue-400 transition" />
          </Button>
        </div>
      </Panel>
    </Page>
    <router-view v-else></router-view>

  </div>
</template>
