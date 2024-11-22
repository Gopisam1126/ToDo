import BadgeIcon from '@mui/icons-material/Badge';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import {  Link } from "react-router-dom";
import axios from "axios";
import "../pageStyles/register.css";

function Register() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        setusername: "",
        setpass: ""
    })

    const [isVisible, setIsVisible] = useState(false);
    const [isVisiblec, setIsVisiblec] = useState(false);

    function handleInputChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    
    function toggleVisibility() {
        setIsVisible(!isVisible);
    }
    function ctoggleVisibility() {
        setIsVisiblec(!isVisiblec);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const rdata = new FormData();
        Object.keys(formData).forEach((key) => {
            rdata.append(key, formData[key]);
        });

        console.log(formData);

        try {
            const res = await axios.post("http://localhost:3000/register", rdata, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <section className="login-main-sec">
            <div className="overlay"></div>
            <div className="r-form-card">
                <h1 className="signup-head">Create new User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-c">
                        <div className="f-l-name-c">
                            <div>
                                <label htmlFor="firstname" className="first-name login-labels">Firstname</label><br />
                                <div className="firstname-i-c">

                                    {/* input 1 - firstname */}

                                    <input type="text" name="firstname" placeholder="eg: John" className="firstname-i login-i" autoComplete="off" required onChange={handleInputChange} /><BadgeIcon style={{
                                        position: "relative",
                                        top: "1.1rem",
                                        left: "-4.5rem"
                                    }}/>

                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastname" className="last-name login-labels">Lastname</label><br />
                                <div className="lastname-i-c">

                                    {/* input 2 - lastname */}

                                    <input type="text" name="lastname" placeholder="eg: Doe" className="lastname-i login-i" autoComplete="off" required onChange={handleInputChange} /><BadgeIcon style={{
                                        position: "relative",
                                        top: "1.1rem",
                                        left: "-4.5rem"
                                    }}/>

                                </div>
                            </div>
                        </div>
                        {/* <br /> */}
                        <div className="username">
                            <label htmlFor="setusername" className="last-name login-labels">username</label><br />
                            <div className="username-i-c">

                                {/* input 3 - set username */}

                                <input type="text" name="setusername" placeholder="eg: John_Doe123" className="username-i login-i" autoComplete="off" required onChange={handleInputChange} /><BadgeIcon style={{
                                    position: "relative",
                                    top: "1.1rem",
                                    left: "-4.5rem"
                                }}/>

                            </div>
                        </div>
                        <label htmlFor="setpass" className="set-pass-l login-labels">Create Password</label><br />
                        <div className="pass-i-c">

                            {/* input 4 - set password */}

                            <input type={`${isVisible ? 'text' : 'password'}`} name="setpass" placeholder="Enter new Password" className="set-pass-i login-i" required onChange={handleInputChange} />
                            <div className="visibility-icon" onClick={toggleVisibility}>
                                {
                                    isVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>
                                }
                            </div>
                        </div>
                        <label htmlFor="confirmpass" className="confirm-pass-l login-labels">Confirm Password</label><br />
                        <div className="pass-i-c">

                            {/* input 5 - confirm password */}

                            <input type={`${isVisiblec ? 'text' : 'password'}`} name="confirmpass" placeholder="Enter new Password again" className="confirm-pass-i login-i" required onChange={handleInputChange} />
                            <div className="visibility-icon" onClick={ctoggleVisibility}>
                                {
                                    isVisiblec ? <VisibilityIcon/> : <VisibilityOffIcon/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="login-btn-c">
                        <input type="submit" value="Sign Up" className="login-btn" />
                    </div>
                    <hr className="sep-hr" />
                    <div className="login-with-c">
                        <div className="google-l">
                            <img src="\images\search.png" alt="google-login-icon" className="google-login-icon login-w-i" />
                            <p className="google-login-t">Google</p>
                        </div>
                        <div className="fb-l">
                            <img src="\images\facebook.png" alt="fb-icon" className="fb-login-icon login-w-i" />
                            <p className="fb-login-t">Facebook</p>
                        </div>
                    </div>
                    <div className="create-acc-c">
                        <p className="create-acc-desc">
                            Already Have an Account ?
                        </p>
                        <Link to={"/"} className="l-signup">Login</Link>
                    </div>
                </form>
            </div>
        </section>
    </>
}

export default Register;