<template>
    <Head title="Task Details" />

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div
                :style="{ backgroundColor: getStatusColor(task.status ?? 0) }"
                class="overflow-hidden shadow-sm sm:rounded-lg"
            >
                <div class="p-6">
                    <div class="flex flex-col gap-4">
                        <div
                            class="flex flex-row justify-between items-baseline"
                        >
                            <h3 class="text-lg font-semibold mb-4">
                                {{ task?.name }}
                            </h3>
                            <button
                                class="text-sm text-blue-700 font-semibold hover:text-white hover:bg-blue-500 py-1 px-2 border border-blue-500 rounded-lg"
                            >
                                Edit
                            </button>
                        </div>
                        <p class="text-sm text-gray-600">
                            {{ task?.name }}
                        </p>
                        <div class="flex flex-row justify-between mt-auto">
                            <p class="text-sm text-gray-600 font-bold">
                                {{ task?.name }}
                            </p>
                            <p
                                class="text-sm text-gray-600 font-extrabold uppercase"
                            >
                                {{ StatusObject[Number(task?.status)] }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { StatusObject } from "@/constants";
import { getStatusColor } from "@/utils/helpers";

defineProps({
    task: {
        type: Object,
        default: {},
    },
});
</script>
