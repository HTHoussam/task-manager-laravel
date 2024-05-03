<template>
    <div class="gap-2 flex-col justify-start">
        <p class="font-medium capitalize">{{ label }}:</p>
        <input
            class="rounded-lg border border-blue-500"
            v-model="props.modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            type="text"
            :placeholder="placeholder"
        />
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps(["modelValue"]);
const { emit } = defineEmits(["update:modelValue"]);

const label = "Search";
const placeholder = "Search by name";
</script>
