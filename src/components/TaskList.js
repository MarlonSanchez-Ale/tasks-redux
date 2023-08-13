import { useSelector, useDispatch } from "react-redux";
import { deleteTask, deleteAll } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TaskList() {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteTask(id))
    }

    const handleDeleteAll = () => {
        dispatch(deleteAll())
    }

    return (
        <div className="w-4/6">
            <header className="flex justify-between items-center py-4">
                <h1>Total Tareas:  {tasks.length}</h1>
                <div className="flex justify-between items-center gap-4">
                    <Link to='/create-task' className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">
                        Nueva Tarea
                    </Link>
                    <button onClick={() => handleDeleteAll()} className="bg-red-600 px-2 py-1 rounded-sm text-sm">Vaciar Tareas</button>
                </div>
            </header>
            <div className="grid grid-cols-3 gap-4">
                {tasks.map(({ id, title, description, status }, index) => (
                    <div key={index} className="bg-neutral-800 p-4 rounded-md">
                        <header className="flex justify-between">
                            <h3>{title}</h3>
                            <div className="flex gap-3">
                                <Link
                                    to={`/edit-task/${id}`}
                                    className="bg-zinc-600 px-2 py-1 text-xs rounded-md"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(id)}
                                    className="bg-red-500 px-2 py-1 text-xs rounded-md self-center"
                                >
                                    Delete
                                </button>
                            </div>
                        </header>
                        <p>{description}</p>
                        <p>{status}</p>

                    </div>
                ))}
            </div>


        </div>
    )
}