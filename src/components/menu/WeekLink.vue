<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { PlayIcon } from '@heroicons/vue/16/solid';
import { useRoute } from 'vue-router';
import RemoveWeekButton from '@/components/buttons/RemoveWeekButton.vue';
import MoveWeekButton from '@/components/buttons/MoveWeekButton.vue'

const props = defineProps({
  week: Object,
  index: Number,
});

const route = useRoute();

const to = computed(() => `/design/${props.index}`);
const isActiveLink = computed(() => route.path === to.value);


</script>

<template>
  <li class="flex justify-between group items-center ml-6 hover:bg-slate-200 rounded group transition">
    <RouterLink :to="to" :active-class="'aria-current:font-semibold'"
      :class="['transition peer-hover:bg-slate-300 flex gap-3 p-2 items-center  grow peer', $attrs.class]"
      v-bind="$attrs">

      <div class="flex flex-col w-full">
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <Transition name="btn-icon">
              <PlayIcon v-if="isActiveLink" class="-translate-x-8 h-4 w-4 absolute text-blue-500" />
            </Transition>
            <span class="max-w-28 whitespace-nowrap text-ellipsis overflow-hidden">{{ week.name }}</span>
          </div>
          <span class="text-xs text-slate-400 font-normal group-hover:hidden">{{ week.activities.length }}</span>
        </div>
        <div class="flex gap-2 justify-start text-xs font-normal items-center text-slate-500">
          <span>Week {{ index + 1 }}:</span>
          <span class="">{{ week.formattedDate }}</span>
        </div>
      </div>

    </RouterLink>

    <div
      class="absolute right-0 group-hover:opacity-100 opacity-0 transition flex items-center bg-slate-200 rounded mr-2">
      <MoveWeekButton :index="index" class="" />
      <RemoveWeekButton :index="index" class="" />
    </div>

  </li>
</template>


<style scoped>
.btn-icon-enter-active,
.btn-icon-leave-active {
  transition: all 0.2s ease;
}

.btn-icon-enter-from,
.btn-icon-leave-to {
  opacity: 0;
  transform: translateX(-40px);

}
</style>