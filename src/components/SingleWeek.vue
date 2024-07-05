<script setup>
import { onMounted, computed, watch, ref } from 'vue';
import Week from './Week.vue';
import Panel from './ui/Panel.vue';
import PieChart from './charts/PieChart.vue';
import { useCourseStore } from '@/stores/course.js'
import { useRoute } from 'vue-router'
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { CheckCircleIcon, ChevronDownIcon, PlusCircleIcon } from '@heroicons/vue/24/solid';
import PanelNotice from '@/components/ui/PanelNotice.vue'
import DetailSidebar from '@/components/ui/DetailSidebar.vue'
import Page from './Page.vue';
import PageHeader from './PageHeader.vue';
import ActivityClass from '@/classes/Activity';
import { PencilIcon } from '@heroicons/vue/16/solid';
import OverlayPanel from 'primevue/overlaypanel';

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
    newActivity.name = 'New Activity ' + (props.week.activities.length + 1)
  }
  course.weeks[weekIndex].activities.push(newActivity);
};

const editTitle = ref(false)

const toggleEditTitle = () => {
  editTitle.value = !editTitle.value
}
</script>

<template>
  <Page class="grow">
    <template v-slot:page-header>
      <PageHeader :title="week.name">
        <template v-slot:title>
          <div class="flex gap-1">
            <h1 v-if="!editTitle" class="text-xl mb-0 font-semibold flex gap-2 items-center">{{ week.name }}</h1>
            <div class="flex items-center gap-2">
              <label v-if="editTitle" class="sr-only" for="week-title">{{ 'Teaching Week ' + (index + 1) + ' title'
                }}</label>
              <InputText v-if="editTitle" id="week-title" v-model="week.name" type="text" class="text-xl" />
              <Button @click="toggleEditTitle" class="bg-transparent text-slate-700 !rounded-lg hover:bg-slate-200 border-none min-w-7 max-w-7 min-h-7 max-h-7 !p-0
              flex justify-center items-center">
                <PencilIcon class="text-slate-500 w-4 h-4>" />
              </Button>
            </div>

          </div>
        </template>
        <Button @click="addActivity(index)"
          pt:root:class="bg-sky-600 hover:bg-sky-500 text-sky-50 px-3 py-2 rounded-md flex items-center gap-1 w-max">
          Add
          Activity
          <PlusCircleIcon class="w-5 h-5" />
        </Button>
        <template v-slot:toolbar>
          <div class="font-normal flex flex-col text-sm"> Week Commencing: {{ week.formattedDate }} </div>
        </template>
      </PageHeader>
    </template>

    <div v-if="week">

      <div class="flex grow flex-col gap-7">
        <div>
          <div class="my-5 flex justify-between">
            <div class="flex items-center gap-3">

              <Button @click="toggleAddDescActive"
                class="!p-2 !px-3 h-10 w-max text-sm flex gap-2 !bg-transparent border-0 !text-blue-700 hover:!bg-slate-200"
                :class="{ '!bg-slate-200': addDescActive }">
                Add description
                <Transition>
                  <CheckCircleIcon v-if="week.description" class="h-5 w-5 text-blue-400" />
                </Transition>
              </Button>
            </div>

          </div>
          <Transition>
            <div v-if="addDescActive" id="editWeek" class="">
              <label class="text-sm mb-1 ml-3 flex" :for="'week-' + index + '-description'">Description:</label>
              <Textarea class="p-2 w-full rounded border" rows="2" :id="'week-' + index + '-description'" type="text"
                v-model="week.description" />
            </div>
          </Transition>
        </div>
        <Week :week="week" :week-index="index" :showTitle="false" />
      </div>


    </div>


    <div v-else class="">
      <Panel title="Not found">
        <p>Selected Week can't be found, navigate to 'Set Up' and then refresh the page.</p>
      </Panel>
    </div>
  </Page>
  <DetailSidebar :week="week" :index="index" />
</template>
