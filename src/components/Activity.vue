<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'


const props = defineProps({
  activity: Object,
  activityIndex: Number,
  week: Object,
  weekIndex: Number
});



</script>
<template>
<div class="mb-4 border border-slate-300 p-4 rounded-md max-w-md bg-slate-200 shadow-sm">
<div class="flex items-center justify-between mb-2">
    <h3 class="text-lg font-semibold">
      <input v-model="activity.title" type="text" class="form-input w-full py-1 rounded-sm bg-transparent" :placeholder="'Activity ' + (activityIndex + 1)" />
    </h3>
    <button @click="$emit('removeActivity', weekIndex, activityIndex)" class="text-red-500 flex items-center gap-1"><span class="sr-only">Remove Activity</span><XMarkIcon class="w-5 h-5"/></button>
  </div>
  
  <div class="flex gap-5">
    <div class="mt-4">
      <label :for="'minutes-' + weekIndex + '-' + activityIndex" class="block text-gray-700">Minutes:</label>
      <input v-model="activity.minutes" :id="'minutes-' + weekIndex + '-' + activityIndex" :name="'minutes-' + weekIndex + '-' + activityIndex" type="number" class="form-input mt-1 block p-1 w-full rounded-sm">
    </div>
    <div class="mt-4">
      <label :for="'students-' + weekIndex + '-' + activityIndex" class="block text-gray-700">Students:</label>
      <input v-model="activity.students" :id="'students-' + weekIndex + '-' + activityIndex" :name="'students-' + weekIndex + '-' + activityIndex" type="number" class="form-input mt-1 block p-1 w-full rounded-sm">
    </div>
  </div>
  <div class="mt-4">
    <label :for="'activity-type-' + weekIndex + '-' + activityIndex" class="block text-gray-700">Activity Type:</label>
    <select v-model="activity.activityType" :id="'activity-type-' + weekIndex + '-' + activityIndex" :name="'activity-type-' + weekIndex + '-' + activityIndex" class="bg-white form-select mt-1 block p-1 w-full rounded-sm">
      <option value="read watch listen">Read, Watch, Listen</option>
      <option value="collaborate">Collaborate</option>
      <option value="investigate">Investigate</option>
      <option value="discuss">Discuss</option>
      <option value="practice">Practice</option>
      <option value="produce">Produce</option>
    </select>
  </div>
  <div class="mt-4">
    <label :for="'description-' + weekIndex + '-' + activityIndex" class="block text-gray-700">Description:</label>
    <textarea v-model="activity.description" :id="'description-' + weekIndex + '-' + activityIndex" :name="'description-' + weekIndex + '-' + activityIndex" rows="4" class="form-textarea mt-1 block w-full rounded-sm p-1"></textarea>
  </div>
  <div class="mt-4">
    <label :for="'notes-' + weekIndex + '-' + activityIndex" class="block text-gray-700">Notes:</label>
    <textarea v-model="activity.notes" :id="'notes-' + weekIndex + '-' + activityIndex" :name="'notes-' + weekIndex + '-' + activityIndex" rows="2" class="form-textarea mt-1 block w-full rounded-sm p-1"></textarea>
  </div>
</div>
</template>