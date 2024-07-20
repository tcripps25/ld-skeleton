<script setup>
import { onMounted, computed, watch, ref } from 'vue';
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

import { CheckCircleIcon, ChevronDownIcon, PlusCircleIcon } from '@heroicons/vue/24/solid';

import DetailSidebar from '@/components/ui/DetailSidebar.vue'
import Page from './Page.vue';
import PageHeader from './PageHeader.vue';
import ActivityClass from '@/classes/Activity';
import { PencilIcon, PlusIcon } from '@heroicons/vue/16/solid';

import GptPanel from '@/ai/GptPanel.vue';
const route = useRoute()

const props = defineProps({
  week: Object,
  index: Number
});


const course = useCourseStore();



onMounted(() => {
  console.log(props.index);
});

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
          <div class="flex justify-center items-center gap-2">
            <Pbutton @click="addActivity(index)" label="Add Activity">
              <template #icon>
                <PlusIcon class="w-5 h-5" />
              </template>
            </Pbutton>

            <GptPanel :week-index="index" />
          </div>
        </template>
      </PageHeader>
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
              <PanelNotice enable>
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
    <div v-if="week">


      <Week :week="week" :week-index="index" :showTitle="false" />

    </div>


    <div v-else class="">
      <Panel title="Not found">
        <p>Selected Week can't be found, navigate to 'Set Up' and then refresh the page.</p>
      </Panel>
    </div>

  </Page>


</template>
