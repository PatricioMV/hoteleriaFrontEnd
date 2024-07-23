import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from '../components/Home';
//import Payments from '../components/Payments';
import Reservations from '../components/Reservations';

function AppRouter() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Hotel Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/payments">
                Payments
              </Nav.Link>
              <Nav.Link as={Link} to="/reservations">
                Reservations
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payments" element />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default AppRouter;
