import { Task } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import { ref } from "vue";

interface FetchedData {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string;
        label: string | null;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    data: Task[];
}

export function useFetchTasks() {
    const tasks = ref<Task[]>([]);
    const isLoading = ref(false);

    async function fetchTasks({
        searchTerm,
        beforeDate,
        afterDate,
        status,
    }: {
        searchTerm?: string;
        beforeDate?: string;
        afterDate?: string;
        status?: string;
    }) {
        try {
            console.log("beforeDate", beforeDate);
            console.log("afterDate", afterDate);

            isLoading.value = true;

            const response = await axios.get<{
                tasks: FetchedData;
            }>(`/api/tasks`, {
                params: {
                    searchTerm,
                    beforeDate,
                    status,
                    afterDate,
                },
            });
            tasks.value = response.data.tasks.data.map((r) => ({
                ...r,
                due_date: dayjs(r.due_date).format("MMM D, YYYY"),
            }));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            isLoading.value = false;
        }
    }

    return {
        tasks,
        isLoading,
        fetchTasks,
    };
}
