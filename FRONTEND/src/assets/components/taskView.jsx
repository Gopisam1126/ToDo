/* eslint-disable no-unused-vars */
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import "../compStyles/taskView.css";
import { useEffect, useState } from 'react';
import axios from "axios";

function TaskView() {

    // const [groups, setGroups] = useState([]);

    // useEffect(() => {
    //     async function getGroups() {
    //         try {
    //             const token = localStorage.getItem('token');
    //             const grpRes = await axios.get("http://localhost:3000/groupdetails", {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });
    //             setGroups(grpRes.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getGroups();
    // }, []);

    // function to handle deletion of group

    // async function handleDelete(groupId) {
    //     try {
    //         const token = localStorage.getItem('token');
    //         await axios.delete(`http://localhost:3000/groupdetails/${groupId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         });
    //         setGroups((prevGrp) => prevGrp.filter(group => group.id !== groupId));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // Function to get the appropriate class for priority
    function getPriorityClass(priority) {
        if (priority === 'Low' || priority === "low") return 'low-priority';
        if (priority === 'Medium' || priority === "medium") return 'medium-priority';
        if (priority === 'High' || priority === "high") return 'high-priority';
        return '';
    }

    return <>
        <section className="task-v-sec">
            <h1>Task View</h1>
        </section>
    </>
}

export default TaskView;