import { NavLink } from 'react-router-dom'
import React from 'react';
import './navbar.css'
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

function NavBar() {
    const [click, setClick] = React.useState(false);
  
    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);
    
    return (
        <div className={click ? "main-container" : ""} onClick={()=>Close()}>
          <nav className="navbar" onClick={(e)=>e.stopPropagation()}>
            <div className="nav-container">
              <NavLink to="/" className="nav-logo">
                Meeting System
                <i className="fa fa-code"></i>
              </NavLink>
    
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink
                    to="/home"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                  {/* color: '#42df7e' */}
                  <HomeIcon style = {{color: 'black', marginRight: '10px'}}/>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/filemanage"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                  <SettingsIcon style = {{color: 'black', marginRight: '10px'}}/>
                    FileManagemet
                  </NavLink>
                </li>
              </ul>
              <div className="nav-icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
              </div>
            </div>
          </nav>
        </div>
    );
  }
export default NavBar;