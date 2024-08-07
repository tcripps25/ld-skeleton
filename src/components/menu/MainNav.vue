<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { PaintBrushIcon, HomeIcon, ChartPieIcon, Cog8ToothIcon, ArrowUpOnSquareIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';
import { PlusIcon } from '@heroicons/vue/16/solid';
import { useCourseStore } from '@/stores/course.js';
import { computed } from 'vue';
import WeekLink from '@/components/menu/WeekLink.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import MenuItem from './MenuItem.vue';
import Button from 'primevue/button';
import Pbutton from '../buttons/Pbutton.vue';

const course = useCourseStore();
const route = useRoute();

const showDesign = ref(false);

const toggleShowDesign = () => {
  showDesign.value = !showDesign.value;
}

const isDesignActive = computed(() => route.path === '/design' || route.path.startsWith('/design/'));

const handleAddWeek = () => {
  course.incrementWeek(); // Use store action to increment the week
};
</script>

<template>
  <nav id="main-nav" class="flex flex-col gap-2 text-slate-600 grow">
    <MenuItem title="Set Up" to="/">
    <Cog8ToothIcon class="w-5 h-5" />
    </MenuItem>
    <div class="">
      <Pbutton label="Design" @click="toggleShowDesign" id="show-design-button">
        <template #icon>
          <ChevronDownIcon class="w-4 h-4 ml-1 -rotate-90 transition" :class="{ '!rotate-0': showDesign }" />
        </template>
      </Pbutton>
    </div>
    <Transition name="drawer">
      <ul v-if="showDesign" class="px-5 flex-col bg-slate-50 py-4 border-y shadow-inner relative -mx-5">
        <li>
          <MenuItem title="Overview" to="/design/overview">
          </MenuItem>
        </li>
        <li class="mb-3 relative">
          <div class="flex justify-between p-2 items-center border-b">
            <h3>Weeks</h3>
            <Pbutton @click="handleAddWeek" aria-label="Add Week" class="-mr-3">
              <template #icon>
                <PlusIcon class="w-5 h-5" />
              </template>
            </Pbutton>

          </div>
        </li>
        <!-- Rounded top of week timeline -->
        <div v-if="course.weeks.length > 0"
          class="w-1 h-5 rounded-t absolute translate-x-3 -translate-y-1 bg-slate-300">
        </div>
        <TransitionGroup v-if="course.weeks.length > 0" class="flex flex-col relative" name="list" tag="ul">
          <WeekLink v-for="(week, index) in course.weeks" :key="index" :week="week" :index="index">
          </WeekLink>
        </TransitionGroup>
        <Transition v-else>
          <div class="p-2 text-sm italic rounded">
            There are no weeks in this Design yet, add one with the button above.
          </div>
        </Transition>
        <!-- Rounded bottom of week timeline -->
        <div v-if="course.weeks.length > 0" class="h-1 w-1 rounded-b bottom-0 absolute translate-x-3 -translate-y-3
          bg-slate-300">
        </div>
      </ul>

    </Transition>
    <MenuItem title="Visualise" to="/visualise">
    <ChartPieIcon class="w-5 h-5" />
    </MenuItem>
    <MenuItem title="Publish" to="/publish">
    <ArrowUpOnSquareIcon class="w-5 h-5" />
    </MenuItem>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showDesign: false,
      course: {
        weeks: [] // your data here
      }
    };
  },
  methods: {
    toggleShowDesign() {
      this.showDesign = !this.showDesign;
    }
  }
};
</script>


<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  height: 0px;
  position: absolute;
  top: 6rem;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  height: 0px;
  overflow: hidden;
  margin-top: -1.3rem;
  margin-bottom: -1.3rem;
}
</style>