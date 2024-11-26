import Header from "../components/header";
import CreateArea from "../components/createArea";
import Footer from "../components/footer";
import Sidepanel from "../components/sidepanel";
import SubHeader from "../components/subHeader";
import "../pageStyles/home.css";
import { useState } from "react";

function Home() {

    const [isGroupView, setIsGroupView] = useState(true);

    function handleGroupView() {
        setIsGroupView(true);
    }

    function handleTaskView() {
        setIsGroupView(false);
    }
    
    return <>
        <section className="home-main-sec">
            <div className="left-main-sec">
                <Sidepanel/>
            </div>
            <div className="home-main-body right-main-sec">
                <Header/>
                <section className='sub-header-h-sec'>
                    <SubHeader
                        isGroupView={isGroupView}
                        setGroupView={handleGroupView}
                        setTaskView={handleTaskView}
                    />
                </section>
                <CreateArea isGroupView={isGroupView}/>
                <Footer/>
            </div>
        </section>
    </>
}

export default Home;