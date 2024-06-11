<script setup>
import Button from 'primevue/button';
import { ref, watch, computed } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  moodleActivity: Object,
  activity: Object
});

// Ensure selectedMoodle is reactive
if (!props.activity.selectedMoodle) {
  props.activity.selectedMoodle = ref([]);
}

const selected = computed({
  get() {
    return props.activity.selectedMoodle.includes(props.moodleActivity);
  },
  set(value) {
    if (value) {
      if (!props.activity.selectedMoodle.includes(props.moodleActivity)) {
        props.activity.selectedMoodle.push(props.moodleActivity);
      }
    } else {
      const index = props.activity.selectedMoodle.indexOf(props.moodleActivity);
      if (index !== -1) {
        props.activity.selectedMoodle.splice(index, 1);
      }
    }
  }
});

const toggleSelected = () => {
  selected.value = !selected.value;
};
</script>

<template>
  <Button @click="() => { $emit('selected'); toggleSelected(); }"
    pt:root:class="bg-white border p-1 text-sm w-full rounded">
    <div class="flex gap-2">
      <Transition name="fade">
        <CheckCircleIcon v-if="selected" class="w-5 h-5 absolute text-blue-500" />
      </Transition>
      <div class="w-5 h-5 bg-slate-100 rounded-full border"></div>
      <span>{{ moodleActivity.name }}</span>
    </div>
  </Button>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(.7);
}
</style>
