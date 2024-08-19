import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';

interface ServerStartupToastProps {
    loading: boolean;
}

const ServerStartupToast: React.FC<ServerStartupToastProps> = ({ loading }) => {
    const [show, setShow] = useState(true);
    const [timeLeft, setTimeLeft] = useState(300);


    useEffect(() => {
        if (loading && timeLeft > 0) {
            const intervalId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else if (!loading) {
            setShow(false);
        }
    }, [loading, timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <Toast
            onClose={() => setShow(false)}
            show={show && loading}
            style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#fff' }}
        >
            <Toast.Header>
                <strong className="me-auto">Server Startup</strong>
            </Toast.Header>
            <Toast.Body className='py-2 px-3'>
                <p className='mb-1'>The backend server is starting up, this may take up to 5 minutes. Please wait...</p>
                <p className='text-center font-weight-bold mb-0'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            </Toast.Body>
        </Toast>
    );
};

export default ServerStartupToast;
