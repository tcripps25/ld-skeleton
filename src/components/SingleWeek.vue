<script setup>
import { onMounted, computed, watch } from 'vue';
import Week from './Week.vue';
import Panel from './ui/Panel.vue';
import PieChart from './charts/PieChart.vue';
import { useCourseStore } from '@/stores/course.js'

const props = defineProps({
  week: Object,
  index: Number
});

const course = useCourseStore();
const weekStats = computed(() => course.getActivityTypePercentagesForWeek(props.index));

watch(weekStats, (newStats) => {
  console.log('Week stats updated:', newStats);
});

onMounted(() => {
  console.log(props.week);
});
</script>

<template>
  <div v-if="week" class="">
    <div class="flex flex-col gap-7">
      <div>
        <h2 class="text-2xl font-semibold mb-5 flex flex-col">
          <span class="text-base text-slate-500 font-medium">Teaching Week {{ index + 1 }}</span>
          <input v-model="week.title" type="text" class="text-2xl font-semibold mb-5 border-0 w-max p-0 rounded-sm bg-transparent" :placeholder="'Week ' + (index + 1)" />    
        </h2>
      </div>
      <div class="flex gap-7">
        <Panel title="Activity Overview">
          <PieChart :dataseries="weekStats" :datalabels="course.activityTypes" :colors="course.activityColors">
            <p class="mb-3">An overview of the Activity types you have used in this week of your course.</p>
          </PieChart>
        </Panel>
        <div class="flex gap-7">
          <Panel title="Module Learning Objectives">
            <ol class="flex flex-col gap-2 list-decimal p-10">
              <li v-for="(outcome, index) in course.learningOutcomes" :key="index">{{ outcome.label }}</li>
            </ol>
          </Panel>
          <Panel title="Module Assessments">
            <ol class="flex flex-col gap-2 list-decimal p-10 whitespace-nowrap">
              <li v-for="(outcome, index) in course.assessments" :key="index">{{ outcome.label }}</li>
            </ol>
          </Panel>
        </div>
      </div>
      <Week :week="week" :week-index="index" :showTitle="false" />
    </div>
  </div>
  <div v-else class="">
    <Panel title="Error">
      <p>Selected Week not found</p>
    </Panel>
  </div>
</template>