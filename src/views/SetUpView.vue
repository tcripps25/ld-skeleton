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
      <Transition>
      <div v-if="course?.title" class="font-semibold flex items-center gap-3 justify-start">
        Module Title:
        <p class="font-normal" @click="toggleTitleEdit">{{ course.title }}</p>
        <button name="Edit module title" id="course-title-edit" title="Edit Module Title" @click="toggleTitleEdit">
          <PencilIcon
            :class="{'bg-sky-400 text-slate-700 hover:!bg-sky-300': editTitle}"
            class="w-7 h-7 p-1 text-slate-700 hover:bg-slate-300 rounded-lg transition"
          />
        </button>
      </div>
    </Transition>
    <Transition class="bg-slate-200 p-2 rounded border border-slate-300 shadow">
      <div class="block overflow-hidden" v-if="!course?.title || editTitle">
        <label class="text-slate-800 mb-1 block" for="course-title-input">Edit course title: </label>
        <input
          id="course-title-input"
          v-model="courseTitle"
          type="text"
          class="text-lg mb-0 rounded p-1 border-slate-300 bg-slate-50 text-slate-800 w-full"
          @keyup.enter="submitTitle"
        />
      </div>
    </Transition>
    
    </div>
    <div class="flex items-center gap-2">
        <label class="mb-1 font-semibold w-max" for="course-code-input">Module Code: </label>
        <input
          id="course-code-input"
          v-model="courseCode"
          type="text"
          class="text-lg mb-0 rounded p-1 border-slate-300 bg-white border"
        />
    </div>
            <div class="flex items-center gap-2 font-semibold">
                Start Date:
                <Calendar v-model="course.startDate" />
            </div>
        </Panel>
        <Panel :title="'Learning Outcomes'">
            <p class="my-5 p-3 bg-slate-100 border rounded">
                Learning Outcomes have been populated automatically and are unable to be modified from the Designer.
            </p>
            <ul class="list-decimal list-inside ml-4">
                <li v-for="(outcome, index) in course.learningOutcomes" class="p-3">
                    {{ outcome.label }}
                </li>
            </ul>
        </Panel>
        <Panel :title="'Assessments'">
            <p class="my-5 p-3 bg-slate-100 border rounded">Assessments shown below have been populated automatically. You might prefer to refer to these throughout the Designer with a more memorable name than the automatically populated one, if so add a nickname in the field below.</p>
            <ul class="list-decimal list-inside">
                <li v-for="(assessment, index) in course.assessments" class="p-2 mt-2 flex flex-col">
                    <span class="font-semibold">{{ assessment.label }}</span>
                    <div class="ml-4 mt-3">
                        <label :for="'assessment- ' + index + '-nickname-input'" class="text-sm">Nickname for {{ assessment.label }}: </label>
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