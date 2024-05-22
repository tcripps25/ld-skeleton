<script setup>
import PageHeader from '@/components/PageHeader.vue';
import { useCourseStore } from '@/stores/course.js'
import CourseOverviewBlock from '@/components/dashboard/CourseOverviewBlock.vue'
import Page from '@/components/Page.vue'
import LineChart from '@/components/charts/LineChart.vue';
import Panel from '@/components/ui/Panel.vue';

const course = useCourseStore()
</script>

<template>
  <div>
    <PageHeader :title="'Dashboard: ' +  course.title" />
    <Page class="grid sm:grid-cols-1 2xl:grid-cols-3 gap-10">
      <CourseOverviewBlock class="col-span-full" />
      <Panel class="">
      <LineChart />
    </Panel>
    </Page>
  </div>
</template>
