import React, { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import styled from 'styled-components';
import { getNotifications } from '../services/fakeNotificationsSerivice';

const Container = styled.div`
    position: relative;
`;

const NotificationsContainer = styled.div`
    background-image: linear-gradient(to bottom, #ffffff, #f9f9f9);
    width: 45vw;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 100000;
    display: ${({ $bellIcon }) => ($bellIcon ? 'block' : 'none')};
    max-width: 400px;
    overflow-y: auto;
    max-height: 300px;

    @media (min-width: 768px) {
        max-width: 400px;
    }

    @media (min-width: 1024px) {
        max-width: 600px;
    }

    @media (min-width: 1440px) {
        max-width: 800px;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }

    p {
        margin: 8px 0; /* Added margin to separate notifications */
    }
`;

const BellIcon = styled(FaBell)`
    position: relative;
    z-index: 1;
`;

const NotificationBell = () => {
    const [bellIcon, setBellIcon] = useState(false);
    const notificationsRef = useRef(null);

    const showBellIcon = (event) => {
        event.stopPropagation();
        setBellIcon(!bellIcon);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setBellIcon(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const notificationList = getNotifications();

    return (
        <Container>
            <BellIcon onClick={showBellIcon} size={24} />
            <NotificationsContainer $bellIcon={bellIcon} ref={notificationsRef}>
                {notificationList.map((notification, index) => (
                    <p key={index}>{notification}</p>
                ))}
            </NotificationsContainer>
        </Container>
    );
};

export default NotificationBell;