import React from 'react'
import { HeaderStyles } from './header.styles'
import LogoImage from "../../assets/Images/Main/logo.png";
import IconsNotifications from '../../assets/icons/header/icons-notification';
import { IconsUser } from '../../assets/icons/Auth/icons-user';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = (props: any) => {
    const location = useLocation().pathname;
    return (
        <div>
            <HeaderStyles>
                {/* <div className="d-flex align-item-center logoSearch">
                    <div><img src={LogoImage} className={"logoImage"} /></div>
                    <div className="searchContainer">
                        <i className="fa fa-search"></i>
                        <input type="search" placeholder="Search ..." />
                    </div>
                </div>
                <div className="d-flex align-item-center flex-container">
                    <div className="notfication-container">
                        <IconsNotifications></IconsNotifications>
                    </div>
                    <div className="user-icon-container">
                        <IconsUser></IconsUser>
                    </div>
                </div> */}


                <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={"navHeader"}>
                    <Navbar.Brand href="#home"><img src={LogoImage} className={"logoImage"} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link > <NavLink to="/page/dashboard" className="item" activeClassName="active" >Dashboard</NavLink> </Nav.Link>

                            <NavDropdown className={`item ${location.includes("teachers") && 'active'}`} title="Teacher" id="collasible-nav-dropdown-teacher">
                                <NavDropdown.Item ><NavLink to="/page/teachers" className="item" activeClassName="active" >Teachers</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/page/teachers" className="item" activeClassName="active" >Add Teacher</NavLink></NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown className={`item ${location.includes("students") && 'active'}`} title="Student" id="collasible-nav-dropdown-stu">
                                <NavDropdown.Item ><NavLink to="/page/students" className="item" activeClassName="active" >Students</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/page/students" className="item" activeClassName="active" >Add Student</NavLink></NavDropdown.Item>
                            </NavDropdown>

                            
                            <Nav.Link className="item" href="#features">Menu Section 02</Nav.Link>
                        </Nav>
                        <Nav className="right-nav">
                            <Nav.Link href="#deets"> <IconsNotifications></IconsNotifications></Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                            <div className="user-icon-container">
                        <IconsUser></IconsUser>
                    </div>

      </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </HeaderStyles>
        </div>
    )
}

export default Header
