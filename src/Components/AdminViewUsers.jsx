import React, { useEffect, useState } from 'react'
import { allUserAPI, setUserStatusAPI } from '../Services/allAPIs';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Header from './Header';
import { Link } from 'react-router-dom';
import '../App.css'

function AdminViewUsers() {

    const [allUser, setAlluser] = useState([])

    const getallusers = async () => {
        const searchKey = ''
        const userResult = await allUserAPI(searchKey);
        console.log(userResult);
        setAlluser(userResult.data)
        // console.log(allUser);
    }

    const handleUserStatus = async(userId,uStatus)=>{
        const reqBody = {
            userId:userId,
            userStatus:uStatus
        }
        const statusResult = await setUserStatusAPI(reqBody)
        console.log(statusResult);
        getallusers()
    }

    useEffect(() => {
        getallusers()
    }, [])
    return (
        <div>
            <Header />
            <div className='text-center userTable'>
                <h3>All users</h3>
                <MDBTable>
                    <MDBTableHead >
                        <tr>
                            {/* <th scope='col'>#</th> */}
                            <th scope='col'>UserName</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>View</th>
                            <th scope='col'>Action</th>
                            {/* <th scope='col'>Delete</th> */}
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            allUser.length > 0 ? allUser.filter(u=>u.username!="admin").map((user, index) => {
                                const uid = user._id;
                                return (
                                    <tr key={uid}>
                                        {/* <th scope='row'>{index + 1}</th> */}
                                        <td>@{user.username}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.userStatus}</td>
                                        <td>
                                            <Link to={`/user/view-user/${uid}`}>
                                                <button className='btn'><i className='fa-solid fa-eye'></i></button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className='btn' onClick={() => handleUserStatus(user._id,user.userStatus === 'Active' ? 'Blocked' : 'Active')}>
                                                {user.userStatus === 'Active' ? 'Block' : 'Unblock'}
                                            </button>
                                        </td>
                                        {/* <td><button>Delete</button></td> */}
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="5">No users found</td>
                                </tr>
                            )
                        }

                    </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    )
}

export default AdminViewUsers