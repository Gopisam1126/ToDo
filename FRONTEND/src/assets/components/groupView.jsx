import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import "../compStyles/groupView.css";
import { useEffect, useState } from 'react';
import axios from "axios";

function GroupView() {
    const [groups, setGroups] = useState([]);
    // console.log(groups.filter(group => group.group_head !== null));
    

    useEffect(() => {
        async function getGroups() {
            try {
                const token = localStorage.getItem('token');
                const grpRes = await axios.get("http://localhost:3000/groupdetails", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGroups(grpRes.data);
            } catch (error) {
                console.log(error);
            }
        }
        getGroups();
    }, []);

    // function to handle deletion of group

    async function handleDelete(groupId) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/groupdetails/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setGroups((prevGrp) => prevGrp.filter(group => group.id !== groupId));
        } catch (error) {
            console.log(error);
        }
    }

    // Function to format timestamp to DD/MM/YYYY
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

    // Function to get the appropriate class for priority
    function getPriorityClass(priority) {
        if (priority === 'Low' || priority === "low") return 'low-priority';
        if (priority === 'Medium' || priority === "medium") return 'medium-priority';
        if (priority === 'High' || priority === "high") return 'high-priority';
        return '';
    }

    return (
        <section className="ca-main-sec">
            <div className="item-grid">
                {
                    groups.length > 0 ? (
                        groups
                        .filter(group => group.group_head !== null)
                        .map((group) => {
                            const { day, month, year } = formatDate(group.group_timestamp);
                            return (
                                <div className='items-c' key={group.id}>
                                    <div className="item-head-c">
                                        <h2 className="grouo-head">
                                            {group.group_head}
                                        </h2>
                                        <div className="add-new-grp-icon">
                                            <AddCircleOutlineIcon />
                                        </div>
                                        <div className="delete-grp-icon" onClick={() => handleDelete(group.id)}>
                                            <DeleteIcon/>
                                        </div>
                                    </div>
                                    <p className="group-desc">
                                        {group.group_desc}
                                    </p>
                                    <div className="progres-head">
                                        <div className="progres-icon">
                                            <FormatListBulletedOutlinedIcon />
                                        </div>
                                        <p className="progres-h-txt">
                                            Progres
                                        </p>
                                        <p className="stat-number">
                                            7/10
                                        </p>
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
                                        <p className="priority">
                                            Priority : 
                                        </p>
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
                    )
                }
            </div>
        </section>
    );
}

export default GroupView;