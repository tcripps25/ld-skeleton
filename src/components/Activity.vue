<script setup>
import { XMarkIcon, EllipsisHorizontalCircleIcon } from '@heroicons/vue/24/solid'
import { useCourseStore } from '@/stores/course.js'
import { ref, computed } from 'vue';
import MultiSelect from 'primevue/multiselect';
import Listbox from 'primevue/listbox'

const course = useCourseStore();

const props = defineProps({
  activity: Object,
  activityIndex: Number,
  week: Object,
  weekIndex: Number
});

const editMode = ref(false);

const toggleEditMode = () => {
  editMode.value = !editMode.value;
}

// Define state for the toggles
const isGroup = ref(props.activity.isGroup ?? true);
const isAcademicPresent = ref(props.activity.isAcademicPresent ?? false);
</script>
<template>
  <div id="activity-container" class="relative w-full h-96 rounded-lg max-w-md mb-5 overflow-hidden">
  <div id="activity-summary" class="bg-slate-200 p-4 relative rounded-lg h-full">
    <div class="flex justify-center">
      <h3 class="text-2xl font-semibold">{{ activity.title || 'Untitled Activity ' + (activityIndex + 1) }}</h3>
      <button @click="toggleEditMode" class="text-red-500 flex items-center gap-1">
        <span class="sr-only">Remove Activity</span>
        <EllipsisHorizontalCircleIcon class="w-5 h-5"/>
      </button>
    </div>
  </div>

  <div v-if="editMode" id="activity-options" :class="{'z-10': editMode}" class="absolute w-full top-0 h-full overflow-y-scroll border p-4 bg-slate-300 shadow-sm">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold">
        <input v-model="activity.title" type="text" class="border-0 form-input w-full py-1 px-0 rounded-sm bg-transparent" :placeholder="'Activity ' + (activityIndex + 1)" />
      </h3>
      <button @click="toggleEditMode" class="text-red-500 flex items-center gap-1">
        <span class="sr-only">Remove Activity</span>
        <XMarkIcon class="w-5 h-5"/>
      </button>
    </div>

    <div class="flex gap-5">
      <div class="mt-4">
        <label :for="'minutes-' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Minutes:</label>
        <input v-model="activity.minutes" :id="'minutes-' + props.weekIndex + '-' + activityIndex" :name="'minutes-' + props.weekIndex + '-' + activityIndex" type="number" class="border-0 form-input mt-1 block p-1 w-full rounded-sm">
      </div>
      <div class="mt-4">
        <label :for="'students-' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Students:</label>
        <input v-model="activity.students" :id="'students-' + props.weekIndex + '-' + activityIndex" :name="'students-' + props.weekIndex + '-' + activityIndex" type="number" class="form-input mt-1 block p-1 w-full rounded-sm border-0">
      </div>
    </div>

    <div class="flex gap-5 mt-4">
      <div>
        <Listbox v-model="activity.selectedActivityTypes" :options="course.activityTypes" multiple class="w-full md:w-[14rem]" />
      </div>
    </div>
    
    
    <MultiSelect v-model="activity.alignments" 
               :options="course.alignmentOptions"
               optionLabel="label"
               optionGroupLabel="group"
               optionGroupChildren="items"
               display="chip" 
               placeholder="Select Alignments" 
               class="w-full">
    <template #optiongroup="slotProps">
      <div class="flex items-center">
        <img alt="" 
             src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" 
             class="" 
             style="width: 18px" />
        <div>{{ slotProps.option.group }}</div>
      </div>
    </template>
    </MultiSelect>
    <div class="flex gap-5 mt-4">
      <div class="mt-4">
        <label class="block sr-only text-gray-700">Group:</label>
        <button @click="activity.isGroup = !activity.isGroup" :class="{'bg-blue-600': activity.isGroup, 'bg-gray-300': !activity.isGroup}" class="px-4 py-2 rounded transition text-white">
          {{ activity.isGroup ? 'Group Activity' : 'Individual Activity' }}
        </button>
      </div>
      <div class="mt-4">
        <label class="block sr-only text-gray-700 whitespace-nowrap">Instructor Present:</label>
        <button @click="activity.isAcademicPresent = !activity.isAcademicPresent" :class="{'bg-blue-600': activity.isAcademicPresent, 'bg-gray-300': !activity.isAcademicPresent}" class="px-4 py-2 rounded transition text-white">
          {{ activity.isAcademicPresent ? 'Instructor Present' : 'Instructor Absent' }}
        </button>
      </div>
    </div>

    <div class="mt-4">
      <label :for="'description-' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Description:</label>
      <textarea v-model="activity.description" :id="'description-' + props.weekIndex + '-' + activityIndex" :name="'description-' + props.weekIndex + '-' + activityIndex" rows="4" class="form-textarea mt-1 block w-full rounded-sm p-1 border-0"></textarea>
    </div>
    <div class="mt-4">
      <label :for="'notes-' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Notes:</label>
      <textarea v-model="activity.notes" :id="'notes-' + props.weekIndex + '-' + activityIndex" :name="'notes-' + props.weekIndex + '-' + activityIndex" rows="2" class="form-textarea mt-1 block w-full rounded-sm p-1 border-0"></textarea>
    </div>
  </div>
</div>
</template>
