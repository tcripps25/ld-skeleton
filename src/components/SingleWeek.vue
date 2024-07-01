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
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import PanelNotice from '@/components/ui/PanelNotice.vue'
import DetailSidebar from '@/components/ui/DetailSidebar.vue'
import Page from './Page.vue';
import PageHeader from './PageHeader.vue';
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


</script>

<template>
  <Page class="grow">
    <template v-slot:page-header>
      <PageHeader title="Design">

      </PageHeader>
    </template>
    <div v-if="week">

      <div class="flex grow flex-col gap-7">
        <div>
          <div class="my-5 flex justify-between">
            <div class="flex items-center gap-3">
              <FloatLabel>
                <InputText id="week-title" v-model="week.name" type="text" class="text-2xl" />
                <label for="week-title">{{ 'Teaching Week ' + (index + 1) + ' title' }}</label>
              </FloatLabel>
              <Button @click="toggleAddDescActive"
                class="!p-2 !px-3 h-10 w-max text-sm flex gap-2 !bg-transparent border-0 !text-blue-700 hover:!bg-slate-200"
                :class="{ '!bg-slate-200': addDescActive }">
                Add description
                <Transition>
                  <CheckCircleIcon v-if="week.description" class="h-5 w-5 text-blue-400" />
                </Transition>
              </Button>
            </div>
            <div class="font-normal -mt-5 flex flex-col"><span class="text-sm text-slate-500">Week Commencing</span>
              <span class="text-2xl font-semibold">{{
                week.formattedDate
                }}</span>
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
