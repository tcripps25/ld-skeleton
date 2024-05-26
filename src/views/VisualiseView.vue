<script setup>
import { onMounted } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import { useCourseStore } from '@/stores/course.js'
import CourseOverviewBlock from '@/components/dashboard/CourseOverviewBlock.vue'
import Page from '@/components/Page.vue'
import LineChart from '@/components/charts/LineChart.vue';
import Panel from '@/components/ui/Panel.vue';
import PieChart from '@/components/charts/PieChart.vue';
const course = useCourseStore()


</script>

<template>
  <div>
    <PageHeader :title="'Visualise'" />
    <Page class="grid sm:grid-cols-1 2xl:grid-cols-3 gap-6">
      <CourseOverviewBlock class="col-span-full" />
      <Panel :title="'Activities per week'" class="col-span-2">
      <LineChart :datax="course.weekNames" :datay="course.activitiesPerWeek">
        <p class="mb-3">The number of Activities you have allocated to each week.</p>
      <div class="flex py-1 mb-2">
        <p class="grow flex flex-col">
          Total Activities:
          <span class="text-2xl font-semibold">{{ course.totalActivities }}</span>
        </p>
        <p class="text-small grow flex flex-col">
          Weeks:
          <span class="text-2xl font-semibold">{{ course.numberOfWeeks }}</span>
        </p>
      </div>
      </LineChart>
    </Panel>

    <Panel :title="'Activity Types'">
      <PieChart :dataseries="course.activityTypePercentages" :datalabels="course.activityTypes" :colors="course.activityColors">
      <p class="mb-3">This chart shows an overview of the Activity types you have used across all weeks of your Course.</p>
      </PieChart>
    </Panel>
    </Page>
  </div>
</template>
