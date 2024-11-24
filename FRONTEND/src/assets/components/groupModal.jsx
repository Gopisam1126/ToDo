/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../compStyles/groupModal.css";
import axios from "axios";

function GroupModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        group_head: "",
        group_desc: "",
        group_priority: "",
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            setFormData({ group_head: "", group_desc: "", group_priority: "" });
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
        
        const modalData = new FormData();
        Object.keys(formData).forEach((key) => {
            modalData.append(key, formData[key])
        });

        try {
            const modalRes = await axios.post("http://localhost:3000/newgroup", modalData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            setMessage(modalRes.data.message)
            setIsError(false)
        } catch (error) {
            console.log(error);
            setIsError(true);
            setMessage("Error creating Group😑")
        }

    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Create New Group</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Group Heading/Name:
                        <input
                            type="text"
                            name="group_head"
                            value={formData.group_head}
                            onChange={handleChange}
                            placeholder="Enter group name"
                            required
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        Group Description:
                        <textarea
                            name="group_desc"
                            value={formData.group_desc}
                            onChange={handleChange}
                            placeholder="Enter group description"
                            required
                        />
                    </label>
                    <label>
                        Group Priority:
                        <input
                            type="text"
                            name="group_priority"
                            value={formData.group_priority}
                            onChange={handleChange}
                            placeholder="Enter priority (e.g., High, Medium, Low)"
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
                        <button type="submit">Save Group</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GroupModal;
