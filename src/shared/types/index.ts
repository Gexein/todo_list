export enum Statuses {
    toDo = 'План',
    inProgress = 'В работе',
    done = 'Сделано'
}

export enum PriorityValues {
    low = 1,
    medium = 2,
    high = 3
}

export enum PriorityContent {
    low = 'Низкий',
    medium = 'Средний',
    high = 'Высокий'
}

export interface Task {
    id: number;
    content: string;
    status: Statuses;
    priority: number
}