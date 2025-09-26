import { useState } from "react";
import { LOCAL_STORAGE_INIT_VALUE } from "../const/app-data";
import { PriorityValues, Statuses, type Task } from "../types";

interface UseStorageReturn {
    storage: Task[];
    addTaskToStorage: (task: Task) => void;
    changeTaskPriority: (taskId: Task['id'], newPriority: PriorityValues) => void;
    deleteTask: (taskId: Task['id']) => void;
    changeTaskStatus: (taskId: Task['id'], newStatus: Statuses) => void;
    changeTaskContent: (taskId: Task['id'], newContent: Task['content']) => void;
}

export default function useStorage(): UseStorageReturn {
    const key = 'todo_list'
    const [storage, setStorage] = useState<Task[]>(() => {
        try {
            const value = window.localStorage.getItem(key)
            return value ? JSON.parse(value) : LOCAL_STORAGE_INIT_VALUE
        } catch (error) {
            console.error(`Ошибка чтения значения ключа ${key} из LocalStorage`, error)
            return LOCAL_STORAGE_INIT_VALUE
        }
    })

    const addTaskToStorage = (task: Task) => {
        try {
            const value = window.localStorage.getItem(key)
            const emptyArray = []
            if (value) {
                const store = JSON.parse(value)
                store.push(task)
                window.localStorage.setItem(key, JSON.stringify(store))
                setStorage(store)
                return
            }
            emptyArray.push(task)
            window.localStorage.setItem(key, JSON.stringify(emptyArray))
            setStorage(emptyArray)
        } catch (error) {
            console.error(`Ошибка записи данных в ключ ${key} из LocalStorage`, error)
        }
    }
    const changeTaskPriority = (taskId: Task['id'], newPriority: PriorityValues) => {
        try {
            if (!storage) return
            const updatedStorage = [...storage].map((task) => {
                if (task.id === taskId) {
                    return { ...task, priority: newPriority }
                }
                return task
            })
            window.localStorage.setItem(key, JSON.stringify(updatedStorage))
            setStorage(updatedStorage)
        } catch (error) {
            console.error(`Ошибка чтения значения ключа ${key} из LocalStorage`, error)
        }
    }

    const deleteTask = (taskId: Task['id']) => {
        try {
            if (!storage) return
            const updatedStorage = [...storage].filter((task) => task.id !== taskId)
            window.localStorage.setItem(key, JSON.stringify(updatedStorage))
            setStorage(updatedStorage)
        } catch (error) {
            console.error(`Ошибка удаления значения из ключа ${key} из LocalStorage`, error)
        }
    }

    const changeTaskStatus = (taskId: Task['id'], newStatus: Statuses) => {
        try {
            if (!storage) return
            const updatedStorage = [...storage].map((task) => {
                if (task.id === taskId) {
                    return { ...task, status: newStatus }
                }
                return task
            })
            window.localStorage.setItem(key, JSON.stringify(updatedStorage))
            setStorage(updatedStorage)
        } catch (error) {
            console.error(`Ошибка изменения значения из ключа ${key} из LocalStorage`, error)
        }
    }

    const changeTaskContent = (taskId: Task['id'], newContent: Task['content']) => {
        try {
            if (!storage) return
            const updatedStorage = [...storage].map((task) => {
                if (task.id === taskId) {
                    return { ...task, content: newContent }
                }
                return task
            })
            window.localStorage.setItem(key, JSON.stringify(updatedStorage))
            setStorage(updatedStorage)
        } catch (error) {
            console.error(`Ошибка изменения содержания задачи из ключа ${key} из LocalStorage`, error)
        }
    }

    return { storage, addTaskToStorage, changeTaskPriority, deleteTask, changeTaskStatus, changeTaskContent }

}