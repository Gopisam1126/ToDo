/* eslint-disable react/prop-types */
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import "../compStyles/taskView.css";
import { useEffect, useState } from 'react';
import axios from "axios";

function TaskView({ tasks: searchTasks, isLoading }) {
    // Rename local state to avoid conflict
    const [defaultTasks, setDefaultTasks] = useState([]);

    // Fetch all tasks on component mount
    useEffect(() => {
        async function getTasks() {
            try {
                const token = localStorage.getItem('token');
                const taskRes = await axios.get("http://localhost:3000/taskdetails", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDefaultTasks(taskRes.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTasks();
    }, []);

    // Handle delete task
    async function handleDelete(taskId) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/groupdetails/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // Remove deleted task from local state
            setDefaultTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.log(error);
        }
    }

    // Get the appropriate class for priority
    function getPriorityClass(priority) {
        if (priority === 'Low' || priority === "low") return 'low-priority';
        if (priority === 'Medium' || priority === "medium") return 'medium-priority';
        if (priority === 'High' || priority === "high") return 'high-priority';
        return '';
    }

    // Get the appropriate class for status
    function getStatusClass(status) {
        if (status === 'Pending' || status === "pending") return 'pending';
        if (status === 'Completed' || status === "completed") return 'completed';
        return '';
    }

    // Format date
    function formatDate(dateString) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); // Output: 28 Nov 2024
    }

    // Determine which tasks to display
    const displayTasks = searchTasks && searchTasks.length > 0 ? searchTasks : defaultTasks;

    return (
        <section className="ca-main-sec">
            <div className="item-grid">
                {isLoading ? (
                    <p>Loading tasks...</p>
                ) : displayTasks.length > 0 ? (
                    displayTasks
                        .filter(task => task.task_head !== null)
                        .map((task) => (
                            <div className="t-items-c" key={task.id}>
                                <div className="item-head-c">
                                    <h2 className="grouo-head">
                                        {task.task_head}
                                    </h2>
                                    <div className="add-new-task-icon">
                                        <AddCircleOutlineIcon />
                                    </div>
                                    <div
                                        className="delete-task-icon"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <DeleteIcon />
                                    </div>
                                </div>
                                <p className="group-desc">{task.task_desc}</p>
                                <div className="status-c">
                                    <p className={`status ${getStatusClass(task.status)}`}>
                                        {task.status}
                                    </p>
                                </div>
                                <div className="task-footer-c">
                                    <div className="start-date">
                                        <p className="start-date-txt">Start Date</p>
                                        <div className="start-date-c">{formatDate(task.start_date)}</div>
                                    </div>
                                    <div className="end-date">
                                        <p className="end-date-txt">End Date</p>
                                        <div className="end-date-c">{formatDate(task.end_date)}</div>
                                    </div>
                                    <div className="priority--main-c">
                                        <p className="t-priority">Priority</p>
                                        <div className="task-priority-c">
                                            <p className={`${getPriorityClass(task.priority)}`}>
                                                {task.priority}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No tasks available</p>
                )}
            </div>
        </section>
    );
}

export default TaskView;
