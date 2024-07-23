import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0 m-0">
      <Header />
      <Footer />
    </Container>
  );
};

export default App;
