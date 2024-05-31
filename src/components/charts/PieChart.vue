<script setup>
import { onMounted, watch, onUnmounted } from 'vue';
import { useCourseStore } from '@/stores/course.js'
import Chart from 'primevue/chart';
const course = useCourseStore();

const props = defineProps({
    title: String,
    information: String,
    dataseries: Array, 
    datalabels: Array,
    colors: Array,
});

const chartData = {
  labels: props.datalabels,
  datasets: [{
    label: props.title,
    data: props.dataseries,
    backgroundColor: props.colors,
    hoverOffset: 4
  }]
};
</script>


<template>
    <h3 v-if="title">{{ title }}</h3>
    <slot></slot>
    <Chart type="pie" :data="chartData"  class="w-full md:w-30rem" />
  </template>
