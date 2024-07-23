import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/stanley-hotel-logo.png'

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center footer">
      <Container>
        <Row>
          <Col md="4">
            <h5>Technologies Used</h5>
            <p><strong>Backend:</strong> Java, Spring Boot, SQL</p>
            <p><strong>Frontend:</strong> TypeScript, React</p>
          </Col>
          <Col md="4">
            <img src={logo} alt="Hotel Logo" className='logo' />
          </Col>
          <Col md="4">
            <h5>Contact Information</h5>
            <p>Email: <a href="mailto:patriciovillagra94@gmail.com" className="text-white">patriciovillagra94@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/PatricioMV" target="_blank" rel="noopener noreferrer" className="text-white">PatricioMV</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/patriciomvillagra/" target="_blank" rel="noopener noreferrer" className="text-white">Patricio Villagra</a></p>
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
