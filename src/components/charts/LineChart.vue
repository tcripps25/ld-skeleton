<script setup>
import { onMounted, watchEffect } from 'vue';
import ApexCharts from 'apexcharts';
import { useCourseStore } from '@/stores/course.js'

const course = useCourseStore();

const props = defineProps({
    title: String,
    information: String,
    datax: Object,
    datay: Object,
});

let chart;

const createChart = () => {
  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "line",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
      curve: 'smooth',
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 20,
        right: 2,
        top: -26,
      },
    },
    series: [
      {
        name: "Activities",
        data: props.datay,
        color: "#1A56DB",
      },
    ],
    legend: {
      show: false,
    },
    xaxis: {
      categories: props.datax,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartElement = document.getElementById("line-chart");
  if (chartElement && typeof ApexCharts !== 'undefined') {
    chart = new ApexCharts(chartElement, options);
    chart.render();
  }
};

onMounted(() => {
  createChart();
});

watchEffect(() => {
  if (chart) {
    chart.updateOptions({
      series: [{
        data: course.activitiesPerWeek,
      }],
      xaxis: {
        categories: course.weekNames,
      },
    });
  }
});
</script>

<template>
    <h3 v-if="title">{{ title }}</h3>
    <slot></slot>
    <div id="line-chart"></div>
    
</template>
