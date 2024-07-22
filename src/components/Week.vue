<script setup>
import { TransitionGroup, computed, onMounted } from 'vue';

import { useCourseStore } from '@/stores/course.js'
import Pbutton from './buttons/Pbutton.vue';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/vue/16/solid';
import { RouterView } from 'vue-router';
import ScrollPanel from 'primevue/scrollpanel';
import ActivityCard from '@/components/ActivityCard.vue';
import Panel from './ui/Panel.vue';
import GptPanel from '@/ai/GptPanel.vue';
const course = useCourseStore()

// Define props
const props = defineProps({
  week: Object,
  weekIndex: Number,
  showTitle: Boolean,
});

const removeWeek = (weekIndex) => {
  course.weeks.splice(weekIndex, 1);
};



const handleRemoveActivity = (weekIndex, activityIndex) => {
  course.weeks[weekIndex].activities.splice(activityIndex, 1);
};


const panelTitle = computed(() => {
  return props.showTitle ? props.week.name : '';
});

const items = computed(() =>
  props.week.activities.map((activity, index) => ({
    route: `/design/${props.weekIndex}/${index}`,
    label: activity.title
  }))
);


</script>

<template>
  <Panel title="Activities">
    <template #action>

      <Pbutton @click="$emit('addActivity')" label="Add Activity">
        <template #icon>
          <PlusIcon class="w-5 h-5 " />
        </template>
      </Pbutton>
      <GptPanel :weekIndex="weekIndex" />

    </template>
    <template #subtitle>
      <p>All Activities for this week will appear here. Use the controls on the right hand side to navigate through
        activities or add a new Activity.</p>
    </template>
    <div class="-ml-5 flex gap-10 flex-initial">
      <TransitionGroup name="list" tag="ol" class="flex flex-col w-54">
        <li v-for="(activity, index) in items" :key="activity.route" class="">
          <ActivityCard :item="activity" :weekIndex="weekIndex" :index="index" />
        </li>
      </TransitionGroup>
      <!-- Activity shown here -->
      <RouterView class="bg-slate-50 p-5 -mr-5 border-t border-s border-b rounded-s" />
    </div>

  </Panel>







  <!-- <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-5 pl-5">
      <Activity v-for="(activity, activityIndex) in week.activities" :key="activityIndex" :week="week"
        :weekIndex="weekIndex" :activity="activity" :activityIndex="activityIndex"
        @remove-activity="handleRemoveActivity(weekIndex, activityIndex)" />
    </TransitionGroup>
    -->

</template>

<style scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;

}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
