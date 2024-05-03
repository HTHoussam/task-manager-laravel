<template>
    <!-- Modal backdrop -->
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        v-show="props.open || showModal"
        @click="handleBackdropClick"
    >
        <!-- Modal content -->
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 class="text-lg font-semibold mb-4">
                {{ mode === "edit" ? "Edit Task" : "Create Task" }}
            </h2>
            <!-- Form fields -->
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                    >Name</label
                >
                <input
                    v-model="formData.name"
                    type="text"
                    id="name"
                    name="name"
                    class="form-input w-full"
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="description"
                    >Description</label
                >
                <textarea
                    v-model="formData.description"
                    id="description"
                    name="description"
                    rows="3"
                    class="form-textarea w-full"
                ></textarea>
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="due_date"
                    >Due Date</label
                >
                <input
                    v-model="formData.due_date"
                    type="date"
                    id="due_date"
                    name="due_date"
                    class="form-input w-full"
                />
            </div>
            <!-- Buttons -->
            <div class="flex justify-end">
                <button
                    @click="handleCancel"
                    class="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md"
                >
                    Cancel
                </button>
                <button
                    @click="handleSubmit"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";

const props = defineProps({
    initialTask: {
        type: Object,
        default: null,
    },
    mode: {
        type: String,
        default: "create",
    },
    open: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(["close-modal", "submit"]);

const showModal = ref(false);
const formData = ref(
    props.initialTask
        ? { ...props.initialTask }
        : {
              name: "",
              description: "",
              due_date: "",
          }
);

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    emits("close-modal");
};

const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

const handleCancel = () => {
    closeModal();
};

const handleSubmit = () => {
    emits("submit", formData.value);
    closeModal();
};
</script>
