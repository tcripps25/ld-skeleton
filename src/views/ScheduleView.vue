<script setup>
import { ref, computed, watch } from 'vue';
import WeekSummary from '@/components/WeekSummary.vue';
import PageHeader from '@/components/PageHeader.vue';
import Panel from '@/components/ui/Panel.vue';
import Page from '@/components/Page.vue'
import { useRoute, RouterView } from 'vue-router';
import { useCourseStore } from '@/stores/course.js'
import Pbutton from '@/components/buttons/Pbutton.vue';
import { PlusIcon } from '@heroicons/vue/16/solid';

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
const isDesignPage = computed(() => route.path === '/schedule');

const items = [
  {
    label: 'Add multiple weeks',
    command: () => {
      toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
    }
  }
];

</script>

<template>
  <div>
    <Page v-if="isDesignPage">
      <template v-slot:page-header>
        <PageHeader sectionTitle="Design" title="Module Schedule" />
      </template>
      <Panel title="Teaching Weeks">
        <div class="flex flex-col gap-5 ">
          <TransitionGroup>
            <WeekSummary v-for="(week, weekIndex) in course.weeks" :key="weekIndex" :week="week"
              :weekIndex="weekIndex" />
          </TransitionGroup>

        </div>
        <template #lhcontent>
          <div class="sticky top-0 flex justify-end">
            <Pbutton ghost :items="items" @click="course.incrementWeek();" label="Add Week" class="self-end">
            </Pbutton>
          </div>
        </template>
      </Panel>


    </Page>
    <router-view v-else></router-view>

  </div>
</template>
