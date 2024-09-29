<script setup>
import { ref, onBeforeMount } from "vue";
import Logo from "@/assets/uop_notext.png";
import InputText from "primevue/inputtext";
import MainMenu from "./menu/MainMenu.vue";
import { useCourseStore } from "@/stores/course.js";
import { useDesignMenuStore } from "@/stores/designMenu.js";
import ExportCourseButton from "@/components/buttons/ExportCourseButton.vue";
import ImportCourseButton from "@/components/buttons/ImportCourseButton.vue";
import ResetCourseButton from "@/components/buttons/ResetCourseButton.vue";


const course = useCourseStore();
const designMenu = useDesignMenuStore();

console.log(course.title);

const showField = ref(false)

const toggleShowField = () => {
    showField.value = !showField.value
}



// Define reactive variables to store the language strings
const appName = ref('');

// Use Moodle's RequireJS to load core/str
onBeforeMount(() => {
    require(['core/str'], function (str) {
        str.get_string('appname', 'local_moddesigner').done(function (result) {
            appName.value = result;
        });
    });
});
</script>

<template>
    <div id="sidebar"
        class="px-5 py-5 flex flex-col gap-3 bg-slate-50 border-r h-screen overflow-x-auto max-w-72 min-w-72 text-sm">
        <header class="text-slate-800 flex flex-col">
            <div class="flex justify-start gap-5 items-center mb-3">
                <img @click="toggleShowField" :src="Logo" class="h-11" alt="University of Portsmouth Logo" />
                <a href="#" class="flex flex-col">
                    <h1 class="text-lg font-semibold">{{ appName || 'Module Designer Dev' }}</h1>
                    <p class="text-sm px-1 font-medium bg-sky-600 text-sky-50 rounded w-max">Plugin UI3</p>
                </a>
            </div>

            <div class="flex gap-3 py-1 my-2 rounded justify-around">
                <ImportCourseButton />
                <ResetCourseButton />
                <ExportCourseButton />
            </div>
        </header>
        <MainMenu />

        <InputText v-if="showField" v-model="course.key" />
    </div>
</template>