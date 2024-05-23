<script setup>
import { onMounted, watchEffect } from 'vue';
import ApexCharts from 'apexcharts';
import { useCourseStore } from '@/stores/course.js'

const course = useCourseStore();

const props = defineProps({
    title: String,
    information: String,
    dataseries: Object,
    datalabels: Object,
});

let chart;

const createChart = () => {
  const options = {
    series: props.dataseries,
    colors: ["#1C64F2", "#16BDCA", "#9061F9", "#9061F9", "#9061F9", "#9061F9"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25
        }
      },
    },
    labels: props.datalabels,
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%"
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value  + "%"
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };

  const chartElement = document.getElementById("pie-chart");
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
    <div id="pie-chart"></div>
    
</template>
