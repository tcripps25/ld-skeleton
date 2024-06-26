<script setup>
import { onMounted, watch, onUnmounted } from 'vue';
import ApexCharts from 'apexcharts';
import { useCourseStore } from '@/stores/course.js'
import { slugify } from '@/utils/utils';

const course = useCourseStore();

const props = defineProps({
  title: String,
  id: String,
  information: String,
  dataseries: Array,
  datalabels: Array,
  colors: Array,
});

const slug = slugify(props.id);

let chart;

const createChart = () => {
  const options = {
    series: props.dataseries,
    colors: props.colors,
    chart: {
      height: 300,
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
          return value + "%"
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

  const chartElement = document.getElementById(slug + "-pie-chart");
  if (chartElement && typeof ApexCharts !== 'undefined') {
    chart = new ApexCharts(chartElement, options);
    chart.render();
  }
};

const updateChart = () => {
  if (chart) {
    chart.updateOptions({
      series: props.dataseries,
      labels: props.datalabels,
    });
  }
};

onMounted(() => {
  createChart();
});

watch(() => props.dataseries, updateChart);
watch(() => props.datalabels, updateChart);

onUnmounted(() => {
  if (chart) {
    chart.destroy();
  }
});
</script>


<template>
  <h3 class="font-semibold text-2xl mb-3" v-if="title">{{ title }}</h3>
  <slot></slot>
  <div class="">
    <div :id="id + '-pie-chart'" class=""></div>
  </div>
</template>
