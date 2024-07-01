import React, { useEffect, useState } from 'react'
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { getLoginIdAPI, updateProfileAPI } from '../Services/allAPIs';
import Swal from 'sweetalert2';
import { serverURL } from '../Services/serverURL';
import Header from './Header';

function EditProfile() {

    const navigate = useNavigate('')

    const { uid } = useParams()
    // console.log(uid);

    const [preview, setPreview] = useState('')
    const [fileStatus, setFileStatus] = useState(false)
    const [currentPass, setCurrentPass] = useState('')

    // console.log(currentPass);

    const [userData, setUserData] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        name: '',
        bio: '',
        userImage: ''
    })

    const getUserDet = async () => {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
        if (token) {
            const userResult = await getLoginIdAPI(reqHeader)
            console.log(userResult);
            // setUserDet(userResult.data)
            setUserData(userResult.data)
            console.log(userData);
        }
    }

    useEffect(() => {
        console.log(userData.userImage.type);
        if (userData.userImage.type == "image/png" || userData.userImage.type == "image/jpeg" || userData.userImage.type == "image/jpg") {
            console.log("generate image url");
            //file to url convertion
            console.log(URL.createObjectURL(userData.userImage));
            setPreview(URL.createObjectURL(userData.userImage))
            setFileStatus(false)
        }
        else {
            setFileStatus(true)
            console.log("Please upload following image extention(png,jpeg,jpg) only...");
        }
    }, [userData.userImage])

    const handleUpdate = async (e) => {
        // console.log(userData);
        const { _id, username, email, password, name, bio, userImage } = userData
        // console.log(_id, username, email, password, name, bio, userImage);

        const reqBody = new FormData()
        reqBody.append("username", username)
        reqBody.append("email", email)
        reqBody.append("password", password)
        reqBody.append("name", name)
        reqBody.append("bio", bio)
        reqBody.append("userImage", userImage)

        // console.log(reqBody);
        const token = sessionStorage.getItem("token")
        //if there is a change in image
        if (preview) {
            const reqHeader = {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }

            const result = await updateProfileAPI(_id, reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: "Profile Updated successfully",
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                navigate('/user/home')
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: "Profile Not Updated",
                    icon: 'error',
                    confirmButtonText: 'back'
                })
            }

        }
        else {
            const reqHeader = {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await updateProfileAPI(_id, reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: "Profile Updated successfully",
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                navigate('/user/home')
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: "Profile Not Updated",
                    icon: 'error',
                    confirmButtonText: 'back'
                })
            }
        }
    }

    const handleUpdatePass = async (e) => {

        const token = sessionStorage.getItem("token")

        const reqHeader = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        const passresult = await getLoginIdAPI(reqHeader)
        // console.log(passresult);
        // console.log(passresult.data.password);
        if (passresult.data.password == currentPass) {

            // alert("Hi")
            const { _id, username, email, password, name, bio, userImage } = userData
            // console.log(_id, username, email, password, name, bio, userImage);

            const reqBody = new FormData()
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("name", name)
            reqBody.append("bio", bio)
            reqBody.append("userImage", userImage)


            const token = sessionStorage.getItem("token")

            const reqHeader = {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await updateProfileAPI(_id, reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: "Profile Updated successfully",
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                navigate('/user/home')
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: "Profile Not Updated",
                    icon: 'error',
                    confirmButtonText: 'back'
                })
            }
        }
        else {
            Swal.fire({
                title: 'Error',
                text: "Incorrect Password",
                icon: 'error',
                confirmButtonText: 'back'
            })
        }

    }

    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);
    };



    useEffect(() => {
        getUserDet()
    }, [])

    return (
        <div>
            <Header/>
            <div className="row m-5">
                <MDBTabs className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                            Edit Profile
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                            Change Password
                        </MDBTabsLink>
                    </MDBTabsItem>
                    {/* <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                Tab 3
              </MDBTabsLink>
            </MDBTabsItem> */}
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane open={basicActive === 'tab1'}>
                        <div className="row">
                            <div className="col-md-2 text-center">
                                <label>
                                    <input type="file" onChange={e => setUserData({ ...userData, userImage: e.target.files[0] })} style={{ display: 'none' }} />
                                    <img width={'45%'} className='m-3' src={preview ? preview : `${serverURL}/uploads/${userData.userImage}`} alt="" />
                                    <p className='btn rounded-5'>Upload Picture</p>
                                </label>
                                {/* <button className='btn rounded-5'>Upload Picture</button> */}
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <label htmlFor="Name">Name:</label>
                                    <input type="text" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} placeholder='Name' className='form-control mb-4' />
                                </div>
                                <div>
                                    <label htmlFor="Email">Email:</label>
                                    <input type="text" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder='Email' className='form-control mb-4' />
                                </div>
                                <div>
                                    <label htmlFor="Username">Username:</label>
                                    <input type="text" value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} placeholder='Username' className='form-control mb-4' />
                                </div>
                                <div>
                                    <label htmlFor="Bio">Bio:</label>
                                    <textarea name="" value={userData.bio} onChange={e => setUserData({ ...userData, bio: e.target.value })} placeholder='Bio' className='form-control mb-4' id="" cols="30" rows="5"></textarea>
                                </div>
                            </div>
                            <div className='text-center'>
                                <button onClick={(e) => handleUpdate(e)} className='btn btn-dark'>Update</button>
                            </div>
                        </div>
                    </MDBTabsPane>
                    <MDBTabsPane open={basicActive === 'tab2'}>
                        <div className="row">
                            <div className="col-8 text-center">
                                <input type="password" onChange={e => setCurrentPass(e.target.value)} placeholder='Old Password' className='form-control m-4' />
                                <input type="password" onChange={e => setUserData({ ...userData, password: e.target.value })} placeholder='New Password' className='form-control m-4' />
                                {/* <input type="password" placeholder='Confirm Password' className='form-control m-4' /> */}
                                <div>
                                    <button onClick={(e) => handleUpdatePass(e)} className='btn btn-dark rounded-5'>Change Password</button>
                                </div>
                            </div>
                        </div>
                    </MDBTabsPane>
                    {/* <MDBTabsPane open={basicActive === 'tab3'}>Tab 3 content</MDBTabsPane> */}
                </MDBTabsContent>

            </div>
        </div>
    )
}

export default EditProfile