<template>
    <div class="gap-2 flex-col justify-start">
        <p class="font-medium capitalize">From:</p>
        <input
            class="rounded-lg border border-blue-500"
            v-model="startValue"
            type="date"
            @input="$emit('update:start', $event.target.value)"
            placeholder="Start Date"
        />
    </div>
    <div class="gap-2 flex-col justify-start">
        <p class="font-medium capitalize">To:</p>
        <input
            class="rounded-lg border border-blue-500"
            v-model="endValue"
            @input="$emit('update:end', $event.target.value)"
            type="date"
            placeholder="End Date"
        />
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps(["start", "end"]);
const { emit } = defineEmits(["update:start", "update:end"]);

const startValue = props.start;
const endValue = props.end;
</script>
