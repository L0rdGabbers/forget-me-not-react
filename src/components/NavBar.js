import React from 'react';
import styles from '../styles/NavBar.module.css'
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const loggedInIcons = <>{currentUser?.username}</>;
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