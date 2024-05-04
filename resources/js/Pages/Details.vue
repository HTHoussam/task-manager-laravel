<template>
    <Head title="Task Details" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Task Details
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    :style="{
                        backgroundColor: getStatusColor(task.status ?? 0),
                    }"
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
    </AuthenticatedLayout>
</template>

<script setup lang="ts">
import { StatusObject } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { getStatusColor } from "@/utils/helpers";

defineProps({
    task: {
        type: Object,
        default: {},
    },
});
</script>
