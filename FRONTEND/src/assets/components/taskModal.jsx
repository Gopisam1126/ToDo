/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../compStyles/taskModal.css";
import axios from "axios";

function TaskModal({ isOpen, onClose }) {

    const [formData, setFormData] = useState({
        task_head: "",
        task_desc: "",
        priority: "",
        startdate: "",
        enddate: "",
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.querySelector("input[name='task_head']").focus();
        } else {
            setFormData({ task_head: "", task_desc: "", priority: "", startdate: "", enddate: "" });
            setMessage("");
            setIsError(false);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            setIsError(true);
            setMessage("Authentication Error⚠️, Try logging in again.");
        }

        if (new Date(formData.startdate) > new Date(formData.enddate)) {
            setIsError(true);
            setMessage("Strat date cannot be greater than end date.🫠");
        }
        
        const modalData = new FormData();
        Object.keys(formData).forEach((key) => {
            modalData.append(key, formData[key]);
        });

        try {
            const modalRes = await axios.post("http://localhost:3000/newtask", modalData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            setMessage(modalRes.data.message);
            setIsError(false);

            setFormData({
                task_head: "",
                task_desc: "",
                priority: "",
                startdate: "",
                enddate: "",
            });

        } catch (error) {
            console.log(error);
            setIsError(true);
            setMessage(error.response?.data?.message || "Error creating Group😑");
        }

    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Create New Task</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Task Name:
                        <input
                            type="text"
                            name="task_head"
                            value={formData.task_head}
                            onChange={handleChange}
                            placeholder="Enter Task name"
                            required
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        Task Description:
                        <textarea
                            name="task_desc"
                            value={formData.task_desc}
                            onChange={handleChange}
                            placeholder="Enter task description"
                            required
                        />
                    </label>
                    <label>
                        Task Priority:
                        <input
                            type="text"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            placeholder="Enter priority (e.g., High, Medium, Low)"
                            required
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="startdate"
                            value={formData.startdate}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            name="enddate"
                            value={formData.enddate}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </label>
                    <p className="message" style={{color: isError ? "orange" : "green"}}>
                        {message}
                    </p>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;
