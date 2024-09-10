<script setup>
import { useCourseStore } from '@/stores/course.js'
import SelectButton from 'primevue/selectbutton';
import ToggleSwitch from 'primevue/toggleswitch';
import MultiSelect from 'primevue/multiselect';
import Fieldset from 'primevue/fieldset';
import ActivityLabel from '../ActivityLabel.vue';
import InputText from 'primevue/inputtext';

const course = useCourseStore();

const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});
</script>

<template>
    <Fieldset legend="Learning Approach">
        <div class="flex flex-col gap-2">
            <ActivityLabel horizontal label="Duration (mins)" targetId="activity-duration"
                help="How long this Activity will take to complete.">
                <InputText type="number" :min="0" buttonLayout="horizontal" :step="1" id="activity-duration"
                    v-model="activity.duration" class="w-20" />
            </ActivityLabel>
            <ActivityLabel horizontal label="Group" targetId="activity-group-toggle" help="Is this a group Activity?">
                <ToggleSwitch v-model="activity.isGroup" inputId="activity-group-toggle" />
            </ActivityLabel>
            <ActivityLabel horizontal label="Learning Mode" id="activity-mode-select"
                help="Indicate the learning mode of this Activity.">
                <SelectButton id="activity-mode-select" :options="['Sync', 'Async']"
                    aria-labelledby="activity-mode-select" v-model="activity.mode" />
            </ActivityLabel>
            <ActivityLabel label="Learning Type" targetId="select-learning-type"
                help="Select one or more Learning Types for this Activity.">
                <MultiSelect v-model="activity.selectedTypes" :options="course.activityTypesColors" optionLabel="type"
                    optionValue="type" placeholder="Select Learning Types" :maxSelectedLabels="3"
                    inputId="select-learning-type" />
            </ActivityLabel>
        </div>
    </Fieldset>

</template>