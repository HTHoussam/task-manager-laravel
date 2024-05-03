<template>
    <div class="gap-2 flex-col justify-start">
        <p class="font-medium capitalize">Status:</p>
        <select
            class="rounded-lg border border-blue-500"
            v-model="props.modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
        >
            <option value="">All</option>
            <option value="0">Pending</option>
            <option value="1">In Progress</option>
            <option value="2">Completed</option>
            <option value="3">Overdue</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps(["modelValue"]);
const { emit } = defineEmits(["update:modelValue"]);
</script>
