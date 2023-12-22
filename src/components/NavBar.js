import React, {useEffect} from 'react';
import styles from '../styles/NavBar.module.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useDropdown from '../hooks/useDropdown';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const { dropdownOpen, handleMouseEnter, handleMouseLeave } = useDropdown();

  useEffect(() => {
    console.log('Current user has changed:', currentUser);
  }, [currentUser]);

  const location = useLocation();

  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString('en-UK', options);
  };

  const isFriendsActive = ['/friends/send-request', '/friends/view-list', '/friends/view-requests'].some(
    (path) => location.pathname.startsWith(path)
  );

  const isProjectsActive = ['/projects', '/projects/create',].some(
    (path) => location.pathname.startsWith(path)
  );

  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/')
      setCurrentUser(null)
    } catch(err){
      console.log(err)
    }
  }

  const loggedInIcons = (
    <>
      <NavDropdown
        title={
          <span
            className={`${styles.navItem} ${
              isProjectsActive ? styles.Active : ""
            }`}
          >
            <i className={`fa-solid fa-file-circle-plus ${styles.icon}`}></i>
            <span className={styles.navText}>Projects</span>
          </span>
        }
        id="project-dropdown"
        show={dropdownOpen === 'project-id'}
        onMouseEnter={() => handleMouseEnter('project-id')}
        onMouseLeave={handleMouseLeave}
      >
        <NavDropdown.Item as={NavLink} to="/projects/create">
          Create Project
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/projects/list">
          My Projects
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown
        title={
          <span
            className={`${styles.navItem} ${
              isFriendsActive ? styles.Active : ""
            }`}
          >
            <i className={`fas fa-user-friends ${styles.icon}`}></i>
            <span className={styles.navText}>Friends</span>
          </span>
        }
        id="friend-dropdown"
        show={dropdownOpen === 'friend-id'}
        onMouseEnter={() => handleMouseEnter('friend-id')}
        onMouseLeave={handleMouseLeave}
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
      <NavLink
        exact
        className={styles.NavLink}
        to="/home"
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out"></i>Sign Out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={{ pathname: `/profiles/${currentUser?.id}`, state: {profileData: currentUser}}}
      >
        <Avatar src={currentUser?.image || currentUser?.profile_image || ""} text={currentUser?.username} height={40} />
      </NavLink>
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
    <Navbar expanded={expanded} className={styles.NavBar} collapseOnSelect expand="xl">
      <NavLink to="/">
        <Navbar.Brand className={styles.Title}>Forget Me Not</Navbar.Brand>
      </NavLink>
      <span>{getCurrentDate()}</span>
      <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
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