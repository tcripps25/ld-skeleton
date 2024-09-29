<script setup>
import { onBeforeMount, ref } from 'vue';

const props = defineProps({
    getString: String,
    altString: String,
})

// Define reactive variables to store the language strings
const fetchedString = ref('');

// Use Moodle's RequireJS to load core/str
onBeforeMount(() => {
    require(['core/str'], function (str) {
        str.get_string(props.getString, 'local_moddesigner').done(function (result) {
            fetchedString.value = result;
        });
    });
});
</script>
<template>
    <span v-if="fetchedString">{{ fetchedString }}</span>
    <span v-else>{{ altString }}</span>
</template>