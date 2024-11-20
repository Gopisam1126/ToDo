import Header from "../components/header";
import CreateArea from "../components/createArea";
import Footer from "../components/footer";

function Home() {
    console.log("Home Component Rendered!!!");
    
    return <>
        <section>
            <Header/>
            <CreateArea/>
            <Footer/>
        </section>
    </>
}

export default Home;