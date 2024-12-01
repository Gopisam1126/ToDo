/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import "../compStyles/header.css"
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
function Header({onSearch}) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [isExpAcc, setIsExpAcc] = useState(false);
    const [username, setUsername] = useState("");
    const dropdownRef = useRef(null);
    const [term, setTerm] = useState('');
    // console.log("Header c - onSearch", onSearch);
    
    

    function handleChange(e) {
        setTerm(e.target.value);
    }
    
    function handleSearch() {
        if (term.trim()) {
            console.log("Search for : ",term);
            onSearch(term);
        }
    }

    const handleAccDropDown = () => {
        if (dropdownRef.current) {
            if (isExpAcc) {
                dropdownRef.current.style.height = "11rem";
                requestAnimationFrame(() => {
                    dropdownRef.current.style.height = "0";
                });
            } else {
                dropdownRef.current.style.height = "11rem";
                dropdownRef.current.style.overflow = "hidden";
            }
            setIsExpAcc(!isExpAcc);
        }
    };
    

    useEffect(() => {
        async function getUsername() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:3000/getuser", {
                    headers: { Authorization: `Bearer ${token}` }, // Send the token in the request header
                });
                setUsername(response.data.username); // Set the fetched username
            } catch (error) {
                console.log("Error getting username:", error);
            }
        }
        getUsername();
    }, []);

    return <>
        <section className="header-main-sec">
            <div className="welcome-main">
                <h2 className="welcome-head">
                    {
                        username ? "Welcome" : ""
                    }
                    <span> {username || "Session Timedout Please Login again"} 👋</span>
                </h2>
            </div>
            <div className="searchbar-c">
                <input
                    type="search"
                    name="search"
                    id="search"
                    className="searchbar"
                    placeholder="Search"
                    autoComplete='off'
                    value={term}
                    onChange={handleChange}    
                />
                <div className="search-icon-c" onClick={handleSearch}>
                    <SearchIcon/>
                </div>
            </div>
            <div className="current-date-c">
                <div className="calendar-icon-c">
                    <CalendarMonthIcon/>
                </div>
                <p className="date">{currentDate.getDate()}</p>
                <p className="month">{currentDate.toLocaleString("default", {month: "short"})}</p>
                <p className="year">{currentDate.getFullYear()}</p>
            </div>
            <div className="prifile-c" onClick={handleAccDropDown}>
                <AccountCircleIcon style={{
                    fontSize: "2.3rem"
                }}/>
                {
                    isExpAcc ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>
                }
            </div>
        </section>
        <div ref={dropdownRef} className={`acc-exp-c ${isExpAcc ? "acc-expanded" : "acc-hide"}`}>
            <div className="acc-exp-items">
                <PersonIcon/>
                <p className="acc-exp-i-txt">
                    Profile
                </p>
            </div>
            <div className="acc-exp-items">
                <GroupIcon/>
                <p className="acc-exp-i-txt">
                    Your Groups
                </p>
            </div>
            <div className="acc-exp-items">
                <AssignmentIcon/>
                <p className="acc-exp-i-txt">
                    Your Tasks
                </p>
            </div>
            <div className="acc-exp-items">
                <LogoutIcon/>
                <p className="acc-exp-i-txt">
                    Log out
                </p>
            </div>
        </div>
    </>
}

export default Header;