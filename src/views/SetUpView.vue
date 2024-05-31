<script setup>
import PageHeader from '@/components/PageHeader.vue'
import Page from '@/components/Page.vue';
import Panel from '@/components/ui/Panel.vue';
import { useCourseStore } from '@/stores/course.js'
import Calendar from 'primevue/calendar';

const course = useCourseStore()
</script>

<template>
    <div>
    <PageHeader :title="'Set Up Module'" />
    <Page class="max-w-4xl mx-auto flex flex-col gap-5">
        <Panel class="flex flex-col gap-5" :title="'Module Information'">
            <div class="flex">
                Course Title:
                {{ course.title }}
            </div>

            <div class="flex items-center gap-2">
                Start Date:
                <Calendar v-model="course.startDate" />
            </div>
        </Panel>
        <Panel :title="'Learning Outcomes'">
            <ul class="list-decimal list-inside ml-4">
                <li v-for="(outcome, index) in course.learningOutcomes">
                    {{ outcome.label }}
                </li>
            </ul>
        </Panel>
        <Panel :title="'Assessments'">
            <ul class="list-decimal list-inside ml-4">
                <li v-for="(assessment, index) in course.assessments">
                    {{ assessment.label }}
                    <input
          :id="'assessment- ' + index + '-nickname-input'"
          v-model="assessment.nickname"
          type="text"
          class="text-lg mb-0 rounded p-1 border border-slate-300 bg-slate-50 text-slate-800 w-full"
          @keyup.enter="submitTitle"
        />
                </li>
            </ul>
        </Panel>
    </Page>
</div>
</template>