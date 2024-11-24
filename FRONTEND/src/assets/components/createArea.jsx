import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import "../compStyles/CreateArea.css"

function CreateArea() {
    return <>
        <section className="ca-main-sec">
            <div className="item-grid">
                <div className="items-c">
                    <div className="item-head-c">
                        <h2 className="grouo-head">
                            Design a Social media app
                        </h2>
                        <div className="add-new-grp-icon">
                            <AddCircleOutlineIcon/>
                        </div>
                    </div>
                    <p className="group-desc">
                        design and create a social media app similar to instagram
                    </p>
                    <div className="progres-head">
                        <div className="progres-icon">
                            <FormatListBulletedOutlinedIcon/>
                        </div>
                        <p className="progres-h-txt">
                            Progres
                        </p>
                        <p className="stat-number">
                            7/10
                        </p>
                    </div>
                    <div className="progres-bar-c">
                        <div className="progres-bg">
                            <div className="progres-overlay"></div>
                        </div>
                    </div>
                    <div className="created-timestamp-c">
                        <div className="created-date">
                            <p className="date">23</p>
                            <p className="month">Nov</p>
                            <p className="year">2024</p>
                        </div>
                        <div className="grp-priority-c">
                            <p className="grp-priority-m">
                                Medium
                            </p>
                        </div>
                    </div>
                </div>

                {/* --------------------- item 2 demo ---------------------------- */}

                {/* <div className="items-c">
                    <div className="item-head-c">
                        <h2 className="grouo-head">
                            Set up Backend for Chat App
                        </h2>
                        <div className="add-new-grp-icon">
                            <AddCircleOutlineIcon/>
                        </div>
                    </div>
                    <p className="group-desc">
                        Handle the backend for the chat app and create database
                    </p>
                    <div className="progres-head">
                        <div className="progres-icon">
                            <FormatListBulletedOutlinedIcon/>
                        </div>
                        <p className="progres-h-txt">
                            Progres
                        </p>
                        <p className="stat-number">
                            2/12
                        </p>
                    </div>
                    <div className="progres-bar-c">
                        <div className="progres-bg">
                            <div className="progres-overlay"></div>
                        </div>
                    </div>
                    <div className="created-timestamp-c">
                        <div className="created-date">
                            <p className="date">23</p>
                            <p className="month">Nov</p>
                            <p className="year">2024</p>
                        </div>
                        <div className="grp-priority-c">
                            <p className="grp-priority-h">
                                High
                            </p>
                        </div>
                    </div>
                </div> */}

                {/* -------------------- item 2 demo end ------------------------ */}


                {/* <div className="items-c">
                    <div className="item-head-c">
                        <h2 className="grouo-head">
                            Learn and Develop Three.js App
                        </h2>
                        <div className="add-new-grp-icon">
                            <AddCircleOutlineIcon/>
                        </div>
                    </div>
                    <p className="group-desc">
                        Develop a 3D webpage with Three.js and GSAP. Try Framer too.
                    </p>
                    <div className="progres-head">
                        <div className="progres-icon">
                            <FormatListBulletedOutlinedIcon/>
                        </div>
                        <p className="progres-h-txt">
                            Progres
                        </p>
                        <p className="stat-number">
                            6/15
                        </p>
                    </div>
                    <div className="progres-bar-c">
                        <div className="progres-bg">
                            <div className="progres-overlay"></div>
                        </div>
                    </div>
                    <div className="created-timestamp-c">
                        <div className="created-date">
                            <p className="date">23</p>
                            <p className="month">Nov</p>
                            <p className="year">2024</p>
                        </div>
                        <div className="grp-priority-c">
                            <p className="grp-priority-h">
                                High
                            </p>
                        </div>
                    </div>
                </div> */}


            </div>
        </section>
    </>
}

export default CreateArea;