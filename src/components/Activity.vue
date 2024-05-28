<script setup>
import { XMarkIcon, EllipsisHorizontalIcon, ArrowUturnLeftIcon, ClockIcon, DocumentTextIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { useCourseStore } from '@/stores/course.js'
import { ref, computed } from 'vue';
import MultiSelect from 'primevue/multiselect';
import Listbox from 'primevue/listbox'
import Button from 'primevue/button';
import SettingsPanel from '@/components/ui/SettingsPanel.vue'
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


const editTypes = ref(false);

const toggleEditTypes = () => {
  editTypes.value = !editTypes.value;
  editMode.value = !editMode.value;
}

const editAlign = ref(false);

const toggleEditAlign = () => {
  editAlign.value = !editAlign.value;
  editMode.value = !editMode.value;
}

// Define state for the toggles
const isGroup = ref(props.activity.isGroup ?? true);
const isAcademicPresent = ref(props.activity.isAcademicPresent ?? false);
</script>
<template>
  <div id="activity-container" class="relative w-full h-[30rem] rounded-lg max-w-md mb-5">

  <div id="activity-summary" :class="{'scale-95 bg-slate-300 -translate-x-5': editMode}" class="bg-slate-200 overflow-y-auto p-4 transition relative rounded-lg h-full flex flex-col gap-4">
    <div class="flex justify-between">
      <h3 class="text-2xl font-semibold flex flex-col">
        <span class="text-base text-slate-700">Activity {{ activityIndex + 1}}</span>
        {{ activity.title || 'Untitled Activity ' + (activityIndex + 1) }}</h3>
      <Button @click="toggleEditMode" rounded class="!p-0 bg-slate-300 border-slate-200 border-2 hover:bg-slate-300 hover:border-2 hover:border-slate-400 w-8 h-8">
        <span class="sr-only">Edit Activity</span>
        <EllipsisHorizontalIcon class="text-slate-600"/>
      </Button>
    </div>
  <div class="flex">
    <div v-if="activity.minutes" class="p-2 flex gap-2 items-center bg-slate-100 rounded">
      <span class="sr-only">Activity duration</span>
      <ClockIcon title="Activity duration" class="w-5 h-5 text-slate-500" />{{ activity.minutes }} mins
    </div>
  </div>
  <div v-if="activity.description" class="p-2 bg-slate-100 rounded items-start flex gap-2">
    <DocumentTextIcon class="w-5 h-5 text-slate-500" /> <p class="w-full">{{  activity.description }}</p>
  </div>
    <div class="">
      <div class="flex justify-between items-center mb-2">
      <h4 class="text-lg font-medium">Type<span v-if="activity.selectedActivityTypes && activity.selectedActivityTypes.length > 1" >s</span></h4>
      <Button @click="toggleEditTypes" title="Add an associated Activity type" class="!p-0 bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
      <PlusIcon class="w-5 h-5 text-slate-700" />
    </Button>
    </div>
      <ul v-if="activity && activity.selectedActivityTypes && activity.selectedActivityTypes.length > 0" class="grid grid-cols-3 gap-2 py-1">
        <li v-for="(type, index) in activity.selectedActivityTypes" class="p-1 px-2 rounded bg-slate-100">
          {{ type }}
        </li>
      </ul>
      <p class="p-10 text-center bg-slate-50/40 rounded  text-slate-500 text-sm" v-else>There are no associated types for this Activity yet.</p>
    </div>
    <div class="">
      <div class="flex justify-between items-center mb-2">
      <h4 class="text-lg font-medium">Alignment<span v-if="activity && activity.alignments && activity.alignments.length > 1" >s</span></h4>
    <Button @click="toggleEditAlign" title="Add an associated alignment" class="!p-0 bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
      <PlusIcon class="w-5 h-5 text-slate-700" />
    </Button>
    </div>
      <ul v-if="activity && activity.alignments && activity.alignments.length > 0" class="ml-4 flex flex-col gap-2">
        <li v-for="(alignment, index) in activity.alignments">
          <div class="">
          {{ alignment.label }}
        </div>
        </li>
      </ul>
      <p class="p-10 bg-slate-50/40 rounded text-center text-slate-500 text-sm" v-else>There are no associated alignments for this Activity yet.</p>
    </div>
  </div>
  
  <Transition>
    
  <div id="activity-options" class="w-full hidden rounded-lg absolute top-0 h-full overflow-y-scroll border p-4 pt-0 bg-slate-200 shadow-sm">
    <div class="flex items-center justify-between mb-2 border-b border-slate-300 -mx-4 px-4 py-2 sticky z-20 shadow-sm top-0 bg-slate-200">
    <h3 class="text-xl relative font-semibold">Editing: {{ activity.title || 'Untitled Activity ' + (activityIndex +++ 1) }}</h3>
    <Button @click="toggleEditMode" rounded class="!p-1 bg-slate-300 border-slate-200 border-2 hover:bg-slate-300 hover:border-2 hover:border-slate-400 w-8 h-8">
      <span class="sr-only">Stop Editing Activity</span>
        <ArrowUturnLeftIcon class="text-slate-600"/>
    </Button>
    </div>
    <div class="flex flex-col">
        <label :for="'name' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Activity name:</label>
        <input :id="'name' + props.weekIndex + '-' + activityIndex" v-model="activity.title" type="text" class="border-0 form-input mt-1 block p-1 w-full rounded-sm" :placeholder="'Activity ' + (activityIndex + 1)" />
      </div>
    <div class="flex gap-5">
      <div class="mt-4">
        <label :for="'minutes-' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Activity duration (minutes):</label>
        <input v-model="activity.minutes" :id="'minutes-' + props.weekIndex + '-' + activityIndex" :name="'minutes-' + props.weekIndex + '-' + activityIndex" type="number" class="border-0 form-input mt-1 block p-1 w-full rounded-sm">
      </div>
    </div>

    
    
    
    
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
    <Button @click="$emit('removeActivity')" severity="danger" class="w-full mt-5 !rounded">
      Remove this activity
    </Button>
  </div>
</Transition>
<Transition>
  <SettingsPanel v-if="editTypes" :title="'Edit Activity Types'" :class="{'z-10': editTypes}" @close-panel="toggleEditTypes" id="activity-type-select">
        <div class="flex gap-5 mt-4">
          <div>
            <Listbox v-model="activity.selectedActivityTypes" :options="course.activityTypes" multiple class="w-full md:w-[14rem]" />
          </div>
        </div>
  </SettingsPanel>
</Transition>

<Transition>
  <SettingsPanel v-if="editAlign" :title="'Edit Alignments'" :desc="'Use this page to select which Objectives and/or Assessments this Activity aligns with.'" :class="{'z-10': editAlign}" @close-panel="toggleEditAlign" id="activity-alignment-select">
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
  </SettingsPanel>
</Transition>
  </div>
</template>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease, transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(5px);
}

</style>