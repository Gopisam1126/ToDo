/* eslint-disable no-unused-vars */
import "../compStyles/sidepanel.css";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
function Sidepanel() {

    const [isExpandedg, setIsExpandedg] = useState(false);
    const [isExpandedt, setIsExpandedt] = useState(false);
    const [isActiveTask, setIsActiveTask] = useState(true);
    const [isOpen, setIsOpen] = useState(true);


    function expandMore() {
        setIsExpandedg(!isExpandedg);
    }

    function expandMoret() {
        setIsExpandedt(!isExpandedt);
    }

    function handleSidepanel() {
        setIsOpen(!isOpen);
    }

    // function setTaskStatus() {
    //     setIsActiveTask(!isActiveTask);
    // }

    return <>
        <section className={`sp-main-sec ${isOpen ? "open" : "close"}`}>
            <div className="sp-main-head">
                {/* <h1>PANEL</h1> */}
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
                        <div className="add-new-group-c">
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
                                    <li className="gm-exp-li">group 1 <span className="num-tsk">(4)</span></li>
                                    <li className="gm-exp-li">group 2 <span className="num-tsk">(6)</span></li>
                                    <li className="gm-exp-li">group 3 <span className="num-tsk">(2)</span></li>
                                    <li className="gm-exp-li">group 4 <span className="num-tsk">(10)</span></li>
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
                        <div className="add-new-task-c">
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
                                    <li className="tsk-exp-li">
                                        Task 1
                                        <span className={`status ${isActiveTask ? "green" : "orange"}`}>
                                            {isActiveTask ? "Active" : "Pending"}
                                        </span>
                                    </li>
                                    <li className="tsk-exp-li">
                                        Task 2
                                        <span className={`status ${isActiveTask ? "green" : "orange"}`}>
                                            {isActiveTask ? "Active" : "Pending"}
                                        </span>
                                    </li>
                                    <li className="tsk-exp-li">
                                        Task 3
                                        <span className={`status ${isActiveTask ? "green" : "orange"}`}>
                                            {isActiveTask ? "Active" : "Pending"}
                                        </span>
                                    </li>
                                    <li className="tsk-exp-li">
                                        Task 4
                                        <span className={`status ${isActiveTask ? "green" : "orange"}`}>
                                            {isActiveTask ? "Active" : "Pending"}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        ) : ""
                    }
                </div>
            </div>
        </section>
    </>
}

export default Sidepanel;