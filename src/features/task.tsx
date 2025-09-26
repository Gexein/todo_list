import { PriorityValues, type Task } from "../shared/types";
import Pencil from '../assets/icons/pencil.svg';
import { useState } from "react";
import CheckMark from '../assets/icons/check.svg';
import CancelIcon from '../assets/icons/cross.svg';


interface TaskProps {
    content: Task['content']
    changeTaskContent: (taskId: Task['id'], newContent: Task['content']) => void;
    taskId: Task['id'];
    taskPriority: Task['priority'];
    changeTaskPriority: (taskId: Task['id'], newPriority: Task['priority']) => void;
}

export default function Task({ changeTaskPriority, taskPriority, taskId, changeTaskContent, content }: TaskProps) {
    const [isChanging, setIsChanging] = useState(false)
    const [inputValue, setInputValue] = useState(content)
    const [isMenuOpen, setIsMenuOpen] = useState(false)



    const changeContent = () => {
        changeTaskContent(taskId, inputValue)
        setIsChanging(false)
    }

    const changePriority = (newPriority: PriorityValues) => {
        changeTaskPriority(taskId, newPriority)
        setIsMenuOpen(false)
    }

    const cancelContent = () => {
        setIsChanging(false)
        setInputValue(content)
    }

    const editButtonVisibility = isChanging
        ? { opacity: 0, display: 'none' }
        : { opacity: 1 }

    const indicatorBackgroundColor = taskPriority === PriorityValues.high
        ? 'red'
        : taskPriority === PriorityValues.medium
            ? 'orange'
            : 'green'

    const menuClassList = isMenuOpen
        ? 'todo__indication-menu'
        : 'todo__indication-menu-closed'

    return (<div className="todo__task-content">
        <div className="todo__priority-indicator" style={{ backgroundColor: `${indicatorBackgroundColor}` }} onClick={() => { setIsMenuOpen(!isMenuOpen); setIsChanging(false) }}></div>
        <div className={menuClassList}>
            <div className="todo__indication-menu-option green" onClick={() => changePriority(PriorityValues.low)}></div>
            <div className="todo__indication-menu-option orange" onClick={() => changePriority(PriorityValues.medium)}></div>
            <div className="todo__indication-menu-option red" onClick={() => changePriority(PriorityValues.high)}></div>
        </div>
        <button className="todo__button-change" onClick={() => { setIsChanging(true); setIsMenuOpen(false) }} style={editButtonVisibility}>
            <img src={Pencil} alt="Редактировать задачу" height={20} />
        </button>
        {isChanging && <input value={inputValue} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)} style={{ width: '100%' }} className="todo__input" />}
        {!isChanging && <p className="todo__textContentWrapper">{content}</p>}
        {isChanging &&
            <>
                <button disabled={inputValue.length < 1} className="todo__button-confirm" onClick={changeContent}><img src={CheckMark} alt="Подтвердить изменение содержания задачи" height={20} /></button>
                <button className="todo__button-cancel"><img src={CancelIcon} alt="Отменить изменения" height={20} onClick={cancelContent} /></button>
            </>
        }
    </div>)
}