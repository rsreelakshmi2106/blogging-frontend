import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/allAPIs'
import './Auth.css'
import Swal from 'sweetalert2'
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse
} from 'mdb-react-ui-kit';

function Auth({ register }) {

    const navigate = useNavigate()

    const [openNavText, setOpenNavText] = useState(false);

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    //REGISTER

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!userData.username || !userData.email || !userData.password) {
            Swal.fire({
                title: 'warning',
                text: "Please fill all the fields",
                icon: 'warning',
                confirmButtonText: 'Back'
            })
        }
        else {
            if (userData.password.length >= 6) {
                const result = await registerAPI(userData)
                console.log(result);
                if (result.status == 200) {
                    Swal.fire({
                        title: 'success',
                        text: "Registration Successful",
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    navigate('/login');
                }
                else {
                    Swal.fire({
                        title: 'error',
                        text: "User Already exists",
                        icon: 'error',
                        confirmButtonText: 'Back'
                    })
                }
            }
            else{
                Swal.fire({
                    title: 'error',
                    text: "Password should have minimum 6 characters",
                    icon: 'error',
                    confirmButtonText: 'Back'
                })
            }

        }
        console.log(userData);
    }


    //LOGIN
    const handleLogin = async (e) => {
        e.preventDefault()
        if (!userData.email || !userData.password) {
            Swal.fire({
                title: 'warning',
                text: "Please fill all details",
                icon: 'warning',
                confirmButtonText: 'Back'
            })
        }
        else {
            const result = await loginAPI(userData)
            console.log(result);
            if (result.status == 200) {
                sessionStorage.setItem('username', result.data.existingUser.username)
                sessionStorage.setItem('token', result.data.token)
                if (result.data.existingUser.userStatus == "Active") {
                    Swal.fire({
                        title: 'success',
                        text: "Login Successful",
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    setUserData({
                        email: "",
                        password: ""
                    })

                    if (result.data.existingUser.username == 'admin') {
                        Swal.fire({
                            title: 'Welcome',
                            text: "Admin",
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        navigate('/home')
                    }
                    else {
                        navigate('/home')
                    }
                }
                else {
                    Swal.fire({
                        title: 'error',
                        text: "Blocked Account",
                        icon: 'error',
                        confirmButtonText: 'Back'
                    })
                    navigate('/')
                }
            }
            else {
                Swal.fire({
                    title: 'error',
                    text: "Wrong Email or Password",
                    icon: 'error',
                    confirmButtonText: 'Back'
                })
            }
        }
        // console.log(userData);
    }

    return (
        <div>
            <MDBNavbar expand='lg' sticky light bgColor='primary'>
                <MDBContainer fluid>
                    <MDBNavbarBrand className='text-light' href='/'>BlogSphere</MDBNavbarBrand>
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
                                <MDBNavbarLink className='text-light' active aria-current='page' href='/user/write'>
                                    Write
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                {/* <Link to={'/login'}> */}
                                <MDBNavbarLink className='text-light' href='/login'>Sign in</MDBNavbarLink>
                                {/* </Link> */}

                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                {/* <Link to={'/register'}> */}
                                <MDBNavbarLink className='text-light' href='/register'>Sign up</MDBNavbarLink>
                                {/* </Link> */}
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>

            <div className="row my-5 mx-0">
                <div className="col-md-8 mx-auto">
                    <div className="container ">
                        <form className='shadow rounded-5 bg-primary text-light'>
                            <h2 className='text-center mb-3'>Welcome</h2>
                            <h4 className='text-center'>
                                {
                                    register ? 'Register Here...' : 'Login Here...'
                                }
                            </h4>
                            <div className='sign-in-up mx-5 px-5 mt-3 '>
                                {
                                    register &&
                                    <input onChange={(e) => setUserData({ ...userData, username: e.target.value })} value={userData.username} className='form-control mb-2' type="text" placeholder='Username' />
                                }
                                <input onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} className='form-control mb-2' type="email" placeholder='email' />
                                <input onChange={(e) => setUserData({ ...userData, password: e.target.value })} value={userData.password} className='form-control mb-2' type="password" placeholder='password' />
                            </div>

                            <div className='text-center'>
                                {
                                    register ?
                                        <div className='text-center m-4'>
                                            <button onClick={handleRegister} className='btn btn-dark m-4'>Register</button>
                                            <p>Already registere? <Link to={'/login'}>Login Here</Link></p>
                                        </div>
                                        :
                                        <div className='text-center m-4'>
                                            <button onClick={handleLogin} className='btn btn-dark m-4'>Login</button>
                                            <p>New to Here? <Link to={'/register'}>Register Here</Link></p>
                                        </div>
                                }
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth