/* eslint-disable react/prop-types */
import "../compStyles/CreateArea.css";
import GroupView from "../components/groupView";
import TaskView from "../components/taskView";

function CreateArea({isGroupView, handleSearch, tasks, isLoading}) {
    // console.log("CA - handle Search : ", handleSearch);
    console.log("CA - Tasks : ", tasks);
    console.log("CA - isLoading : ", isLoading);
    
    return <>
        <div>
            {
                isGroupView ? 
                    <GroupView/> 
                : 
                    <TaskView
                        handleSearch={handleSearch}
                        tasks={tasks}
                        isLoading={isLoading}
                    />
            }
        </div>
    </>
}

export default CreateArea;
