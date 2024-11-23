import Header from "../components/header";
import CreateArea from "../components/createArea";
import Footer from "../components/footer";
import Sidepanel from "../components/sidepanel";
import "../pageStyles/home.css";

function Home() {
    
    return <>
        <section className="home-main-sec">
            <div className="left-main-sec">
                <Sidepanel/>
            </div>
            <div className="home-main-body right-main-sec">
                <Header/>
                <CreateArea/>
                <Footer/>
            </div>
        </section>
    </>
}

export default Home;