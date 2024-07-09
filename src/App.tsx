import React from 'react';
import AppRouter from './router/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Footer />
    </div>
  );
};

export default App;
