/* eslint-disable no-unused-vars */
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import "../compStyles/taskView.css";
import { useEffect, useState } from 'react';
import axios from "axios";

function TaskView() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTasks() {
            try {
                const token = localStorage.getItem('token');
                const taskRes = await axios.get("http://localhost:3000/taskdetails", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(taskRes.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTasks();
    }, []);

    // Function to get the appropriate class for priority
    function getPriorityClass(priority) {
        if (priority === 'Low' || priority === "low") return 'low-priority';
        if (priority === 'Medium' || priority === "medium") return 'medium-priority';
        if (priority === 'High' || priority === "high") return 'high-priority';
        return '';
    }

    // function to get class for status
    function getStatusClass(status) {
        if (status === 'Pending' || status === "pending") return 'pending';
        if (status === 'Completed' || status === "completed") return 'completed';
        return '';
    }

    // function to formate date
    function formatDate(dateString) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); // Output: 28 Nov 2024
    }
    

    return (
        <section className="ca-main-sec">
            <div className="item-grid">
                {
                    tasks.length > 0 ? (
                        tasks
                        .filter(task => task.task_head !== null)
                        .map((task) => {
                            return (
                                <div className='t-items-c' key={task.id}>
                                    <div className="item-head-c">
                                        <h2 className="grouo-head">
                                            {task.task_head}
                                        </h2>
                                        <div className="add-new-task-icon">
                                            <AddCircleOutlineIcon />
                                        </div>
                                        <div className="delete-task-icon">
                                            <DeleteIcon/>
                                        </div>
                                    </div>
                                    <p className="group-desc">
                                        {task.task_desc}
                                    </p>

                                    <div className="status-c">
                                        <p className={`status ${getStatusClass(task.status)}`}>
                                            {task.status}
                                        </p>
                                    </div>

                                    <div className="task-footer-c">
                                        <div className='start-date'>
                                            <p className="start-date-txt">
                                                Start Date
                                            </p>
                                            <div className="start-date-c">
                                                {formatDate(task.start_date)}
                                            </div>
                                        </div>
                                        <div className='end-date'>
                                            <p className="end-date-txt">
                                                End Date
                                            </p>
                                            <div className="end-date-c">
                                                {formatDate(task.end_date)}
                                            </div>
                                        </div>

                                        {/* priority */}

                                        <div className="priority--main-c">
                                            <p className="t-priority">
                                                Priority
                                            </p>
                                            <div className="task-priority-c">
                                                <p className={`${getPriorityClass(task.priority)}`}>
                                                    {task.priority}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            );
                        })
                    ) : (
                        <p>No tasks Available</p>
                    )
                }
            </div>
        </section>
    );
}

export default TaskView;