import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center fixed-bottom" >
      <Container>
        <Row>
          <Col md="4">
            <h5>Stanley Hotel</h5>
            <p>Your comfort is our priority.</p>
          </Col>
          <Col md="4">
            <h5>Contact Information</h5>
            <p>Email: <a href="mailto:patriciovillagra94@gmail.com" className="text-white">patriciovillagra94@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/PatricioMV" target="_blank" rel="noopener noreferrer" className="text-white">PatricioMV</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/patriciomvillagra/" target="_blank" rel="noopener noreferrer" className="text-white">Patricio Villagra</a></p>
          </Col>
          <Col md="4">
            <h5>Useful Links</h5>
            <p><a href="/reservations" className="text-white">Reservations</a></p>
            <p><a href="/terms" className="text-white">Terms and Conditions</a></p>
            <p><a href="/privacy" className="text-white">Privacy Policy</a></p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p>© {new Date().getFullYear()} Stanley Hotel. All rights reserved. (Just kidding, feel free to copy!)</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
