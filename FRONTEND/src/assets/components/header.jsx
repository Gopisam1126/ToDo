/* eslint-disable no-unused-vars */
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "../compStyles/header.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import SubHeader from './subHeader';
function Header() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [isExpAcc, setIsExpAcc] = useState(false);
    const [username, setUsername] = useState("");

    function handleAccDropDown() {
        setIsExpAcc(!isExpAcc);
    }

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
                    Welcome
                    <span> {username || "Loading..."} 👋</span>
                </h2>
            </div>
            {/* <div className="right-items">

            </div> */}
            <div className="searchbar-c">
                <input type="search" name="search" id="search" className="searchbar" placeholder="Search" autoComplete='off' />
                <div className="search-icon-c">
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
        <section className='sub-header-h-sec'>
            <SubHeader/>
        </section>
    </>
}

export default Header;