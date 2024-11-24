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
                            <p className="grp-priority">
                                High
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default CreateArea;