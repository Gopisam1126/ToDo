/* eslint-disable react/prop-types */
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import "../compStyles/subHeader.css";
import { useRef, useState } from 'react';
function SubHeader({isGroupView, setGroupView, setTaskView}) {

    const [isExpanded, setIsExpanded] = useState(false);
    const filterDropDown =useRef(null);

    const handleFilterDropDown = () => {
        if (filterDropDown.current) {
            if (isExpanded) {
                filterDropDown.current.style.height = "15rem";
                requestAnimationFrame(() => {
                    filterDropDown.current.style.height = "0";
                });
            } else {
                filterDropDown.current.style.height = "15rem";
                filterDropDown.current.style.overflow = "hidden";
            }
            setIsExpanded(!isExpanded);
        }
    };

    return <>
        <section>
            <div className="sub-h-main-c">
                <div className="group-view-c" onClick={setGroupView}>
                    <div className={`group-view-c ${isGroupView ? "active-view" : ""}`}>
                        <ViewAgendaOutlinedIcon/>
                        <p className="group-v-txt">
                            Group View
                        </p>
                    </div>
                </div>
                <div  className="task-view-c" onClick={setTaskView}>
                    <div className={`group-view-c ${!isGroupView ? "active-view" : ""}`}>
                        <FormatListBulletedOutlinedIcon/>
                        <p className="task-view-txt">
                            Task View
                        </p>
                    </div>
                </div>
                <div className="filter-c" onClick={handleFilterDropDown}>
                    <FilterAltOutlinedIcon/>
                    <p className="filter-txt">
                        Filter
                    </p>
                </div>
            </div>
            <hr className="sub-h-sep-hr" />
        </section>
        <div ref={filterDropDown} className={`f-exp-c ${isExpanded ? "f-expanded" : "f-hide"}`}>
            <div className="f-exp-items">
                <p className="f-exp-i-txt">
                    Pending
                </p>
            </div>
            <div className="f-exp-items">
                <p className="f-exp-i-txt">
                    Completed
                </p>
            </div>
            <div className="f-exp-items">
                <p className="f-exp-i-txt">
                    Past Due
                </p>
            </div>
            <div className="f-exp-items">
                <p className="f-exp-i-txt">
                    High
                </p>
            </div>
            <div className="f-exp-items">
                <p className="f-exp-i-txt">
                    Medium
                </p>
            </div>
            <div className="f-exp-items">
                <p className="f-exp-i-txt">
                    Low
                </p>
            </div>
        </div>
    </>
}

export default SubHeader