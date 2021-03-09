import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component{

    render(){
        return(
            <nav className="nav">
                <ul>
                    <div className="links">
                        <li>
                            <Link to="/">
                                <img src="https://img.icons8.com/ultraviolet/40/000000/synagogue.png"/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Calendar">Calendar</Link>
                        </li>
                        <li>
                            <Link to="/Announcements">Announcements</Link>
                        </li>
                        <li>
                            <Link to="/Seating">Seating Chart</Link>
                        </li>
                    </div>
                    <li>
                        <Link to="/Login">Log In</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav;