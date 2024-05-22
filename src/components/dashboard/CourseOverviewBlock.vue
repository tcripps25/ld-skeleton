<script setup>
import { useCourseStore } from '@/stores/course.js'
import Panel from '../ui/Panel.vue';
import LineChart from '@/components/charts/LineChart.vue'
const course = useCourseStore()

</script>

<template>
    <div class="flex gap-5">
<Panel :title="'Overview'">

</Panel>

</div>

</template>