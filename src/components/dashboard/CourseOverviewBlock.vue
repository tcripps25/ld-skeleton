<script setup>
import { useCourseStore } from '@/stores/course.js'
import Panel from '../ui/Panel.vue';
import LineChart from '@/components/charts/LineChart.vue'
const course = useCourseStore()

</script>

<template>
    <div class="flex gap-5">
<Panel :title="'Overview for ' + course.title">
    <div class="flex gap-7">
<div class="flex flex-col my-3">
    The longest Activity: <div class="mt-3"><span class="text-4xl font-semibold">{{ course.maxMinsInActivity }}</span> minutes</div>
</div>
<div class="flex flex-col my-3">
    The largest group: <div class="mt-3"><span class="text-4xl font-semibold">{{ course.maxStudentsInActivity }}</span> students</div>
</div>

</div>
</Panel>

</div>

</template>