<template>
    <Head title="Task Management" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Task Management
            </h2>
        </template>

        <div class="py-12 b-[#e5e7eb]">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="flex flex-row justify-between mb-8">
                            <h3 class="text-lg font-semibold mb-4">
                                Task List
                            </h3>
                            <button
                                class="-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
                                @click="toggleEdit(null)"
                            >
                                create
                            </button>
                        </div>
                        <div class="flex flex-row p-2 justify-center m-4 gap-4">
                            <SearchFilter
                                v-model="searchTerm"
                                label="Search"
                                placeholder="Search by name"
                            />
                            <FilterDate
                                v-model:start="startDate"
                                v-model:end="endDate"
                            />
                            <StatusFilter v-model="statusFilter" />
                        </div>

                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
                        >
                            <div
                                v-for="task in filteredTasks"
                                :key="task.id"
                                class="flex flex-col gap-4"
                            >
                                <TaskCard
                                    :task="task"
                                    @toggle-edit="toggleEdit"
                                />
                            </div>
                            <Modal
                                :taskToEdit="taskToEdit"
                                :show="showModal"
                                :maxWidth="'2xl'"
                                :mode="taskToEdit ? 'edit' : 'create'"
                                @close="closeModal"
                                @save-modal="saveModal"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup lang="ts">
import Modal from "@/Components/Modal.vue";
import FilterDate from "@/Components/tasks/FilterDate.vue";
import SearchFilter from "@/Components/tasks/SearchFilter.vue";
import StatusFilter from "@/Components/tasks/StatusFilter.vue";
import TaskCard from "@/Components/tasks/TaskCard.vue";
import { useFetchTasks } from "@/Composables/useFetchTasks";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Task } from "@/types";
import { TaskSchema } from "@/utils/Validation";
import { Head } from "@inertiajs/vue3";
import axios from "axios";
import dayjs from "dayjs";
import { computed, onMounted, ref } from "vue";
import { toast } from "vue-sonner";

const taskToEdit = ref<Task | null>(null);
const taskId = ref<null | number>(null);
const searchTerm = ref("");
const startDate = ref(null);
const endDate = ref(null);
const statusFilter = ref("");

const { tasks, fetchTasks } = useFetchTasks();

onMounted(() => {
    fetchTasks();
});
const showModal = ref<boolean>(false);
const toggleEdit = (id: number | null) => {
    showModal.value = true;
    taskId.value = id;
    const isExist = tasks.value.find((r) => r.id === id);

    if (isExist && isExist.id) {
        taskToEdit.value = isExist;
    } else {
        taskToEdit.value = {
            description: "",
            due_date: "",
            status: 0,
            name: "",
            user_id: 1,
        };
    }
};

const saveModal = async (newTask: Task) => {
    try {
        await TaskSchema.validate(newTask, { abortEarly: false }).then(
            async (res) => {
                if (taskId.value !== null) {
                    const { data } = await axios.put(
                        `/api/tasks/${taskId.value}`,
                        {
                            user_id: newTask.user_id,
                            name: newTask.name,
                            description: newTask.description,
                            status: newTask.status,
                            due_date: dayjs(newTask.due_date).format(
                                "YYYY-MM-DD HH:mm:ss"
                            ),
                        }
                    );
                    if (data.data.id) {
                        toast.success("Task updated successfully");
                    }
                    const oldTaskIdx = tasks.value.findIndex(
                        (r) => r.id === taskId.value
                    );
                    if (oldTaskIdx < 0) {
                        return;
                    }
                    tasks.value[oldTaskIdx] = {
                        ...data.data,
                        due_date: dayjs(data.data.due_date).format(
                            "MMM D, YYYY"
                        ),
                    };
                } else {
                    await axios.post("/api/tasks", {
                        ...res,
                        due_date: dayjs(res.due_date).format(
                            "YYYY-MM-DD HH:mm:ss"
                        ),
                    });
                }
            }
        );
        closeModal();
    } catch (error: any) {
        toast.error("Validation error", error.message);
    }
};
const closeModal = () => {
    taskToEdit.value = null;
    taskId.value = null;
    showModal.value = false;
};

const filteredTasks = computed(() => {
    return tasks.value.slice(0, 7).filter((task) => {
        const matchesSearchTerm =
            searchTerm.value && searchTerm.value.length > 0
                ? task.name
                      .toLowerCase()
                      .includes(searchTerm.value.toLowerCase())
                : true;

        const withinStartDateRange = startDate.value
            ? dayjs(task.due_date).isAfter(dayjs(startDate.value))
            : true;

        const withinEndDateRange = endDate.value
            ? dayjs(task.due_date).isBefore(dayjs(endDate.value))
            : true;
        const matchesStatusFilter =
            statusFilter.value !== null && statusFilter.value !== ""
                ? Number(task.status) === Number(statusFilter.value)
                : true;

        return (
            matchesSearchTerm &&
            withinStartDateRange &&
            withinEndDateRange &&
            matchesStatusFilter
        );
    });
});
</script>
