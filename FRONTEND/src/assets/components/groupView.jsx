/* eslint-disable react/prop-types */
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupEditModal from './grpEditModal';
import AddTasktoGrp from './addTasktoGrp';
import "../compStyles/groupView.css";
import { useEffect, useState, useCallback } from 'react';
import axios from "axios";

function GroupView({ groups: searchGroups, isLoading }) {
    const [defaultGroups, setDefaultGroups] = useState([]);
    const [isGrpModal, setIsGrpModal] = useState(false);
    const [isAddtoGrp, setIsAddtoGrp] = useState(false);
    const [selGroupId, setSelGroupId] = useState(null);
    const [group, setGroup] = useState([]);

    // Fetch all groups on component mount
    useEffect(() => {
        async function getGroups() {
            try {
                const token = localStorage.getItem('token');
                const grpRes = await axios.get("http://localhost:3000/groupdetails", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDefaultGroups(grpRes.data);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        }
        getGroups();
    }, []);

    // Handle delete group
    async function handleDelete(groupId) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/groupdetails/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Remove deleted group from local state
            setDefaultGroups((prevGroups) => prevGroups.filter(group => group.id !== groupId));
        } catch (error) {
            console.error("Error deleting group:", error);
        }
    }

    async function getGroupsById(groupId) {
        try {
            const token = localStorage.getItem('token');
            const getGrp = await axios.get(`http://localhost:3000/get-group/${groupId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setGroup(getGrp.data);
        } catch (error) {
            console.log("Error fetching group.",error);
        }
    }

    const handleEditAction = (groupId) => {
        setIsGrpModal(true);
        getGroupsById(groupId)
    }

    function closeGrpModal() {
        setIsGrpModal(false);
    }


    const openAddtoGrp = useCallback((groupId) => {
        if (selGroupId !== groupId) {
            setSelGroupId(groupId);
        }
        setIsAddtoGrp(true);
    }, [selGroupId]);

    const closeAddtoGrp = useCallback(() => {
        setIsAddtoGrp(false);
        setSelGroupId(null);
    }, []);


    // Format date
    function formatDate(timestamp) {
        if (!timestamp) return { day: '', month: '', year: '' };
        const validTimestamp = timestamp.replace(" ", "T");
        const date = new Date(validTimestamp);
        if (isNaN(date)) return { day: '', month: '', year: '' };

        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return { day, month, year };
    }

    // Get the appropriate class for priority
    function getPriorityClass(priority) {
        if (priority === 'Low' || priority === "low") return 'low-priority';
        if (priority === 'Medium' || priority === "medium") return 'medium-priority';
        if (priority === 'High' || priority === "high") return 'high-priority';
        return '';
    }

    // Determine which groups to display
    const displayGroups = searchGroups && searchGroups.length > 0 ? searchGroups : defaultGroups;

    return (
        <section className="ca-main-sec">
            <div className="item-grid">
                {isLoading ? (
                    <p>Loading groups...</p>
                ) : displayGroups.length > 0 ? (
                    displayGroups
                        .filter(group => group.group_head !== null)
                        .map((group) => {
                            const { day, month, year } = formatDate(group.group_timestamp);
                            return (
                                <div className="items-c" key={group.id}>
                                    <div className="item-head-c">
                                        <h2 className="grouo-head">{group.group_head}</h2>
                                        <div className="edit-icon-c" onClick={() => handleEditAction(group.id)}>
                                            <EditIcon/>
                                        </div>
                                        <div className="add-new-grp-icon" onClick={() => openAddtoGrp(group.id)}>
                                            <AddCircleOutlineIcon />
                                        </div>
                                        <div
                                            className="delete-grp-icon"
                                            onClick={() => handleDelete(group.id)}
                                        >
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                    <p className="group-desc">{group.group_desc}</p>
                                    <div className="progres-head">
                                        <div className="progres-icon">
                                            <FormatListBulletedOutlinedIcon />
                                        </div>
                                        <p className="progres-h-txt">Progress</p>
                                        <p className="stat-number">7/10</p>
                                    </div>
                                    <div className="progres-bar-c">
                                        <div className="progres-bg">
                                            <div className="progres-overlay"></div>
                                        </div>
                                    </div>
                                    <div className="created-timestamp-c">
                                        <div className="created-date">
                                            <p className="date">{day}</p>
                                            <p className="month">{month}</p>
                                            <p className="year">{year}</p>
                                        </div>
                                        <p className="priority">Priority:</p>
                                        <div className="grp-priority-c">
                                            <p className={`${getPriorityClass(group.group_priority)}`}>
                                                {group.group_priority}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                ) : (
                    <p>No Groups Available</p>
                )}
            </div>
            <GroupEditModal
                isOpen={isGrpModal}
                onClose={closeGrpModal}
                group={group}
            />
            <AddTasktoGrp
                isOpen={isAddtoGrp}
                groupId={selGroupId}
                onClose={closeAddtoGrp}
            />
        </section>
    );
}

export default GroupView;
