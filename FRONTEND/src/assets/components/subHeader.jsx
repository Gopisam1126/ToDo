/* eslint-disable react/prop-types */
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import "../compStyles/subHeader.css";
function SubHeader({isGroupView, setGroupView, setTaskView}) {

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
                <div className="filter-c">
                    <FilterAltOutlinedIcon/>
                    <p className="filter-txt">
                        Filter
                    </p>
                </div>
            </div>
            <hr className="sub-h-sep-hr" />
        </section>
    </>
}

export default SubHeader