<script setup>
import { onMounted, computed } from 'vue';
import Week from './Week.vue';
import Panel from './ui/Panel.vue';
import PieChart from './charts/PieChart.vue';
import { useCourseStore } from '@/stores/course.js'

const props = defineProps({
  week: Object,
  index: String
});

const course = useCourseStore();
const weekStats = computed(() => course.getWeekTypeByIndex(props.index));

onMounted(() => {
  console.log(weekStats.value);
});


</script>

<template>
<div class="flex flex-col gap-7">
<Panel :title="week.title + ' overview'">
    <PieChart :dataseries="weekStats.activityTypePercentages" :datalabels="course.activityTypes">
      <p class="mb-3">This chart shows an overview of the Activity types you have used across all weeks of your Course.</p>
      </PieChart>
</Panel>
    <Week :week="week" :week-index="index" />
</div>
</template>