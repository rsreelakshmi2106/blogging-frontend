import React, { useEffect, useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import HomePosts from './HomePosts';
import { getLoginIdAPI, userBlogAPI } from '../Services/allAPIs';
import { addBlogResponseContext } from '../ContextAPI/ContextShare';
import { serverURL } from '../Services/serverURL';
import Header from './Header';

function Profile() {

    const [username, setUsername] = useState('');
    const [basicActive, setBasicActive] = useState('tab1');
    const [userPosts, setUserPosts] = useState([]);

    const [userDet, setUserDet] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        bio: "",
        userImage: ""
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
            setUserDet(userResult.data)
            console.log(userDet);
        }
    }
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    const getUserBlog = async () => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token');
            const reqHeader = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            };
            try {
                const result = await userBlogAPI(reqHeader);
                setUserPosts(result.data);
                console.log(result);
            } catch (error) {
                console.error('Error fetching user blog posts:', error);
            }
        }
    };

    useEffect(() => {
        getUserBlog();
        getUserDet()
        if (sessionStorage.getItem('username')) {
            setUsername(sessionStorage.getItem('username'));
        } else {
            setUsername('');
        }
    }, []);

    return (
        <div>
            <Header/>
            <div className="row my-5 mx-0">
                <div className="col-md-8" style={{ borderRight: 'solid black ' }}>
                    <MDBTabs className='mb-3'>
                        <MDBTabsItem>
                            <MDBTabsLink className='mx-3' onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                                My Posts
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                    {
                        userPosts.length > 0 ?
                            userPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(item => (
                                <HomePosts posts={item} />
                            ))
                            :
                            <h1>No Blogs Published</h1>
                    }

                    <MDBTabsContent>
                        <MDBTabsPane open={basicActive === 'tab1'}>

                        </MDBTabsPane>
                    </MDBTabsContent>
                </div>
                <div className="col-md-4" style={{ textAlign: 'center' }}>
                    <img width={'45%'} className='mb-4' src={`${serverURL}/uploads/${userDet.userImage}` ? `${serverURL}/uploads/${userDet.userImage}` : "https://th.bing.com/th/id/OIP.OwjGOqZo_xrPUlv1cqd9kwHaHx?rs=1&pid=ImgDetMain"} alt="" />

                    {userDet.name &&
                        <h6>{userDet.name}</h6>
                    }
                    <p style={{ fontSize: 'larger' }}>@{userDet.username}</p>
                    <Link to={`/user/profile-edit/${userDet._id}`} >
                        <button className='btn btn-primary mb-5'>Edit Profile</button>
                    </Link>

                    {
                        userPosts.length > 0 ?
                            <p><b >{userPosts.length} Blogs</b></p> :
                            <p><b>0 Blogs</b></p>
                    }

                </div>
            </div>
        </div>
    );
}

export default Profile;
