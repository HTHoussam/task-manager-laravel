export interface Task {
    id?: number;
    name: string;
    user_id?: number;
    description: string;
    due_date: string;
    status?: StatusEnum;
}

export enum StatusEnum {
    PENDING = 0,
    IN_PROGESS = 1,
    COMPLETED = 2,
    OVERDUE = 4,
}
