import "../compStyles/sidepanel.css";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import GroupModal from "./groupModal";
import TaskModal from "./taskModal";
import { useEffect, useState } from "react";
import axios from "axios";
function Sidepanel() {

    const [isExpandedg, setIsExpandedg] = useState(false);
    const [isExpandedt, setIsExpandedt] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [isGrpModal, setIsGrpModal] = useState(false);
    const [isTaskModal, setIsTaskModal] = useState(false);
    const [groups, setGroups] = useState([]);
    const [tasks, setTasks] = useState([]);

    function expandMore() {
        setIsExpandedg(!isExpandedg);
    }

    function expandMoret() {
        setIsExpandedt(!isExpandedt);
    }

    function handleSidepanel() {
        setIsOpen(!isOpen);
    }

    function openGrpModal() {
        setIsGrpModal(true);
    }

    function closeGrpModal() {
        setIsGrpModal(false);
    }
    
    function openTaskModal() {
        setIsTaskModal(true)
    }

    function closeTaskModal() {
        setIsTaskModal(false);
    }

    function getStatusClass(status) {
        if (status === 'Pending' || status === "pending") return 'pending';
        if (status === 'Completed' || status === "completed") return 'completed';
        return '';
    }

    async function getGroups() {
        try {
            const token = localStorage.getItem('token');
            const grpRes = await axios.get("http://localhost:3000/groupdetails", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return grpRes.data.filter(group => group.group_head !== null);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async function getTasks() {
        try {
            const token = localStorage.getItem('token');
            const taskRes = await axios.get("http://localhost:3000/taskdetails", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return taskRes.data.filter(task => task.task_head !== null);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    useEffect(() => {
        async function fetchData() {
            const [fetchedGroups, fetchedTasks] = await Promise.all([getGroups(), getTasks()]);
            setGroups(fetchedGroups);
            setTasks(fetchedTasks);
        }
        fetchData();
    }, []);

    return <>
        <section className={`sp-main-sec ${isOpen ? "open" : "close"}`}>
            <div className="sp-main-head">
                <div className="close-i" onClick={handleSidepanel}>
                    {
                        isOpen ? <CloseIcon style={{
                            fontSize: "2.5rem",
                        }}/> : <MenuIcon style={{
                            fontSize: "2.5rem",
                        }}/>
                    }
                </div>
            </div>
            <div className={`sp-main-body ${isOpen ? "display" : "hide"}`}>
                <div className="groups-main">
                    <div className="gm-head-c">
                        <h2 className="groups-head">
                            Groups
                        </h2>
                        <div className="expand-i" onClick={expandMore}>
                            {
                                isExpandedg ? <ExpandLessIcon/> : <ExpandMoreIcon/>
                            }
                        </div>
                        <div className="add-new-group-c" onClick={openGrpModal}>
                            <AddCircleOutlineIcon style={{
                                position: "relative",
                                left: "4.5rem",
                                color: "green",
                            }}/>
                        </div>
                    </div>
                    {
                        isExpandedg ? (
                            <div className="gm-b-c">
                                <ul>
                                    {
                                        groups.length > 0 ? (
                                            groups
                                            .map((group) => (
                                                <div key={group.id}>
                                                    <li className="gm-exp-li">
                                                        - {group.group_head}
                                                    </li>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No Groups Available</p>
                                        )
                                    }
                                </ul>
                            </div>
                        ) : ""
                    }
                </div>
                <div className="tasks-main">
                    <div className="tsk-head-c">
                        <h2 className="tasks-head">
                            Tasks
                        </h2>
                        <div className="expand-i" onClick={expandMoret}>
                            {
                                isExpandedt ? <ExpandLessIcon/> : <ExpandMoreIcon/>
                            }
                        </div>
                        <div className="add-new-task-c" onClick={openTaskModal}>
                            <AddCircleOutlineIcon style={{
                                position: "relative",
                                left: "5.5rem",
                                color: "green",
                            }}/>
                        </div>
                    </div>
                    {
                        isExpandedt ? (
                            <div className="gm-b-c">
                                <ul>
                                    {
                                        tasks.length > 0 ? (
                                            tasks.map((task) => (
                                                <div key={task.id}>
                                                    <li className="tsk-exp-li">
                                                        <div className={`status ${getStatusClass(task.status)}`}>
                                                            - {task.task_head}
                                                        </div>
                                                    </li>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-task-available">No Tasks Avilable</p>
                                        )
                                    }
                                </ul>
                            </div>
                        ) : ""
                    }
                </div>
            </div>
            <GroupModal 
                isOpen={isGrpModal}
                onClose={closeGrpModal}
            />
            <TaskModal
                isOpen={isTaskModal}
                onClose={closeTaskModal}
            />
        </section>
    </>
}

export default Sidepanel;