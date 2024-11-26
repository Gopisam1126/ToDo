/* eslint-disable react/prop-types */
import "../compStyles/CreateArea.css";
import GroupView from "../components/groupView";
import TaskView from "../components/taskView";

function CreateArea({isGroupView}) {
    return <>
        <div>
            {
                isGroupView ? <GroupView/> : <TaskView/>
            }
        </div>
    </>
}

export default CreateArea;
