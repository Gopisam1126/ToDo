import Header from "../components/header";
import CreateArea from "../components/createArea";
import Footer from "../components/footer";
import Sidepanel from "../components/sidepanel";
import SubHeader from "../components/subHeader";
import "../pageStyles/home.css";
import { useState } from "react";
import axios from "axios";

function Home() {

    const [isGroupView, setIsGroupView] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [groups, setGroups] = useState([]);

    function handleGroupView() {
        setIsGroupView(true);
    }

    function handleTaskView() {
        setIsGroupView(false);
    }

    async function handleSearch( term ) {

        try {
            setIsLoading(true)
            const token = localStorage.getItem('token');
            if (isGroupView) {
                const searchRes = await axios.post(
                    `http://localhost:3000/grouplist/search`, 
                    { query: term }, // Send query in the body
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setGroups(searchRes.data);
            } else if (!isGroupView) {
                const searchRes = await axios.post(
                    `http://localhost:3000/tasklist/search`, 
                    { query: term }, // Send query in the body
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTasks(searchRes.data);
            }
        } catch (error) {
            console.log("Error during search : ",error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return <>
        <section className="home-main-sec">
            <div className="left-main-sec">
                <Sidepanel/>
            </div>
            <div className="home-main-body right-main-sec">
                <Header
                    onSearch={handleSearch} 
                    isGroupView={isGroupView} 
                />
                <section className='sub-header-h-sec'>
                    <SubHeader
                        isGroupView={isGroupView}
                        setGroupView={handleGroupView}
                        setTaskView={handleTaskView}
                    />
                </section>
                <CreateArea 
                    isGroupView={isGroupView}
                    handleSearch = {handleSearch}
                    result={isGroupView ? groups : tasks}
                    isLoading={isLoading}
                />
                <Footer/>
            </div>
        </section>
    </>
}

export default Home;