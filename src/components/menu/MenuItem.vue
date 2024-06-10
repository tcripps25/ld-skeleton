<script setup>
const props = defineProps({
  item: Object,
  parentIndex: Number,
});
</script>

<template>
  <li v-if="!item.items">
    <a href="#" class="block py-1 px-3 text-slate-600 rounded bg-transparent">{{ item.label }}</a>
  </li>
  <li v-else>
    <button :id="'dropdownNavbarLink-' + parentIndex" :data-dropdown-toggle="'dropdownNavbar-' + parentIndex"
      class="flex items-center justify-between w-full p-1 px-3 text-slate-600 hover:bg-slate-200 hover:text-slate-600 rounded">{{
        item.label }}
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
    </button>
    <!-- Dropdown menu -->
    <div :id="'dropdownNavbar-' + parentIndex"
      class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton">
        <li v-if="!item.items">
          <a href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
        </li>
        <li v-for="(subItem, subIndex) in item.items" aria-labelledby="dropdownNavbarLink">
          <button :id="'doubleDropdownButton-' + subIndex + '-' + parentIndex"
            :data-dropdown-toggle="'doubleDropdown-' + subIndex + '-' + parentIndex"
            data-dropdown-placement="right-start" type="button"
            class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{
              subItem.label }}<svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 4 4 4-4" />
            </svg></button>
          <div :id="'doubleDropdown-' + subIndex + '-' + parentIndex"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
              <li v-for="(items, index) in item.items">
                <a href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Overview</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </li>
</template>