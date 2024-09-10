<script setup>

import Fieldset from 'primevue/fieldset';
import ActivityLabel from '../ActivityLabel.vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});


</script>

<template>
    <Fieldset legend="Basic Information">
        <ActivityLabel label="Title" targetId="activity-name" help="Enter a descriptive title for this Activity.">
            <InputText id="activity-name" v-model="activity.title" />
        </ActivityLabel>
        <ActivityLabel label="Instructions" targetId="activity-instructions"
            help="Describe the steps involved in this Activity to your students.">
            <Textarea autoResize rows="5" id="activity-instructions" v-model="activity.instructions" />
        </ActivityLabel>
    </Fieldset>
</template>