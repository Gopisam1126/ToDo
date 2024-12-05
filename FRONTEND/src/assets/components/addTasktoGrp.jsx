/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "../compStyles/taskModal.css";
import "../compStyles/addTasktoGrp.css"
import axios from "axios";

function AddTasktoGrp({ isOpen, onClose, groupId }) {

    const [isDropDown, setIsDropDown] = useState(false);
    const [options, setOptions] = useState([]);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('')
    const [selTaskId, setSelTaskId] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null);

    const handleOptionClick = () => {
        setIsDropDown(!isDropDown)
    }

    const handleTaskSelection = (task_id) => {
        const task = options.find(option => option.id === task_id);
        setSelTaskId(task_id);
        setIsDropDown(false)
        setSelectedTask(task);
    }

    async function handleSubmit() {

        if (!selTaskId || !groupId) {
            setIsError(true);
            setMessage("Please select a Task or a Valid Group");
            return
        }

        try {
            const token = localStorage.getItem('token');

            // const checkRes = await axios.get(`http://localhost:3000/check-task-in-group/${selTaskId}`, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });

            // if (checkRes.data.exists) {
            //     setIsError(true);
            //     setMessage("Task Already added");
            //     return;
            // }

            await axios.post("http://localhost:3000/add-task-to-group",
                {group_id: groupId, task_id: selTaskId},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setMessage("Task assigned to group😎");
            setIsError(false);
        } catch (error) {
            setIsError(true);
            setMessage("Error adding task to group!")
            console.log(error);
        }
    }

    useEffect(() => {
        let mounted = true;
        async function getTasks() {
            try {
                const token = localStorage.getItem('token');

                const taskRes = await axios.get("http://localhost:3000/taskdetails", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (mounted) {
                    setOptions(taskRes.data.filter(task => task.task_head !== null));
                }
            } catch (error) {
                if (mounted) {
                    setIsError(true);
                    setMessage("Error Fetching Tasks!");
                    setOptions([]);
                }
            }
        }
        getTasks();
        return () => { mounted = false };
    }, []);
    


    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="atg-modal-c">
                <h2>Add Task to Group</h2>
                <div className="custom-dropdown">
                    <div
                        className={`dropdown-header ${isDropDown ? 'open' : ''}`}
                        onClick={handleOptionClick}
                    >
                        <div className="drp-dwn-label">
                            <span>Select a Task </span>
                            <div className="drp-dwn-arr-i">
                                {
                                    isDropDown ? <KeyboardArrowDownIcon
                                        style={{
                                            fontSize: "2rem",
                                            position: "relative",
                                            top: "0.3rem"
                                        }}
                                    /> : <KeyboardArrowUpIcon
                                        style={{
                                            fontSize: "2rem",
                                            position: "relative",
                                            top: "0.3rem"
                                        }}
                                    />
                                }
                            </div>
                        </div>
                        <div className="note-to-user">
                            Select a Task from the list to add to the Group.
                        </div>
                        <div className="d-list">
                            {
                                isDropDown && (
                                    <ul className="dropdown-list">
                                        {
                                            options.map((option) => (
                                                <li
                                                    key={option.id}
                                                    className="dropdown-item"
                                                    onClick={() => handleTaskSelection(option.id)}
                                                >
                                                    {option.task_head}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="modal-bottom-sec">
                    <p className="message" style={{color: isError ? "orange" : "green"}}>
                        {message}
                    </p>
                    <div className="atg-modal-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="button" onClick={handleSubmit}>Add Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTasktoGrp;
