<template>
    <div
        :style="{ backgroundColor: getStatusColor(task.status ?? 0) }"
        class="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 flex-1"
    >
        <div class="flex flex-row flex-wrap justify-between items-baseline">
            <h4 class="text-lg font-semibold mb-2 capitalize">
                {{ task.name }}
            </h4>
            <button
                class="-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
                @click="toggleEdit(task.id ?? null)"
            >
                Edit
            </button>
        </div>
        <p class="text-sm text-gray-600">{{ task.description }}</p>
        <div class="flex flex-row flex-wrap justify-between mt-auto">
            <p class="text-sm text-gray-600 font-bold">
                {{ task.due_date }}
            </p>
            <p class="text-sm text-gray-600 font-extrabold uppercase">
                {{ StatusObject[Number(task.status)] }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { StatusObject } from "@/constants";
import { Task } from "@/types";
import { getStatusColor } from "@/utils/helpers";
defineProps<{
    task: Task;
}>();

const emits = defineEmits(["toggle-edit"]);
const toggleEdit = (taskId: number | null) => {
    emits("toggle-edit", taskId);
};
</script>
