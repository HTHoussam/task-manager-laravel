import dayjs from "dayjs";
import { computed } from "vue";

export default function useTaskFilter(tasks) {
    const filteredTasks = computed(() => {
        return tasks.value.filter((task) => {
            // Filter by search term
            const matchesSearchTerm = searchTerm.value
                ? task.name
                      .toLowerCase()
                      .includes(searchTerm.value.toLowerCase())
                : true;

            // Filter by start date
            const withinStartDateRange = startDate.value
                ? dayjs(task.due_date).isAfter(dayjs(startDate.value))
                : true;

            // Filter by end date
            const withinEndDateRange = endDate.value
                ? dayjs(task.due_date).isBefore(dayjs(endDate.value))
                : true;

            // Filter by status
            const matchesStatusFilter =
                statusFilter.value !== null
                    ? task.status === statusFilter.value
                    : true;
            console.log("matchesStatusFilter", matchesStatusFilter);
            return matchesStatusFilter;
            // Apply OR logic
            return (
                matchesSearchTerm ||
                withinStartDateRange ||
                withinEndDateRange ||
                matchesStatusFilter
            );
        });
    });
    console.log("filteredTasks inside compo", filteredTasks);
    return {
        searchTerm,
        startDate,
        endDate,
        statusFilter,
        filteredTasks: filteredTasks.value,
    };
}
