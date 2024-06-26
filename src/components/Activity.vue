<script setup>
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, TrashIcon, EllipsisHorizontalIcon, ArrowUturnLeftIcon, ClockIcon, DocumentTextIcon, PlusIcon, PencilIcon, CheckCircleIcon } from '@heroicons/vue/24/solid'
import { useCourseStore } from '@/stores/course.js'
import { ref, computed, watch, onMounted } from 'vue';
import MultiSelect from 'primevue/multiselect';
import Listbox from 'primevue/listbox'
import Button from 'primevue/button';
import InfoButton from '@/components/buttons/InfoButton.vue'
import SettingsPanel from '@/components/ui/SettingsPanel.vue'
import InputSwitch from 'primevue/inputswitch';
import SelectButton from 'primevue/selectbutton';
import MoodleActivity from '@/components/ui/MoodleActivity.vue';

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

const editInstructions = ref(false);

const toggleEditInstructions = () => {
  editInstructions.value = !editInstructions.value;
}

const editTitle = ref(false);

const toggleEditTitle = () => {
  editTitle.value = !editTitle.value;
}

const manageActivity = ref(false);

const togglemanageActivity = () => {
  manageActivity.value = !manageActivity.value;
  editMode.value = !editMode.value;
}

const suggestMoodle = ref(false);

const toggleSuggestMoodle = () => {
  suggestMoodle.value = !suggestMoodle.value;
  editMode.value = !editMode.value;
}

// Initialize an array to track the visibility of each group
const showAlignments = ref(course.alignmentOptions.map(() => true));

const toggleShowAlignments = (index) => {
  showAlignments.value[index] = !showAlignments.value[index];
};



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
      return props.activity.selectedAlignments.some(alignment => alignment.value === item.value);
    },
    set: (newValue) => {
      if (!props.activity.selectedAlignments) {
        props.activity.selectedAlignments = [];
      }

      if (newValue) {
        if (!props.activity.selectedAlignments.some(alignment => alignment.value === item.value)) {
          props.activity.selectedAlignments.push(item);
        }
      } else {
        const index = props.activity.selectedAlignments.findIndex(alignment => alignment.value === item.value);
        if (index > -1) {
          props.activity.selectedAlignments.splice(index, 1);
        }
      }
    }
  });
};

function getRandomActivities(array, maxNumberOfItems) {
  // Step 1: Copy the array
  const newArray = array
  // Step 2: Shuffle the array
  const shuffledArray = newArray.sort(() => 0.5 - Math.random());

  // Step 3: Determine a random number of items to select, up to the maximum specified
  const numberOfItems = Math.floor(Math.random() * Math.min(maxNumberOfItems, newArray.length)) + 1;

  // Step 4: Slice the first `numberOfItems` elements
  return shuffledArray.slice(0, numberOfItems);
}

const suggestMoodleActivities = getRandomActivities(course.moodleActivities, 3);

function removeSuggestedActivities(array1, array2) {
  // Step 1: Create a Set from the second array
  const set2 = new Set(array2);

  // Step 2: Filter the first array to exclude elements that are present in the Set
  const filteredArray = array1.filter(item => !set2.has(item));

  return filteredArray;
}

const additionalActivities = ref(removeSuggestedActivities(course.moodleActivities, suggestMoodleActivities));

</script>
<template>
  <div id="activity-container" class="relative w-full h-[32rem] shadow-sm rounded-lg max-w-md mb-5">

    <div id="activity-summary" :class="{ 'scale-95 bg-slate-200 -translate-x-5': editMode }"
      class="bg-slate-100 overflow-y-auto px-4 pb-4 transition relative rounded-lg h-full flex flex-col gap-5 border border-slate-300">
      <div :class="{ '!bg-slate-300': editMode }"
        class="transition flex justify-center border-b border-slate-300 shadow-sm py-3 sticky top-0 bg-slate-200 -mx-4 z-20">

        <div class="flex justify-between items-center gap-2">
          <div v-if="editTitle" class="flex flex-col w-full">
            <label :for="'name' + props.weekIndex + '-' + activityIndex" class="sr-only block text-gray-700">Activity
              name:</label>
            <input :id="'name' + props.weekIndex + '-' + activityIndex" v-model="activity.name" type="text"
              class="border form-input mt-1 block p-1 w-full rounded"
              :placeholder="'Activity ' + (activityIndex + 1)" />
          </div>
          <h3 v-else class="text-md font-semibold"> {{ activity.name || 'Activity ' + (activityIndex + 1) }} </h3>
          <Button @click="toggleEditTitle"
            class="!p-1 h-max bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
            <span class="sr-only">Edit Activity title</span>
            <PencilIcon class="w-4 h-4 text-slate-700"></PencilIcon>
          </Button>
        </div>

        <Button @click="togglemanageActivity" rounded
          class="!p-0 !absolute right-2 top-2 bg-transparent border-0 ring-0 !ring-blue-300 hover:border-0 hover:bg-slate-100 hover:border-slate-200 w-8 h-8">
          <span class="sr-only">Manage Activity</span>
          <EllipsisHorizontalIcon class="text-slate-900" />
        </Button>
      </div>
      <h4 class="font-semibold border-b pb-1 border-slate-300">Instructions:</h4>
      <div class="flex justify-between gap-2" :id="'activity-' + activityIndex + '-instructions'">

        <div v-if="activity.instructions || editInstructions" class="flex justify-between items-start grow">
          <div class="flex gap-2 justify-between mb-2 w-full">
            <div v-if="editInstructions" class="w-full">
              <label :for="'description-' + props.weekIndex + '-' + activityIndex"
                class="sr-only block text-gray-700">Instructions:</label>
              <textarea v-model="activity.instructions" :id="'description-' + props.weekIndex + '-' + activityIndex"
                :name="'description-' + props.weekIndex + '-' + activityIndex" rows="4"
                class="form-textarea mt-1 w-full rounded p-1 border"></textarea>
            </div>
            <div v-else class="items-start flex gap-2 grow">
              <p class="w-full">{{ activity.instructions }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-sm bg-slate-200/80 text-slate-600 p-2 rounded text-center italic w-full">No Activity
          instructions added yet.</div>
        <div>
          <Button @click="toggleEditInstructions"
            class="!p-1 h-max bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
            <span class="sr-only">Edit instructions</span>
            <PencilIcon class="w-4 h-4 text-slate-700"></PencilIcon>
          </Button>
        </div>
      </div>

      <div class="flex">

        <div class="w-full flex flex-col gap-5">
          <div class="flex justify-between gap-4 items-center ">
            <label class="w-max font-semibold" :for="activityIndex + '-activity-duration'">Activity duration
              (mins):</label>
            <input type="number" class="border w-20 p-1 px-2 rounded" v-model="activity.duration"
              :id="activityIndex + '-activity-duration'" min="0" :step="1">
            </input>
          </div>
          <div class="flex justify-between gap-4 items-center">
            <label class="w-max font-semibold" :for="activityIndex + '-group-toggle'">Group Activity:</label>
            <InputSwitch v-model="activity.isGroup" :inputId="activityIndex + '-group-toggle'" />
          </div>
          <div class="flex justify-between gap-4 items-center">
            <div class="flex gap-1 items-center">
              <label :for="'activity-' + activityIndex + '-method-select'" class="w-max font-semibold">Mode:</label>
              <InfoButton help-title="Delivery mode">
                All about the Mode
              </InfoButton>
            </div>
            <SelectButton :id="'activity-' + activityIndex + '-method-select'" v-model="activity.mode"
              :options="['Sync', 'Async']" class="method-select-button" aria-labelledby="multiple"
              pt:root:class="flex rounded-lg overflow-hidden"
              pt:button:class="group cursor-pointer p-[.3rem] px-1 bg-slate-200"
              pt:label:class="group-aria-checked:bg-white group-aria-checked:font-semibold py-1 px-2 hover:bg-slate-100 rounded transition-all" />
          </div>
        </div>
      </div>

      <div class="">
        <div class="flex justify-between items-center mb-2 border-b pb-1 border-slate-300">
          <div class="flex gap-1 items-center">
            <h4 class="font-semibold">Learning Type<span
                v-if="activity.selectedTypes && activity.selectedTypes.length > 1">s</span>:</h4>
            <InfoButton help-title="Learning Types">
              All about Learning Types
            </InfoButton>
          </div>
          <Button @click="toggleEditTypes" title="Add or edit associated Learning Types"
            class="!p-0 bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
            <PlusIcon class="w-5 h-5 text-slate-700" />
          </Button>
        </div>
        <ul v-if="activity && activity.selectedTypes && activity.selectedTypes.length > 0"
          class="grid grid-cols-3 grid-flow-row gap-2 py-1">
          <li v-for="(type, index) in activity.selectedTypes"
            class="p-1 px-2 text-sm rounded bg-white border flex gap-2 items-center">
            <div :style="{ backgroundColor: course.getColorByLabel(type) }"
              class="w-4 h-4 min-w-4 min-h-4 bg-slate-600 rounded-full">
            </div>
            {{ type }}
          </li>
        </ul>
        <p class="p-2 text-center text-sm bg-slate-200/80 text-slate-600 italic rounded" v-else>There are no associated
          types for this Activity yet.</p>
      </div>
      <div class="">
        <div class="flex justify-between items-center mb-2 border-b pb-1 border-slate-300">
          <div class="flex items-center gap-1">
            <h4 class="font-semibold">Alignment<span
                v-if="activity && activity.alignments && activity.alignments.length > 1">s</span>:</h4>
            <InfoButton help-title="Alignments">
              All about Alignments
            </InfoButton>
          </div>
          <Button @click="toggleEditAlign" title="Add or edit associated Alignments"
            class="!p-0 bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
            <PlusIcon class="w-5 h-5 text-slate-700" />
          </Button>
        </div>
        <ul v-if="activity && activity.selectedAlignments && activity.selectedAlignments.length > 0"
          class="divide-slate-200 divide-y ml-1 flex flex-col">
          <li v-for="(alignment, index) in activity.selectedAlignments" class="py-2" :key="index">
            <div class="flex gap-3 items-center">
              <CheckCircleIcon class="text-teal-500 w-5 h-5 min-w-5" />
              <p v-if="alignment.nickname" class="">{{ alignment.nickname }}</p>
              <p v-else class="">{{ alignment.label }}</p>
            </div>
          </li>
        </ul>
        <p class="p-2 text-center text-sm bg-slate-200/80 text-slate-600 italic rounded" v-else>There are no associated
          alignments for this Activity yet.</p>
      </div>
      <div class="">
        <div class="flex justify-between items-center mb-2 border-b pb-1 border-slate-300">
          <div class="flex items-center gap-1">
            <h4 class="font-semibold">Moodle activities:</h4>
            <InfoButton help-title="Moodle activities">
              Select Moodle activities here. These will be created with a sensible set of defaults in your new Module
              which you can then modify to suit your teaching.
            </InfoButton>
          </div>
          <Button @click="toggleSuggestMoodle" title="Add or edit suggested Moodle activities"
            class="!p-0 bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
            <PlusIcon class="w-5 h-5 text-slate-700" />
          </Button>

        </div>
        <ul v-if="!activity.selectedMoodle.length == 0" class="grid grid-cols-3 gap-2">
          <li v-for="(moodleActivity, index) in activity.selectedMoodle" :key="index">
            <MoodleActivity :activity="activity" :moodle-activity="moodleActivity" />
          </li>
        </ul>
        <p v-else class="p-2 text-center text-sm bg-slate-200/80 text-slate-600 italic rounded">There are no chosen
          Moodle activities yet.</p>
      </div>

    </div>


    <Transition>
      <SettingsPanel v-if="editTypes" :title="'Edit Learning Types'" :class="{ 'z-10': editTypes }"
        @close-panel="toggleEditTypes" id="activity-type-select">
        <template v-slot:description>
          <p>Associate Learning Types here.</p>
        </template>
        <div class="gap-5 mt-4">
          <div>
            <Listbox v-model="activity.selectedTypes" :options="course.activityTypesColors" optionLabel="type"
              optionValue="type" multiple class="w-full" />
          </div>
        </div>
      </SettingsPanel>
    </Transition>

    <Transition>
      <SettingsPanel v-if="editAlign" :title="'Edit Alignments'" :class="{ 'z-10': editAlign }"
        @close-panel="toggleEditAlign" id="activity-alignment-select">
        <template v-slot:description>
          <p>Select which Objectives and/or Assessments this Activity aligns with.</p>
        </template>
        <div v-for="(option, index) in course.alignmentOptions" :key="index">
          <div class="flex justify-between items-center mt-3 mb-1">
            <label class="w-full" :for="'alignment-group-' + index">
              <h3 class="font-semibold">{{ option.group }}</h3>
            </label>

            <Button @click="toggleShowAlignments(index)" :id="'alignment-group-' + index"
              :pt:root:class="'!p-0 transition rounded bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2'">
              <ChevronDownIcon v-if="showAlignments[index]" class="h-5 w-5" />
              <ChevronRightIcon v-if="!showAlignments[index]" class="h-5 w-5" />
            </Button>
          </div>
          <Transition name="fade">
            <ul v-show="showAlignments[index]" class="flex flex-col divide-y divide-slate-300 ml-4">
              <li v-for="(item, index) in option.items" :key="index"
                class="-ml-5 flex gap-5 justify-between hover:bg-slate-100 px-2 py-3 hover:rounded transition">
                <span
                  class="min-w-6 max-h-6 text-sm font-medium flex items-center justify-center bg-cyan-700 text-white rounded-full">{{
                    (index++ + 1) }}</span>
                <label class="w-full mr-2" :for="'activity-' + activityIndex + item.value + '-switch-' + index">
                  <span v-if="item.nickname">{{ item.nickname }}</span>
                  <span v-else>{{ item.label }}</span>
                </label>
                <div class="w-max">
                  <InputSwitch v-model="isAligned(item).value"
                    :inputId="'activity-' + activityIndex + item.value + '-switch-' + index" />
                </div>
              </li>
            </ul>
          </Transition>
        </div>
      </SettingsPanel>
    </Transition>

    <Transition>
      <SettingsPanel v-if="suggestMoodle" :title="'Moodle Activities'" :class="{ 'z-10': editTypes }"
        @close-panel="toggleSuggestMoodle" id="activity-type-select">

        <template v-slot:description>
          <h4 class="font-semibold mb-3">Suggestions:</h4>
          <p class="mb-3">Based on your choice of Learning Type this activity would be suitable for use with the
            following Moodle
            activity types:</p>
          <ul class="grid grid-cols-3 grid-flow-row gap-2">
            <li v-for="(moodleActivity, index) in suggestMoodleActivities" :key="index">
              <MoodleActivity :activity="activity" :moodleActivity="moodleActivity" />
            </li>
          </ul>
          <hr class="mt-4 -mb-5" />
        </template>
        <h4 class="font-semibold mb-3">Additional Moodle activities:</h4>
        <p class="mb-3">If you would like to add other types of Moodle activity choose from the list below:</p>

        <div class="gap-5 mt-4">
          <ul class="grid grid-cols-3 grid-flow-row gap-2">
            <li v-for="(moodleActivity, index) in additionalActivities" :key="index">
              <MoodleActivity :activity="activity" :moodleActivity="moodleActivity" />
            </li>
          </ul>
        </div>
      </SettingsPanel>
    </Transition>

    <Transition>
      <SettingsPanel v-if="manageActivity" :title="'Manage ' + (activity.name)" :class="{ 'z-10': editAlign }"
        @close-panel="togglemanageActivity" :id="'manage-activity-' + (activityIndex + 1)">
        <template v-slot:description>
          <p>Once you have deleted this Activity it cannot be recovered.</p>
        </template>
        <Button @click="() => { $emit('removeActivity'); togglemanageActivity() }" class="w-full flex gap-2"
          severity="danger">
          <TrashIcon class="w-5 h-5" />Delete Activity
        </Button>
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


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


::deep .custom-select-button .p-button {
  @apply bg-gray-300 text-black;
  /* Default background color and text color */
}

::deep .custom-select-button .p-button.p-highlight {
  @apply text-white;
  /* Text color for selected option */
}

::deep .custom-select-button .p-button.Sync {
  @apply bg-blue-500;
  /* Background color for Sync option */
}

::deep .custom-select-button .p-button.Async {
  @apply bg-green-500;
  /* Background color for Async option */
}

::deep .custom-select-button .p-button.Sync.p-highlight {
  @apply bg-blue-700;
  /* Highlighted background color for Sync option */
}

::deep .custom-select-button .p-button.Async.p-highlight {
  @apply bg-green-700;
  /* Highlighted background color for Async option */
}
</style>