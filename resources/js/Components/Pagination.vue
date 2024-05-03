<template>
    <nav
        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
    >
        <button
            @click="onPrevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
            <span class="text-black">Previous</span>

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

        <button
            @click="onNextPage"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
            <span class="text-black">Next</span>
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
    </nav>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

// Props
const { currentPage, totalPages } = defineProps(["currentPage", "totalPages"]);

const emit = defineEmits(["page-change"]);

const onPageChange = (page: number) => {
    if (page !== currentPage) {
        emit("page-change", page);
    }
};

const onPrevPage = () => {
    if (currentPage > 1) {
        onPageChange(currentPage - 1);
    }
};

const onNextPage = () => {
    console.log("INSDEI NEXt PAGE", currentPage, totalPages);
    if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
    }
};
</script>
