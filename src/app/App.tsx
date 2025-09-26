import { useMemo } from 'react';
import AddTaskForm from '../features/add-task-form';
import TaskList from '../features/task-list';
import useStorage from '../shared/hooks/useStorage';
import './App.scss';
import { Statuses } from '../shared/types';
import { AnimatePresence, motion } from 'motion/react';




function App() {
  const { storage, addTaskToStorage, deleteTask, changeTaskStatus, changeTaskContent, changeTaskPriority } = useStorage()

  const planTasks = useMemo(() => storage.filter((task) => task.status === Statuses.toDo), [storage])
  const inProgressTasks = useMemo(() => storage.filter((task) => task.status === Statuses.inProgress), [storage])
  const doneTasks = useMemo(() => storage.filter((task) => task.status === Statuses.done), [storage])
  const countOfActiveTasks = useMemo(() => [...storage].filter((task) => task.status !== Statuses.done).length, [storage])


  return (
    <AnimatePresence >
      <motion.div className="todo__header">
        <h1 className='todo__title'>TODO - Лист</h1>
        <h2 className='todo__title'>Кол-во незавершенных задач: {countOfActiveTasks}</h2>
        <AddTaskForm className='todo__form' addTaskToStorage={addTaskToStorage} />
      </motion.div>
      <motion.div className='todo__container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{
        opacity: { duration: 0.5 },
        layout: { duration: 0.2 }
      }} layout>
        <motion.div style={{ display: 'contents' }} transition={{
          opacity: { duration: 0.5 },
          layout: { duration: 0.6 }
        }} layout>
          <TaskList taskList={planTasks} title='План' className='todo__list' deleteTask={deleteTask} toInProgress={changeTaskStatus} toDone={changeTaskStatus} changeTaskContent={changeTaskContent} changeTaskPriority={changeTaskPriority}>
          </TaskList >
          <TaskList taskList={inProgressTasks} title='В работе' className='todo__list' deleteTask={deleteTask} toDone={changeTaskStatus} toInPlan={changeTaskStatus} changeTaskContent={changeTaskContent} changeTaskPriority={changeTaskPriority}>
          </TaskList>
          <TaskList taskList={doneTasks} title='Готово' className='todo__list' deleteTask={deleteTask} toInPlan={changeTaskStatus} toInProgress={changeTaskStatus} changeTaskContent={changeTaskContent} changeTaskPriority={changeTaskPriority}>
          </TaskList>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default App
