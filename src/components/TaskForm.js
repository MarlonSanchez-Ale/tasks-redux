import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, editTask } from "../features/tasks/taskSlice"
import { v4 } from "uuid"
import { useNavigate, useParams } from "react-router-dom" //Sirve para cambiar de pagina
import { useEffect } from "react"
import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function TaskForm() {

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: false
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector(state => state.taskManager)

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
        <Card className="mt-6 w-96 bg-blue-gray-900 shadow-md">
            <CardBody className="text-center">
                <div className="flex flex-col justify-center gap-2">
                    <div className="flex justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mb-1 h-12 w-12 text-gray-200"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                                clipRule="evenodd"
                            />
                            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                        </svg>
                    </div>
                    <div>
                        {params.id && (
                            <Typography variant="h5" className="mt-5 text-gray-100">
                                EDIT TASK
                            </Typography>
                        )}
                        {!params.id && (
                            <Typography variant="h5" className="mt-5 text-gray-100">
                                NEW TASK
                            </Typography>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-sm p-4 mb-2">
                    <Input
                        type="text"
                        name="title"
                        size="lg"
                        label="Tittle"
                        value={task.title}
                        onChange={handleChange}
                        color="white"
                        required
                    />

                    <Input
                        name="description"
                        label="Description"
                        value={task.description}
                        onChange={handleChange}
                        className="text-gray-100"
                        color="white"
                        required
                    />

                    <div className="flex flex-grow justify-center gap-3">
                        <Button type="submit" className="bg-indigo-800 text-lg rounded-md w-32">SAVE</Button>
                        <Link to="/">
                            <Button type="button" className="bg-red-900 text-lg rounded-md w-32">CANCEL</Button>
                        </Link>
                    </div>
                </form>
            </CardBody>

        </Card>

    )
}