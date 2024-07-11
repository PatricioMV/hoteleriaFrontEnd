import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Col } from 'react-bootstrap';
import Home from '../components/Home';
import Reservations from '../components/Reservations';
import HotelManagment from './HotelManagement';

function Header() {
  return (
    <Col>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Stanley Hotel
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/reservations">
                  Reservations
                </Nav.Link>
                <Nav.Link as={Link} to="/hotel">
                  Hotel
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/hotel" element={<HotelManagment />} />
          </Routes>
        </Container>
      </Router>
    </Col>
  );
}

export default Header;
