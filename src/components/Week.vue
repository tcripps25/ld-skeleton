<script setup>
import { useRoute, useRouter } from 'vue-router';
import { TransitionGroup, computed, onMounted } from 'vue';
import TipBox from './ui/TipBox.vue';
import { useCourseStore } from '@/stores/course.js'
import Pbutton from './buttons/Pbutton.vue';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, Squares2X2Icon } from '@heroicons/vue/16/solid';
import { RouterView } from 'vue-router';
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid';
import ScrollPanel from 'primevue/scrollpanel';
import ActivityMenuItem from '@/components/ActivityMenuItem.vue';
import Panel from './ui/Panel.vue';
import GptPanel from '@/ai/GptPanel.vue';
const route = useRoute();
const course = useCourseStore()
const router = useRouter();
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

const allActivitiesItem = computed(() => ({
  route: `/design/${props.weekIndex}`,
  label: 'All Activities',
}));

const noActivitySelected = computed(() => route.path === '/design/' + props.weekIndex);

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

    <template #lhcontent>
      <Transition>
        <div class="sticky -top-3">
          <ul class="border-b mb-2 pb-1">
            <li>
              <ActivityMenuItem :item="allActivitiesItem" :weekIndex="weekIndex" :index="index">
                <template #icon>
                  <Squares2X2Icon class="w-5 h-5" />
                </template>
              </ActivityMenuItem>
            </li>
          </ul>


          <TransitionGroup name="list" tag="ol" class="flex flex-col">
            <li v-for="(activity, index) in items" :key="activity.route" class="">
              <ActivityMenuItem :item="activity" :weekIndex="weekIndex" :index="index" />
            </li>
          </TransitionGroup>
          <Pbutton menuLink ghost @click="course.addActivityToWeek(weekIndex)" label="Add Activity" class=" pl-4 mt-1">
            <template #icon>
              <PlusIcon class="w-5 h-5" />
            </template>
          </Pbutton>
          <TipBox class="mt-5">
            yo
          </TipBox>
        </div>
      </Transition>
    </template>

    <!-- Activity shown here -->

    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <component :is="Component" />
      </transition>
    </router-view>



  </Panel>







  <!-- <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-5 pl-5">
      <Activity v-for="(activity, activityIndex) in week.activities" :key="activityIndex" :week="week"
        :weekIndex="weekIndex" :activity="activity" :activityIndex="activityIndex"
        @remove-activity="handleRemoveActivity(weekIndex, activityIndex)" />
    </TransitionGroup>
    -->

</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;

}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

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
