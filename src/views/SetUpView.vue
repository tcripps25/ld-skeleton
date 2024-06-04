<script setup>
import { ref } from 'vue';
import PageHeader from '@/components/PageHeader.vue'
import Page from '@/components/Page.vue';
import Panel from '@/components/ui/Panel.vue';
import { useCourseStore } from '@/stores/course.js'
import Calendar from 'primevue/calendar';
import { PencilIcon } from '@heroicons/vue/16/solid';

const course = useCourseStore()

const editTitle = ref(false);
const courseTitle = ref('');
const courseCode = ref('M20529');
const toggleTitleEdit = () => {
  editTitle.value = !editTitle.value;
};

const submitTitle = () => {
  if (courseTitle.value.trim() !== '') {
    course.title = courseTitle.value.trim();
    editTitle.value = false;
  }
};
</script>

<template>
    <div>
    <PageHeader :title="'Set Up'" />
    <Page class="max-w-4xl mx-auto flex flex-col gap-5">
        <Panel class="flex flex-col gap-5" :title="'Module Information'">
            <div class="flex flex-col gap-1">
              
      
      <div v-if="!editTitle" class="font-semibold flex items-center gap-3 justify-start">
        Module Title:
        <p class="font-normal" @click="toggleTitleEdit">{{ course.title }}</p>
        <button name="Edit module title" id="course-title-edit" title="Edit Module Title" @click="toggleTitleEdit">
          <PencilIcon
            :class="{'bg-sky-400 text-slate-700 hover:!bg-sky-300': editTitle}"
            class="w-7 h-7 p-1 text-slate-700 hover:bg-slate-300 rounded-lg transition"
          />
        </button>
      </div>
      <div v-else class="flex gap-2 items-center">
        <label class="text-slate-800 mb-1 font-semibold whitespace-nowrap" for="module-title-input">Module title: </label>
        <input
          id="module-title-input"
          v-model="courseTitle"
          type="text"
          class="text-lg mb-0 rounded p-1 border-slate-300 bg-white border text-slate-800l"
          @keyup.enter="submitTitle"
        />
      </div>
   
    </div>
  
    <div class="flex items-center gap-2">
        <label for="module-code-input" class="mb-1 font-semibold w-max" >Module Code: </label>
        <input
          id="module-code-input"
          v-model="courseCode"
          type="text"
          class="text-lg mb-0 rounded p-1 border-slate-300 bg-white border"
        />
        </div>
            <div class="flex items-center gap-2 font-semibold">
                <label for="module-start-date-input">Start Date:</label>
                <Calendar v-model="course.startDate" pt:root:class="font-normal focus:ring-blue-600" itemid="module-start-date-input" />
            </div>
        </Panel>
        <Panel :title="'Learning Outcomes'">
            <p class="my-5 p-3 bg-slate-100 border rounded">
                Learning Outcomes have been populated automatically and are unable to be modified from Module Designer.
            </p>
            <ul class="list-decimal list-inside ml-4">
                <li v-for="(outcome, index) in course.learningOutcomes" class="p-3">
                    {{ outcome.label }}
                </li>
            </ul>
        </Panel>
        <Panel :title="'Assessments'">
            <p class="my-5 p-3 bg-slate-100 border rounded">Assessments shown below have been populated automatically. You might prefer to refer to these throughout the Designer with a more memorable name than the automatically populated one, if so add an alternative title in the field below.</p>
            <ul class="list-decimal list-inside">
                <li v-for="(assessment, index) in course.assessments" class="p-2 mt-2 flex flex-col">
                    <span class="font-semibold">{{ assessment.label }}</span>
                    <div class="ml-4 mt-3">
                        <label :for="'assessment- ' + index + '-nickname-input'" class="text-sm">Alternative title for {{ assessment.label }}: </label>
                        <input
                            :id="'assessment- ' + index + '-nickname-input'"
                            v-model="assessment.nickname"
                            type="text"
                            class="text-lg mt-1 w-full block mb-0 rounded p-1 border border-slate-300 bg-slate-50 text-slate-800"
                            />
                    </div>
                </li>
            </ul>
        </Panel>
    </Page>
</div>
</template>