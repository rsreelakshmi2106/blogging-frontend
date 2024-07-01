import React, { useEffect, useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import ViewNotification from './ViewNotification';
import { clearNotificationsAPI, getNotificationsAPI } from '../Services/allAPIs';

function Header() {
    const navigate = useNavigate();
    const [token, setToken] = useState(false);
    const [userName, setUserName] = useState('');
    const [openNavText, setOpenNavText] = useState(false);
    const [notifications, setNotifications] = useState([])

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    // const allNotifications = async () => {
    //     const token = sessionStorage.getItem("token");

    //     if (token) {
    //         const reqHeader = {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         };
    //         const result = await getNotificationsAPI(reqHeader)
    //         console.log(result);
    //         setNotifications(result.data)
    //     }
    // }

    // const handleClearNotifications = async () => {
    //     const token = sessionStorage.getItem("token");
    //     if (token) {
    //         const reqHeader = {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         };
    //         try {
    //             await clearNotificationsAPI(reqHeader);
    //             setNotifications([]); // Clear notifications locally
    //         } catch (error) {
    //             console.error("Error clearing notifications:", error);
    //         }
    //     }
    // };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setToken(!!token);
        // allNotifications()
    }, []);

    useEffect(() => {

        const username = sessionStorage.getItem("username");
        if (username === "admin") {
            setUserName(username);
        } else {
            setUserName('');
        }
    }, []);

    return (
        <div className='header'>
            <MDBNavbar expand='lg' sticky bgColor='primary'>
                <MDBContainer fluid>
                    <MDBNavbarBrand className='text-light' href='/home'>BlogSphere</MDBNavbarBrand>
                    <MDBNavbarToggler className='text-light'
                        type='button'
                        data-target='#navbarText'
                        aria-controls='navbarText'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavText(!openNavText)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar open={openNavText}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 justify-content-end'>
                            <MDBNavbarItem>
                                <MDBNavbarLink className='text-light' active aria-current='page' href='/home'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {
                                userName === 'admin' ? (
                                    <>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink className='text-light' active aria-current='page' href='/admin/view-users'>
                                                All Users
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                    </>
                                ) : (
                                    <>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink className='text-light' active aria-current='page' href='/user/home'>
                                                Profile
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink className='text-light' active aria-current='page' href='/user/write'>
                                                Write
                                                {/* <span style={{ fontFamily: 'Poetsen One' }}> Write </span> */}
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <ViewNotification/>
                                        </MDBNavbarItem>
                                    </>
                                )
                            }
                            <MDBNavbarItem>
                                <MDBNavbarLink className='text-light' onClick={handleLogout}>Logout</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}

export default Header;
