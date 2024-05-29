<script setup>
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon, EllipsisHorizontalIcon, ArrowUturnLeftIcon, ClockIcon, DocumentTextIcon, PlusIcon, PencilIcon } from '@heroicons/vue/24/solid'
import { useCourseStore } from '@/stores/course.js'
import { ref, computed, watch } from 'vue';
import MultiSelect from 'primevue/multiselect';
import Listbox from 'primevue/listbox'
import Button from 'primevue/button';
import SettingsPanel from '@/components/ui/SettingsPanel.vue'
import InputSwitch from 'primevue/inputswitch';


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

const editSummary = ref(false);

const toggleEditSummary = () => {
  editSummary.value = !editSummary.value;
  editMode.value = !editMode.value;
}

// Define state for the toggles
const isGroup = ref(props.activity.isGroup ?? true);
const isAcademicPresent = ref(props.activity.isAcademicPresent ?? false);



const isAligned = (item) => {
  return computed({
    get: () => {
      // Check again within the getter in case of reactivity issues
      if (!props.activity.alignments) {
        props.activity.alignments = [];
      }
      return props.activity.alignments.some(alignment => alignment.value === item.value);
    },
    set: (newValue) => {
      if (!props.activity.alignments) {
        props.activity.alignments = [];
      }

      if (newValue) {
        if (!props.activity.alignments.some(alignment => alignment.value === item.value)) {
          props.activity.alignments.push(item);
        }
      } else {
        const index = props.activity.alignments.findIndex(alignment => alignment.value === item.value);
        if (index > -1) {
          props.activity.alignments.splice(index, 1);
        }
      }
    }
  });
};

</script>
<template>
  <div id="activity-container" class="relative w-full h-[30rem] shadow-sm rounded-lg max-w-md mb-5">

  <div id="activity-summary" :class="{'scale-95 bg-slate-300 -translate-x-5': editMode}" class="bg-slate-200 overflow-y-auto px-4 pb-4 transition relative rounded-lg h-full flex flex-col gap-4">
    <div :class="{'bg-slate-300': editMode}" class="transition flex justify-center border-b border-slate-300 shadow-sm py-3 sticky top-0 bg-slate-200 -mx-4 z-10">
      
        <h3 class="text-md font-semibold text-slate-700">Activity {{ activityIndex + 1}}</h3>
       
      <Button @click="toggleEditMode" rounded class="!p-0 !absolute right-2 top-2 bg-slate-300 border-slate-200 border-2 hover:bg-slate-300 hover:border-2 hover:border-slate-400 w-8 h-8">
        <span class="sr-only">Edit Activity</span>
        <EllipsisHorizontalIcon class="text-slate-600"/>
      </Button>
    </div>
    <div class="flex justify-between items-center mb-3">
      <h4 class="text-xl font-semibold"> {{ activity.title || 'Untitled Activity ' + (activityIndex + 1) }} </h4>
        <Button @click="toggleEditSummary" class="!p-1 h-max bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
          <span class="sr-only">Edit Activity title</span>
          <PencilIcon class="w-4 h-4 text-slate-700"></PencilIcon>
        </Button>
         
    </div>
      
  
  <div class="flex">
    <div v-if="activity.minutes" class="p-2 flex gap-2 items-center bg-slate-100 rounded">
      <span class="sr-only">Activity duration</span>
      <ClockIcon title="Activity duration" class="w-5 h-5 text-slate-500" />{{ activity.minutes }} mins
    </div>
    <div class="w-full flex flex-col gap-5">
          <div class="flex justify-between gap-4 items-center ">
            <label class="w-max font-medium" :for="activityIndex + '-studentNumber'">Participants:</label>
            <input type="number" class="w-16 p-1 px-2 rounded" v-model="activity.students" :id="activityIndex + '-studentNumber'" min="0" :step="1" >
          </input>
          </div>
          <div class="flex justify-between gap-4">
            <label class="w-max font-medium" :for="activityIndex + '-group-toggle'">Group Activity:</label>
            <InputSwitch v-model="activity.isGroup" :inputId="activityIndex + '-group-toggle'"/>
          </div>
      </div>
  </div>
  <div v-if="activity.description" class="flex gap-2 justify-between">
    <div class="p-2 bg-slate-100 rounded items-start flex gap-2 grow">
    <p class="w-full">{{  activity.description }}</p>
  </div>
   
 
  </div>
    <div class="">
      <div class="flex justify-between items-center mb-2 border-b pb-1 border-slate-300">
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
      <p class="p-8 text-center bg-slate-50/40 rounded  text-slate-500 text-sm" v-else>There are no associated types for this Activity yet.</p>
    </div>
    <div class="">
      <div class="flex justify-between items-center mb-2 border-b pb-1 border-slate-300">
      <h4 class="text-lg font-medium">Alignment<span v-if="activity && activity.alignments && activity.alignments.length > 1" >s</span></h4>
    <Button @click="toggleEditAlign" title="Add an associated alignment" class="!p-0 bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
      <PlusIcon class="w-5 h-5 text-slate-700" />
    </Button>
    </div>
      <ul v-if="activity && activity.alignments && activity.alignments.length > 0" class="divide-slate-300 divide-y ml-4 flex flex-col">
        <li v-for="(alignment, index) in activity.alignments" class="py-3">
          <div class="">
          {{ alignment.label }}
        </div>
        </li>
      </ul>
      <p class="p-8 bg-slate-50/40 rounded text-center text-slate-500 text-sm" v-else>There are no associated alignments for this Activity yet.</p>
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
   
    <div class="flex gap-5">
      <div class="mt-4">
        <label :for="'minutes-' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Activity duration (minutes):</label>
        <input v-model="activity.minutes" :id="'minutes-' + props.weekIndex + '-' + activityIndex" :name="'minutes-' + props.weekIndex + '-' + activityIndex" type="number" class="border-0 form-input mt-1 block p-1 w-full rounded-sm">
      </div>
    </div>

    
    
    
    
    <div class="flex gap-5 mt-4">
      
      <div class="mt-4">
        <label class="block sr-only text-gray-700 whitespace-nowrap">Instructor Present:</label>
        <button @click="activity.isAcademicPresent = !activity.isAcademicPresent" :class="{'bg-blue-600': activity.isAcademicPresent, 'bg-gray-300': !activity.isAcademicPresent}" class="px-4 py-2 rounded transition text-white">
          {{ activity.isAcademicPresent ? 'Instructor Present' : 'Instructor Absent' }}
        </button>
      </div>
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
    <template v-slot:description>
      <p>Edit the Types for this Activity here</p>
    </template>    
    <div class="gap-5 mt-4">
          <div>
            <Listbox v-model="activity.selectedActivityTypes" :options="course.activityTypes" multiple class="w-full" />
          </div>
        </div>
  </SettingsPanel>
</Transition>

<Transition>
  <SettingsPanel v-if="editAlign" :title="'Edit Alignments'" :class="{'z-10': editAlign}" @close-panel="toggleEditAlign" id="activity-alignment-select">
    <template v-slot:description>
      <p>Select which Objectives and/or Assessments this Activity aligns with.</p>
  </template>
    <div v-for="(option, index) in course.alignmentOptions" :key="index">
      <h3 class="font-semibold mb-1 mt-3">{{ option.group }}</h3>
      <ul class="flex flex-col divide-y divide-slate-300 ml-4">
        <li v-for="(item, index) in option.items" :key="index" class="-ml-5 flex gap-5 justify-between hover:bg-slate-100 px-2 py-3 hover:rounded transition">
          <span class="p-1 w-9 h-max text-sm font-medium flex items-center justify-center bg-cyan-700 text-white rounded-full">{{ (index +++ 1) }}</span>
          <p class="w-full mr-2">{{ item.label }}</p>
          <div class="w-max">
            <label class="sr-only" :for="item.value + '-switch-' + index">{{ item.label }}</label>
            <InputSwitch v-model="isAligned(item).value" :inputId="item.value + '-switch-' + index"/>
          </div>
        </li>
       
      </ul>
    </div>
  </SettingsPanel>
</Transition>

<Transition>
  <SettingsPanel v-if="editSummary" :title="'Edit Summary'" :class="{'z-10': editAlign}" @close-panel="toggleEditSummary" id="activity-alignment-select">
    <template v-slot:description>
      <p>Edit the title, instructions, number of students and other general settings for this Activity.</p>
  </template>
  <div class="flex flex-col">
        <label :for="'name' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Activity name:</label>
        <input :id="'name' + props.weekIndex + '-' + activityIndex" v-model="activity.title" type="text" class="border-0 form-input mt-1 block p-1 w-full rounded-sm" :placeholder="'Activity ' + (activityIndex + 1)" />
      </div>
     
  <div class="mt-4">
      <label :for="'description-' + props.weekIndex + '-' + activityIndex" class="block text-gray-700">Instructions:</label>
      <textarea v-model="activity.description" :id="'description-' + props.weekIndex + '-' + activityIndex" :name="'description-' + props.weekIndex + '-' + activityIndex" rows="4" class="form-textarea mt-1 block w-full rounded-sm p-1 border-0"></textarea>
    </div>
    
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