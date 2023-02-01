import React from 'react'
import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate} from 'react-router-dom'
const Header = () => {
  let navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/")
  }
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect fixed="top">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Hotel Booking</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-end w-100">
            {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header