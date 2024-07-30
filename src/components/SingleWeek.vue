<script setup>
import { computed, watch, ref } from 'vue';
import Week from './Week.vue';
import Panel from './ui/Panel.vue';
import PieChart from '@/components/charts/PieChart.vue';
import PanelNotice from '@/components/ui/PanelNotice.vue';
import { useCourseStore } from '@/stores/course.js'
import { useRoute } from 'vue-router'
import InputText from 'primevue/inputtext';
import Meter from '@/components/charts/Meter.vue';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Pbutton from './buttons/Pbutton.vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid'
import { CheckCircleIcon, ChevronDownIcon, PlusCircleIcon } from '@heroicons/vue/24/solid';
import DetailSidebar from '@/components/ui/DetailSidebar.vue'
import Page from './Page.vue';
import PageHeader from './PageHeader.vue';
import ActivityClass from '@/classes/Activity';
import { PencilIcon, PlusIcon } from '@heroicons/vue/16/solid';

import GptPanel from '@/ai/GptPanel.vue';
import ActivityLabel from './forms/ActivityLabel.vue';
const route = useRoute()

const props = defineProps({
  week: Object,
  index: Number
});


const course = useCourseStore();




const addDescActive = ref(false);

const toggleAddDescActive = () => {
  addDescActive.value = !addDescActive.value
}

const addActivity = (weekIndex) => {

  const newActivity = new ActivityClass();
  newActivity.duration = 0

  if (props.week.activities.length >= 0) {
    newActivity.title = 'New Activity ' + (props.week.activities.length + 1)
  }
  course.weeks[weekIndex].activities.push(newActivity);
};

const editTitle = ref(false)

const toggleEditTitle = () => {
  editTitle.value = !editTitle.value
}


const weekStats = computed(() => course.getActivityTypePercentagesForWeek(props.index));

watch(weekStats, (newStats) => {
  console.log('Week stats updated:', newStats);
});
</script>

<template>
  <Page class="grow relative" sidebar-title="Statistics">
    <template #page-header>
      <PageHeader :title="week.name">
        <template #toolbar>
          <Pbutton aria-label="Manage Week">
            <template #icon>
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </template>
          </Pbutton>
        </template>
      </PageHeader>
    </template>
    <template #lead>
      <p>Enter information about this week of your Module.</p>
    </template>
    <template #sidebar>
      <Transition name="slide-fade">
        <div class="flex flex-col gap-10 divide-y">

          <Transition name="fade">
            <Panel borderless flush sidebar>
              <Meter title="Activity Duration" :values="course.getActivitiesForWeek(index)"
                :max="course.totalMinsInWeekActivities(index)">
                <p class="mb-3">Your total time for this week split by Activity.
                </p>
                <template #meter-badge>
                  <div class="flex gap-2 items-center justify-end rounded w-full">

                    <p class="text-lg font-medium text-teal-700">{{
                      course.totalMinsInWeekActivities(index) }} <span class="text-sm text-slate-600">Total
                        minutes</span>
                    </p>

                  </div>
                </template>
              </Meter>
            </Panel>
          </Transition>
          <Transition name="fade">
            <Panel borderless flush sidebar>
              <PieChart chartWidth="350" legendPosition="left" :dataseries="weekStats"
                :datalabels="course.activityTypes" :colors="course.activityColors" title="Learning Type Mix"
                :id="'week-' + (index + 1) + '-learning-types'">
                <p class="mb-3">An overview of the Learning Types you have used in this week of your course.
                </p>
              </PieChart>
              <PanelNotice sidebar enable>
                A glance at your Learning Type mix for this week. These types will also determine which
                Moodle
                activities
                will be suggested for each Activity you create.
              </PanelNotice>
            </Panel>
          </Transition>
        </div>
      </Transition>
    </template>

    <Panel title="General Information">
      <template #info>
        Both Week Name and Week description will appear on your Moodle module for students to see. <br><br> Week name
        should
        describe the main themes of the learning content succinctly. <br><br> Week description can be longer, you'll be
        able to toggle whether this is permanently displayed on your module within Moodle itself.
      </template>
      <div class="flex flex-col gap-3 mb-10">
        <ActivityLabel label="Week name" targetId="week-name" help="Enter a name for this week.">
          <InputText v-model="week.name" id="week-name" />
        </ActivityLabel>
        <ActivityLabel label="Week description" targetId="week-description"
          help="Describe the aims of this week to your students.">
          <Textarea v-model="week.description" id="week-description" />
        </ActivityLabel>
      </div>
    </Panel>
    <Week v-if="week" :week="week" :week-index="index" @add-activity="addActivity(index)" />




    <div v-else class="">
      <Panel title="Not found">
        <p>Selected Week can't be found, navigate to 'Set Up' and then refresh the page.</p>
      </Panel>
    </div>

  </Page>


</template>
