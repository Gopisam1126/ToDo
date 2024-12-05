/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "../compStyles/taskModal.css";
import "../compStyles/addTasktoGrp.css"
import axios from "axios";

function AddTasktoGrp({ isOpen, onClose }) {

    const [isDropDown, setIsDropDown] = useState(false);
    const [options, setOptions] = useState([]);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('')

    const handleOptionClick = () => {
        setIsDropDown(!isDropDown)
    }

    useEffect(() => {
        async function getTasks() {
            try {
                const token = localStorage.getItem('token');
                const taskRes = await axios.get("http://localhost:3000/taskdetails", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOptions(taskRes.data.filter(task => task.task_head !== null));
            } catch (error) {
                setIsError(true);
                setMessage("Error Fetching Tasks!");
                setOptions([]);
            }
        }
        getTasks();
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
                        <button type="submit">Add Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTasktoGrp;
