<script setup>
import { TransitionGroup, computed, onMounted } from 'vue';

import { useCourseStore } from '@/stores/course.js'
import Pbutton from './buttons/Pbutton.vue';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/vue/16/solid';
import { RouterView } from 'vue-router';
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid';
import ScrollPanel from 'primevue/scrollpanel';
import ActivityMenuItem from '@/components/ActivityMenuItem.vue';
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

      <Pbutton aria-label="Manage Activities">
        <template #icon>
          <EllipsisHorizontalIcon class="w-5 h-5" />
        </template>
      </Pbutton>
      <GptPanel :weekIndex="weekIndex" />

    </template>
    <template #subtitle>
      <p>Create and manage Activities for this week.</p>
    </template>

    <div class="flex gap-10 flex-initial mt-10">
      <div class="block w-54">
        <div class="sticky -top-0">
          <TransitionGroup name="list" tag="ol" class="flex flex-col">
            <li v-for="(activity, index) in items" :key="activity.route" class="">
              <ActivityMenuItem :item="activity" :weekIndex="weekIndex" :index="index" />
            </li>
          </TransitionGroup>
          <Pbutton menuLink ghost @click="$emit('addActivity')" label="Add Activity" class=" pl-4 mt-1">
            <template #icon>
              <PlusIcon class="w-5 h-5" />
            </template>
          </Pbutton>
        </div>
      </div>
      <!-- Activity shown here -->

      <RouterView />
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
