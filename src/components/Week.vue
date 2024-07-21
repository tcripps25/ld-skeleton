<script setup>
import { TransitionGroup, computed, onMounted } from 'vue';

import { useCourseStore } from '@/stores/course.js'

import { RouterView } from 'vue-router';
import ScrollPanel from 'primevue/scrollpanel';
import ActivityCard from '@/components/ActivityCard.vue';

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

  <div class="flex flex-col ">

    <ScrollPanel class="w-full h-auto  -mx-5 -my-5">
      <TransitionGroup name="list" tag="ul" class="flex gap-3  p-5 ">
        <li v-for="activity in items" :key="activity" class="">
          <ActivityCard :item="activity" :weekIndex="weekIndex" />
        </li>

      </TransitionGroup>
    </ScrollPanel>






    <RouterView />


    <!-- <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-5 pl-5">
      <Activity v-for="(activity, activityIndex) in week.activities" :key="activityIndex" :week="week"
        :weekIndex="weekIndex" :activity="activity" :activityIndex="activityIndex"
        @remove-activity="handleRemoveActivity(weekIndex, activityIndex)" />
    </TransitionGroup>
    -->
  </div>
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
