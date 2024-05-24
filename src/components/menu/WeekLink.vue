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
    <li class="flex justify-between items-center ml-8 hover:bg-slate-300 rounded group transition">
    <RouterLink
      :to="to"
      :active-class="'aria-current:font-semibold'"
      :class="['transition  peer-hover:bg-slate-300 flex gap-3 p-2 items-center  grow peer', $attrs.class]"
      v-bind="$attrs"
    >
    <Transition name="btn-icon">
      <PlayIcon v-if="isActiveLink" class="-ml-6 h-3 w-3 relative" />
    </Transition>
    <slot :week="week" :index="index"></slot>
    </RouterLink>
    <div class="group-hover:opacity-100 opacity-0 transition flex items-center bg-slate-200 rounded mr-2">
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
  transform: translateX(-5px);

}
</style>