/* eslint-disable react/prop-types */
import "../compStyles/CreateArea.css";
import GroupView from "../components/groupView";
import TaskView from "../components/taskView";

function CreateArea({isGroupView, handleSearch, result, isLoading}) {
    
    return <>
        <div>
            {
                isGroupView ? 
                    <GroupView
                        handleSearch={handleSearch}
                        groups={result}
                        isLoading={isLoading}
                    /> 
                : 
                    <TaskView
                        handleSearch={handleSearch}
                        tasks={result}
                        isLoading={isLoading}
                    />
            }
        </div>
    </>
}

export default CreateArea;
