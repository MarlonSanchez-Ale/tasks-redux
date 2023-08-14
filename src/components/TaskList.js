import { useSelector, useDispatch } from "react-redux";
import { editState, deleteTask, deleteAll } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    Typography,
    TimelineHeader,
    Tooltip,
    IconButton,
    Button,
    Alert,
    Checkbox
} from "@material-tailwind/react";
import { BsLightningChargeFill, BsPencilSquare, BsTrash, BsSignStopFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditState = (id) => {
        console.log(id)
        dispatch(editState(id))
    }

    const handleDelete = (id) => {
        dispatch(deleteTask(id))
    }

    const handleDeleteAll = () => {
        dispatch(deleteAll())
    }



    return (
        <div className="sm:w-3/4 md:w-4/6">
            <Typography variant="h2" className="font-bold my-10">
                Welcome to Task Manager
            </Typography>
            <div className="flex py-4 my-5 sm:flex-col gap-5 md:flex-row justify-between">
                <Button
                    size="lg"
                    variant="gradient"
                    color="blue-gray"
                    className="group relative flex items-center gap-3 overflow-hidden pr-[72px] sm:text-lg md:text-xl "
                >
                    TO DO
                    <span className="absolute right-0 grid h-full w-12 place-items-center bg-blue-gray-600 transition-colors group-hover:bg-blue-gray-700">
                        {tasks.length}
                    </span>
                </Button>
                <div className="flex sm:flex-col justify-center gap-5 md:flex-row">

                    <Button size="lg" onClick={() => { navigate("/create-task") }} className="bg-indigo-800 text-lg">NEW TASK</Button>

                    <Button onClick={() => handleDeleteAll()} size="lg" className="bg-red-600 text-lg">CLEAN</Button>
                </div>
            </div>
            <div className="grid grid-rows-3 gap-4">
                {tasks.map(({ id, title, description, status }, index) => (
                    <Timeline key={index}>
                        <TimelineItem className="h-28">
                            <TimelineConnector className="!w-[78px]" />
                            <TimelineHeader className={status === 'IN PROGRESS' ? 'relative rounded-xl border border-yellow-500 bg-gray-700 py-3 pl-4 pr-8 shadow-lg shadow-gray-900' : 'relative rounded-xl border border-blue-800  bg-blue-gray-900 py-3 pl-4 pr-8 shadow-lg shadow-gray-900'}>
                                <TimelineIcon className="p-3" variant="ghost">
                                    <BsLightningChargeFill className="h-5 w-5" color="white" />
                                </TimelineIcon>
                                <div className="flex flex-col gap-1">
                                    <Typography variant="h6" >
                                        {title}
                                    </Typography>
                                    <Typography variant="small" className="font-normal text-gray-500">
                                        {description}
                                    </Typography>
                                    <Typography variant="small" className="font-normal text-gray-500">
                                        {status}
                                    </Typography>
                                </div>
                                <div className="flex flex-grow gap-2 justify-end">
                                    <Tooltip content="Done">
                                        <IconButton color="gray">
                                            {status === 'DONE' ? (
                                                <Checkbox
                                                    defaultChecked
                                                    ripple={false}
                                                    className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                                />
                                            ) : (
                                                <Checkbox
                                                    ripple={false}
                                                    className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                                    onClick={() => handleEditState(id)}
                                                />
                                            )}

                                        </IconButton>
                                    </Tooltip>
                                    <Link to={`/edit-task/${id}`}>
                                        <Tooltip content="Edit">
                                            <IconButton color="gray">
                                                <BsPencilSquare color="yellow" size={20} />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>

                                    <Tooltip content="Delete">
                                        <IconButton color="gray" onClick={() => handleDelete(id)}>
                                            <BsTrash size={20} color="red" />
                                        </IconButton>
                                    </Tooltip>

                                </div>
                            </TimelineHeader>
                        </TimelineItem>
                    </Timeline>
                ))}
                {!tasks &&
                    <div role="status" className="space-y-2.5 animate-pulse w-full p-20">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                    </div>
                }
                {tasks && !tasks.length && (
                    <Alert
                        icon={<BsSignStopFill className="mt-px h-6 w-6" />}
                        className="bg-gray-800 text-gray-500 border-l-4 border-[#c92e2e] rounded-none font-medium shadow-gray-800 text-lg">
                        You don't have any pending tasks
                    </Alert>
                )}
            </div>
        </div>
    )
}

