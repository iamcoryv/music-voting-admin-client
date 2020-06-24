import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown title="My Account" id="basic-nav-dropdown">
      <NavDropdown.Item href="#change-password"><Nav.Link href="#change-password">Change Password</Nav.Link></NavDropdown.Item>
      <NavDropdown.Item href="#sign-out"><Nav.Link href="#sign-out">Sign Out</Nav.Link></NavDropdown.Item>
      <NavDropdown.Item href="#sign-up"><Nav.Link href="#sign-up">Sign Up</Nav.Link></NavDropdown.Item>
    </NavDropdown>
    <Nav.Link href="#Votes">Votes</Nav.Link>
    <Nav.Link href="#updatealbums">Update Albums</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>

  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">
      capstone-project-client
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
