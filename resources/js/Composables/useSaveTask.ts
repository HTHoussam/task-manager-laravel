import { Task } from "@/types";
import { TaskSchema } from "@/utils/Validation";
import axios from "axios";
import dayjs from "dayjs"; // Import dayjs for date formatting
import { ref } from "vue";

export default function useTaskSaving() {
    // Define taskId as a ref
    const taskId = ref<number | null>(null);

    // Define a function to save the task
    const saveModal = async (newTask: Task) => {
        try {
            const validatedTask = await TaskSchema.validate(newTask, {
                abortEarly: false,
            });

            // If taskId is not null, update an existing task
            if (taskId.value !== null) {
                const { data } = await axios.put(`/api/tasks/${taskId.value}`, {
                    user_id: validatedTask.user_id,
                    name: validatedTask.name,
                    description: validatedTask.description,
                    status: validatedTask.status,
                    due_date: dayjs(validatedTask.due_date).format(
                        "YYYY-MM-DD HH:mm:ss"
                    ),
                });

                // Update the task in the tasks array
                const oldTaskIdx = tasks.value.findIndex(
                    (r) => r.id === taskId.value
                );
                if (oldTaskIdx >= 0) {
                    tasks.value[oldTaskIdx] = {
                        ...data.data,
                        due_date: dayjs(data.data.due_date).format(
                            "MMM D, YYYY"
                        ),
                    };
                }
            } else {
                // If taskId is null, create a new task
                await axios.post("/api/tasks", {
                    ...validatedTask,
                });
            }

            // Close the modal after saving
            closeModal();
        } catch (error) {
            console.error("Validation error:", error);
        }
    };

    // Return the saveModal function and taskId ref
    return {
        saveModal,
        taskId,
    };
}
