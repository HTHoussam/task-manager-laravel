<template>
    <nav
        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
    >
        <!-- Previous Page Button -->
        <button
            @click="onPrevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
            <span class="sr-only">Previous</span>
            <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M10.707 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 010-2h10.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>

        <!-- Pagination Numbers -->
        <template>
            <button
                v-for="page in totalPages"
                :key="page"
                @click="onPageChange(page)"
                :class="{ 'bg-blue-600 text-white': currentPage === page }"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                {{ page }}
            </button>
        </template>

        <!-- Next Page Button -->
        <button
            @click="onNextPage"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
            <span class="sr-only">Next</span>
            <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M9.293 16.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10H16a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    </nav>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

// Props
const { currentPage, totalPages } = defineProps(["currentPage", "totalPages"]);
// defineEmits(["page-change"]);
const emit = defineEmits(["page-change"]);
// Emit events for page change
const onPageChange = (page: number) => {
    if (page !== currentPage) {
        emit("page-change", page);
    }
};

// Previous Page Button Click Handler
const onPrevPage = () => {
    if (currentPage > 1) {
        onPageChange(currentPage - 1);
    }
};

// Next Page Button Click Handler
const onNextPage = () => {
    if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
    }
};

// Computed properties
const hasPrevPage = computed(() => currentPage > 1);
const hasNextPage = computed(() => currentPage < totalPages);
</script>
