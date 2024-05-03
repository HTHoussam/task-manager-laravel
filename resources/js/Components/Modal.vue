<template>
    <Teleport to="body">
        <Transition leave-active-class="duration-200">
            <div
                v-show="show"
                class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50"
                scroll-region
            >
                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-show="show"
                        class="fixed inset-0 transform transition-all"
                        @click="close"
                    >
                        <div class="absolute inset-0 bg-gray-500 opacity-75" />
                    </div>
                </Transition>

                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-show="show"
                        class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform translate-y-40 transition-all sm:w-full sm:mx-auto"
                        :class="maxWidthClass"
                    >
                        <div class="bg-white p-6 rounded-lg shadow-xl max-w-xl">
                            <h2 class="text-lg font-semibold mb-4">
                                {{
                                    mode === "edit"
                                        ? "Edit Task"
                                        : "Create Task"
                                }}
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
                            <div class="mb-4">
                                <label
                                    class="block text-gray-700 text-sm font-bold mb-2"
                                    for="status"
                                >
                                    Status
                                </label>
                                <select
                                    v-model="formData.status"
                                    id="status"
                                    name="status"
                                    class="form-select w-full"
                                >
                                    <option
                                        v-for="option in taskStatuses"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>

                            <!-- Buttons -->
                            <div class="flex justify-end gap-4">
                                <button
                                    @click="close"
                                    class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Close
                                </button>
                                <button
                                    @click="saveModal(formData)"
                                    class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { StatusObject } from "@/constants";
import { Task } from "@/types";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = withDefaults(
    defineProps<{
        taskToEdit?: Task;
        show?: boolean;
        maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
        closeable?: boolean;
        mode?: String;
    }>(),
    {
        show: false,
        maxWidth: "2xl",
        closeable: true,
        taskToEdit: {
            id: -1,
            name: "",
            user_id: 1,
            description: "",
            due_date: "",
            status: 0,
        },
    }
);
const formData = ref<Task>({
    id: -1,
    name: "",
    user_id: 1,
    description: "",
    due_date: "",
    status: 0,
});

const emit = defineEmits(["close", "save-modal"]);
watch(
    () => props.taskToEdit,
    (newValue) => {
        // Update formData when taskToEdit changes
        if (newValue) {
            formData.value = { ...newValue };
        } else {
            // Reset formData if taskToEdit is null
            formData.value = {
                id: -1,
                name: "",
                user_id: 1,
                description: "",
                due_date: "",
                status: 0,
            };
        }
    },
    { immediate: true } // Trigger the watcher immediately on component mount
);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }
);
const taskStatuses = computed(() =>
    Object.entries(StatusObject).map(([value, label]) => ({
        value: parseInt(value),
        label,
    }))
);
const close = () => {
    emit("close");
};
const saveModal = (newTask: Task) => {
    emit("save-modal", newTask);
};
const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener("keydown", closeOnEscape));

onUnmounted(() => {
    document.removeEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "visible";
});

const maxWidthClass = computed(() => {
    return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[props.maxWidth];
});
</script>
