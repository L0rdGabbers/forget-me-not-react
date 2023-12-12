import React from 'react';
import styles from '../styles/NavBar.module.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const location = useLocation();

  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString('en-UK', options);
  };

  const isFriendsActive = ['/friends/send-request', '/friends/view-list', '/friends/view-requests'].some(
    (path) => location.pathname.startsWith(path)
  );

  const addPostIcon = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/projects/create"
      >
        <i className="fa-solid fa-file-circle-plus"></i> Create Project
      </NavLink>
    </>
  );
  const loggedInIcons = (
    <>
      <NavDropdown title={<i className={`fas fa-user-friends ${isFriendsActive ? styles.Active : ''}`}></i>} id="basic-nav-dropdown">
        <NavDropdown.Item as={NavLink} to="/friends/send-request">
          Add Friend
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/friends/view-list">
          Friend List
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/friends/view-requests">
          Friend Requests
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-sign-in"></i> Sign Up
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-user-plus"></i> Sign In
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} collapseOnSelect expand="lg">
      <NavLink to="/">
        <Navbar.Brand className={styles.Title}>Forget Me Not</Navbar.Brand>
      </NavLink>
      <span>{getCurrentDate()}</span>
      {currentUser && addPostIcon}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
            <i className='fas fa-home'></i> Home
          </NavLink>
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar