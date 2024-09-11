<script setup>
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button from 'primevue/button';
import SingleActivity from './SingleActivity.vue';
import ActivityBasicInformation from './forms/activity/ActivityBasicInformation.vue';
import ActivityLearningApproach from './forms/activity/ActivityLearningApproach.vue';
import ActivityAlignments from './forms/activity/ActivityAlignments.vue';
import Pbutton from './buttons/Pbutton.vue';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/16/solid';
import ActivityMoodle from './forms/activity/ActivityMoodle.vue';

const props = defineProps({
    weekIndex: Number,
    activity: Object,
    index: Number,
});
</script>

<template>
    <Stepper value="1">
        <StepList>
            <Step value="1">Basic Information</Step>
            <Step value="2">Learning Approach</Step>
            <Step value="3">Moodle Activities</Step>
            <Step value="4">Alignments</Step>
        </StepList>
        <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1">
                <ActivityBasicInformation :activity="activity" :activity-index="index" :week-index="weekIndex" />

                <div class="flex pt-6 justify-end">
                    <Pbutton solid trailing label="Next" @click="activateCallback('2')">
                        <template #icon>
                            <ArrowRightIcon class="h-5 w-5" />
                        </template>
                    </Pbutton>
                </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="2">
                <ActivityLearningApproach :activity="activity" :activity-index="index" :week-index="weekIndex" />
                <div class="flex pt-6 justify-between">
                    <Pbutton ghost label="Back" @click="activateCallback('1')">
                        <template #icon>
                            <ArrowLeftIcon class="h-5 w-5" />
                        </template>
                    </Pbutton>
                    <Pbutton solid trailing label="Next" @click="activateCallback('3')">
                        <template #icon>
                            <ArrowRightIcon class="h-5 w-5" />
                        </template>
                    </Pbutton>
                </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="3">
                <ActivityMoodle :activity="activity" :activity-index="index" :week-index="weekIndex"/>
                <div class="flex pt-6 justify-between">
                    <Pbutton ghost label="Back" @click="activateCallback('2')">
                        <template #icon>
                            <ArrowLeftIcon class="h-5 w-5" />
                        </template>
                    </Pbutton>
                    <Pbutton solid trailing label="Next" @click="activateCallback('4')">
                        <template #icon>
                            <ArrowRightIcon class="h-5 w-5" />
                        </template>
                    </Pbutton>
                </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="4">
                <ActivityAlignments :activity="activity" :activity-index="index" :week-index="weekIndex" />
                <div class="flex pt-6 justify-between">

                    <Pbutton ghost label="Back" @click="activateCallback('3')">
                        <template #icon>
                            <ArrowLeftIcon class="h-5 w-5" />
                        </template>
                    </Pbutton>
                    <Pbutton solid label="Save Activity" />
                </div>
            </StepPanel>
        </StepPanels>
    </Stepper>

</template>