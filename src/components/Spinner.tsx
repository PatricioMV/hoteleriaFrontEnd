import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner: React.FC = () => (
    <div className="spinner-container">
        <BootstrapSpinner animation="border" role="status">
            <span className="sr-only"></span>
        </BootstrapSpinner>
    </div>
);

export default Spinner;
