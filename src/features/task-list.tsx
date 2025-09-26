import { Statuses, type Task } from "../shared/types"
import { useMemo } from "react"
import { AnimatePresence, motion } from "motion/react"
import TaskItem from './task';




interface TaskListProps extends React.AllHTMLAttributes<HTMLUListElement> {
    taskList: Task[];
    title: string;
    deleteTask: (taskId: Task['id']) => void;
    toInProgress?: (taskId: Task['id'], newStatus: Statuses.inProgress) => void;
    toDone?: (taskId: Task['id'], newStatus: Statuses.done) => void;
    toInPlan?: (taskId: Task['id'], newStatus: Statuses.toDo) => void;
    changeTaskContent: (taskId: Task['id'], newContent: Task['content']) => void;
    changeTaskPriority: (taskId: Task['id'], newPriority: Task['priority']) => void;
}

export default function TaskList({ changeTaskPriority, changeTaskContent, toInPlan, toDone, toInProgress, deleteTask, title, taskList, ...props }: TaskListProps) {
    const sortedByPriorityTasks = useMemo(() => [...taskList].sort((a, b) => b.priority - a.priority), [taskList])


    return (taskList.length > 0 &&

        <motion.div className="todo__task-window-wrapper"
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
            transition={{
                opacity: { duration: 0.5 },
                layout: { duration: 0.6 }
            }} layout
            exit={{ opacity: 0 }}>
            <h3 className="todo__subtitle">{title}</h3>
            <ul {...props}>
                <AnimatePresence>
                    {sortedByPriorityTasks.map((task) =>
                        <motion.li className='todo__task' key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{
                            opacity: { duration: 0.4 },
                            layout: { duration: 0.5 }
                        }} layout>
                            <TaskItem content={task.content} changeTaskContent={changeTaskContent} taskId={task.id} taskPriority={task.priority} changeTaskPriority={changeTaskPriority} />
                            {toDone && <input type="checkbox" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { if (event.target.checked) { toDone(task.id, Statuses.done) } }} />}
                            <button className="todo__operation-button" onClick={() => deleteTask(task.id)}>Удалить</button>
                            {toInPlan && <button className="todo__operation-button" onClick={() => toInPlan(task.id, Statuses.toDo)} >В план</button>}
                            {toInProgress && <button className="todo__operation-button" onClick={() => toInProgress(task.id, Statuses.inProgress)} >В работу</button>}
                        </motion.li>
                    )}
                </AnimatePresence>
            </ul>
        </motion.div>
    )
}