import { OPTIONS } from "../shared/const/app-data";
import Select from "../shared/ui/select";
import AddIcon from '../assets/icons/addTask.svg';
import { useState } from "react";
import { Statuses, type Task } from "../shared/types";

interface AddTaskFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    addTaskToStorage: (task: Task) => void
}



export default function AddTaskForm({ addTaskToStorage, ...props }: AddTaskFormProps) {
    const [inputValue, setInputValue] = useState('')
    const [selectValue, setSelectValue] = useState('')


    const addTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!inputValue || !selectValue) return
        addTaskToStorage({ id: Date.now(), content: inputValue, status: Statuses.toDo, priority: +selectValue })
        setInputValue('')
        setSelectValue('')
    }

    const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const changeSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(event.target.value)
    }

    const inputClassList = inputValue ? "todo__input" : "todo__input todo__input-invalid"
    const selectClassList = selectValue ? "todo__select" : "todo__select todo__select-invalid"

    return (
        <form {...props} onSubmit={addTask}>
            <input type="text" className={inputClassList} placeholder="Название задачи.." value={inputValue} onChange={changeInputValue} />
            <div className="todo__flex-wrapper">
                <Select options={OPTIONS} className={selectClassList} value={selectValue} onChange={changeSelectValue} />
                <button className="todo__addButton" disabled={!inputValue.trim() || !selectValue}><img src={AddIcon} alt="Кнопка добавить" height={20} /></button>
            </div>
        </form>
    )

}