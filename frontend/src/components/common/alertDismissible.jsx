import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertDismissible = ({type,message}) => {
    const [show, setShow] = useState(true);

    return (
        <div>
            {show && (
                <Alert variant={type} onClose={() => setShow(false)} dismissible>
                    <p>{message}</p>
                </Alert>
            )}
        </div>
    );
}

export default AlertDismissible;