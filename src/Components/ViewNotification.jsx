import React, { useEffect, useState } from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import { clearNotificationsAPI, getNotificationsAPI } from '../Services/allAPIs';

function ViewNotification() {
    const [notifications, setNotifications] = useState([]);
    const [token, setToken] = useState(false);

    const allNotifications = async () => {
        const token = sessionStorage.getItem("token");

        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await getNotificationsAPI(reqHeader);
                console.log(result);
                setNotifications(result.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
    }

    const handleClearNotifications = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            try {
                setNotifications([]);
                const result = await clearNotificationsAPI(reqHeader);
                console.log(result);
                allNotifications()
                // Clear notifications locally
            } catch (error) {
                console.error("Error clearing notifications:", error);
            }
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setToken(!!token);
        if (token) {
            allNotifications();
        }
    }, []);

    return (
        <div>
            <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                    <i className='fa-solid fa-bell text-light'> &nbsp;{notifications.length}</i>
                </MDBDropdownToggle>
                <MDBDropdownMenu className='p-4 text-muted' style={{ width: '250px' }} >
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <p >{notification}</p>
                        ))
                    ) : (
                        <p>No notifications</p>
                    )}

                    <button onClick={handleClearNotifications} className='btn btn-link' >Clear All</button>

                </MDBDropdownMenu>
            </MDBDropdown>
        </div>
    )
}

export default ViewNotification;
