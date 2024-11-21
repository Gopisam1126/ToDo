import "../pageStyles/login.css";
import BadgeIcon from '@mui/icons-material/Badge';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
function Login() {
    const [isVisible, setIsVisible] = useState(false);

    function toggleVisibility() {
        setIsVisible(!isVisible);
    }
    return <>
        <section className="login-main-sec">
            <div className="overlay"></div>
            <div className="form-card">
                <h1 className="login-head">Login</h1>
                <form>
                    {/* <div className="username-c">
                        <div className="first-name-c">
                            <label htmlFor="f-name">First Name <span className="req">*</span></label><br />
                            <input type="text" name="f-name" placeholder="eg: John" />
                        </div>
                        <div className="last-name-c">
                            <label htmlFor="l-name">Last Name <span className="req">*</span></label><br />
                            <input type="text" name="l-name" placeholder="eg: Doe" />
                        </div>
                    </div> */}
                    <div className="input-c">
                        <label htmlFor="username" className="user-n-l login-labels">Username</label><br />
                        <div className="username-i-c">
                            <input type="text" name="username" placeholder="eg: John_Doe" className="username-i login-i" /><BadgeIcon style={{
                                position: "relative",
                                top: "1.5rem",
                                left: "-4.5rem"
                            }}/>
                        </div><br />
                        <label htmlFor="pass" className="pass-l login-labels">Password</label><br />
                        <div className="pass-i-c">
                            <input type={`${isVisible ? 'text' : 'password'}`} name="pass" placeholder="Enter your Password" className="pass-i login-i" />
                            <div className="visibility-icon" onClick={toggleVisibility}>
                                {
                                    isVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="login-btn-c">
                        <input type="submit" value="Login" className="login-btn" />
                        <a href="#" className="fgt-pass">Forgot Password</a>
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
                            Dont Have an Account ?
                        </p>
                        <a href="$" className="l-signup">Sign Up</a>
                    </div>
                </form>
            </div>
        </section>
    </>
}

export default Login;