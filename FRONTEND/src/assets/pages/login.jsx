import "../pageStyles/login.css";
import BadgeIcon from '@mui/icons-material/Badge';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [isVisible, setIsVisible] = useState(false);

    function handleInputChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key])
        });

        try {
            const response = await axios.post("http://localhost:3000/login", data, {
                'Content-Type': 'application/json',
            });
            console.log(response);
            if (response.status === 200) {
                navigate(response.data.redirectUrl);
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data || "An error occurred")
        }

    }

    function toggleVisibility() {
        setIsVisible(!isVisible);
    }

    return <>
        <section className="login-main-sec">
            <div className="overlay"></div>
            <div className="form-card">
                <h1 className="login-head">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-c">
                        <label htmlFor="username" className="user-n-l login-labels">Username</label><br />
                        <div className="username-i-c">
                            <input type="text" name="username" placeholder="eg: John_Doe" className="username-i login-i" autoComplete="off" required onChange={handleInputChange} /><BadgeIcon style={{
                                position: "relative",
                                top: "1.5rem",
                                left: "-4.5rem"
                            }}/>
                        </div><br />
                        <label htmlFor="pass" className="pass-l login-labels">Password</label><br />
                        <div className="pass-i-c">
                            <input type={`${isVisible ? 'text' : 'password'}`} name="pass" placeholder="Enter your Password" className="pass-i login-i" required onChange={handleInputChange} />
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