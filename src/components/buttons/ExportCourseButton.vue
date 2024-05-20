<script setup>
import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js';
import { slugify } from '@/utils/utils';

const course = useCourseStore()
const props = defineProps({
  name: String
});

const exportJSON = () => {
  const data = {
    title: course.title,
    weeks: course.weeks.map(week => ({
      title: week.title,
      activities: week.activities.map(activity => ({
        title: activity.title,
        activityType: activity.activityType,
        description: activity.description,
        notes: activity.notes,
        minutes: activity.minutes,
        students: activity.students
      }))
    }))
  };
  
  const jsonData = JSON.stringify(data, null, 2);
  const filename = slugify(course.title);

  const blob = new Blob([jsonData], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
};


</script>

<template>
    <button :title="name" @click="exportJSON" class="border-slate-600 bg-slate-800 border-2 text-slate-100 hover:bg-slate-900 hover:border-teal-500 px-4 py-2 rounded-md h-max flex items-center gap-1 transition"><span class="sr-only">{{ name }} </span><ArrowUpOnSquareIcon class="w-5 h-5"/></button>
</template>