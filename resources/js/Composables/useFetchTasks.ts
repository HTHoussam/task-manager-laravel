// import axios and any other necessary dependencies
import { Task } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import { ref } from "vue";

// Define a custom composition function to fetch tasks
export function useFetchTasks() {
    // Define reactive variables for tasks and loading state
    const tasks = ref<Task[]>([]);
    const isLoading = ref(false);

    // Define the fetchTasks method
    async function fetchTasks() {
        try {
            isLoading.value = true;
            const response = await axios.get<{ tasks: Task[] }>("/api/tasks");
            tasks.value = response.data.tasks.map((r) => ({
                ...r,
                due_date: dayjs(r.due_date).format("MMM D, YYYY"),
            }));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            isLoading.value = false;
        }
    }

    // Return the fetchTasks method and any other necessary variables
    return {
        tasks,
        isLoading,
        fetchTasks,
    };
}
