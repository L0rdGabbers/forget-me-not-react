// NavBar.js
// This component represents the application's navigation bar, which includes links to various pages
// and user-related actions like signing in, signing out, and accessing user profile information.
import React, { useEffect } from 'react';
import styles from '../styles/NavBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useLocation } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useDropdown from '../hooks/useDropdown';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Checks to see if the Navbar is expanded or not.
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Allows for Projects and Friends' Dropdown Navlink to function by hovering the mouse over the element.
  const {
    friendDropdownOpen,
    projectDropdownOpen,
    handleMouseEnter,
    handleMouseLeave,
  } = useDropdown();

  const location = useLocation();

  // Gets the current date.
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString('en-UK', options);
  };

  // Checks to see if the user is on any of the friends pages to activate the nav icon's active state.
  const isFriendsActive = ['/friends/send-request', '/friends/view-list', '/friends/view-requests'].some(
    (path) => location.pathname.startsWith(path)
  );

  // Checks to see if the user is on any of the projects pages to activate the nav icon's active state.
  const isProjectsActive = ['/projects', '/projects/create'].some(
    (path) => location.pathname.startsWith(path)
  );

  // Allows the user to sign out.
  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.error(err);
    }
  };

  // The Navlinks that display when the user is logged in.
  const loggedInIcons = (
    <>
      <NavDropdown
        title={
          <span
            className={`${styles.navItem} ${isProjectsActive ? styles.Active : ''}`}
          >
            <i className={`fa-solid fa-file-circle-plus ${styles.icon}`}></i>
            <span className={styles.navText}>Projects</span>
          </span>
        }
        id="project-dropdown"
        show={projectDropdownOpen === 'project-id' || expanded}
        onMouseEnter={() => handleMouseEnter('project-id')}
        onMouseLeave={() => handleMouseLeave()}
      >
        <NavDropdown.Item as={NavLink} to="/projects/create">
          Create Project
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/projects/list">
          My Projects
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/projects/completed">
          Completed Projects
        </NavDropdown.Item>
      </NavDropdown>

      <NavDropdown
        title={
          <span
            className={`${styles.navItem} ${isFriendsActive ? styles.Active : ''}`}
          >
            <i className={`fas fa-user-friends ${styles.icon}`}></i>
            <span className={styles.navText}>Friends</span>
          </span>
        }
        id="friend-dropdown"
        show={friendDropdownOpen === 'friend-id' || expanded}
        onMouseEnter={() => handleMouseEnter('friend-id')}
        onMouseLeave={() => handleMouseLeave()}
      >
        <NavDropdown.Item as={NavLink} to="/friends/create">
          Add Friend
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/friends/list">
          Friend List
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/friends/requests">
          Friend Requests
        </NavDropdown.Item>
      </NavDropdown>

      <NavLink exact className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out"></i>Sign Out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={{ pathname: `/myprofile/`, state: { profileData: currentUser } }}
      >
        <Avatar
          src={currentUser?.image || currentUser?.profile_image || ''}
          text={currentUser?.username}
          height={40}
        />
      </NavLink>
    </>
  );

  // The Navlinks that are displayed when the user is logged out.
  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
        <i className="fas fa-sign-in"></i> Sign Up
      </NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
        <i className="fas fa-user-plus"></i> Sign In
      </NavLink>
    </>
  );

  // Renders a Navbar across all pages.
  return (
    <Navbar expanded={expanded} className={styles.NavBar} collapseOnSelect expand="xl">
      <NavLink to="/">
        <Navbar.Brand className={styles.Title}>Forget Me Not</Navbar.Brand>
      </NavLink>
      <span>{getCurrentDate()}</span>
      <Navbar.Toggle
        ref={ref}
        onClick={() => {
          setExpanded((prevExpanded) => !prevExpanded);
        }}
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
            <i className="fas fa-home"></i> Home
          </NavLink>
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
