// Import Yup
import * as yup from "yup";

// Define validation schema
export const TaskSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    due_date: yup.date().required("Due date is required"),
    status: yup.number().default(0),
});
