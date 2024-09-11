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

  <div class="bg-slate-100 rounded px-2 py-1 my-1">
    <span>{{ moodleActivity.name }}</span>
  </div>

</template>
