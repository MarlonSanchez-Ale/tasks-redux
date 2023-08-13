import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, editTask } from "../features/tasks/taskSlice"
import { v4 } from "uuid"
import { useNavigate, useParams } from "react-router-dom" //Sirve para cambiar de pagina
import { useEffect } from "react"

export default function TaskForm() {

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "ABIERTO"
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector(state => state.tasks)

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (params.id) {
            dispatch(editTask(task))
            navigate('/')
        } else {
            dispatch(addTask({
                ...task,
                id: v4(),
            }))
            navigate('/')
        }
    }

    useEffect(() => {
        if (params.id) {
            setTask(tasks.find((task) => task.id === params.id))
        }
    }, [params.id, tasks])

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-2">
            <label htmlFor="title" className="block text-sm font-bold my-2">Task: </label>
            <input
                type="text"
                name="title"
                placeholder="Tittle"
                value={task.title}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <label htmlFor="decription" className="block text-sm font-bold my-2">Description: </label>
            <textarea
                name="description"
                placeholder="description"
                value={task.description}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />

            <button type="submit" className="bg-indigo-600 px-2 py-1 text-xs rounded-md">Save</button>
        </form>
    )
}