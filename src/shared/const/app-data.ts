import { PriorityContent, PriorityValues } from "../types";

export const OPTIONS = [
    { value: PriorityValues.low, content: PriorityContent.low },
    { value: PriorityValues.medium, content: PriorityContent.medium },
    { value: PriorityValues.high, content: PriorityContent.high }]

export const LOCAL_STORAGE_INIT_VALUE = []

export const PRIORITY_ORDER = {
    high: 3,
    medium: 2,
    low: 1
} 