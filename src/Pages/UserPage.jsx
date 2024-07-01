import React, { useEffect, useState } from 'react'
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { getUserDetailAPI, viewUserBlogAPI } from '../Services/allAPIs';
import HomePosts from '../Components/HomePosts';
import { serverURL } from '../Services/serverURL';
import Header from '../Components/Header';

function UserPage() {

    const { uid } = useParams()
    console.log(uid);

    const [userBlog, setUserBlog] = useState([])

    const [user, setUser] = useState([])

    const [basicActive, setBasicActive] = useState('tab1');


    const viewBlogs = async () => {
        // const token = sessionStorage.getItem("token")
        // if (token) {
        //     const reqHeader = {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     }
        // }]
        const result = await viewUserBlogAPI(uid)
        console.log(result);
        setUserBlog(result.data)
        console.log(userBlog);


        const userResult = await getUserDetailAPI(uid)
        console.log(userResult)
        setUser(userResult.data)
        console.log(user);
    }

    useEffect(() => {
        viewBlogs()
    }, [])

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    return (
        <div>
            <Header/>
            <div className="row my-5 mx-0">
                <div className="col-md-8" style={{ borderRight: 'solid black ' }}>
                    <MDBTabs className='mb-3'>
                        <MDBTabsItem>
                            <MDBTabsLink className='mx-3' onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                                Published Posts
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                    {
                        userBlog.length > 0 ?
                            userBlog.sort((a, b) => new Date(b.date) - new Date(a.date)).map(item => (
                                <HomePosts posts={item} />
                            ))
                            :
                            <h3>No posts published</h3>
                    }

                    <MDBTabsContent>
                        <MDBTabsPane open={basicActive === 'tab1'}>

                        </MDBTabsPane>
                    </MDBTabsContent>
                </div>
                <div className="col-md-4 text-center">
                    <img width={'45%'} src={`${serverURL}/uploads/${user.userImage}` ? `${serverURL}/uploads/${user.userImage}` : "https://th.bing.com/th/id/OIP.OwjGOqZo_xrPUlv1cqd9kwHaHx?rs=1&pid=ImgDetMain"} alt="" />
                    <div className='m-4'>
                        {user.name &&
                            <h6>{user.name}</h6>
                        }
                        <p>@{user.username}</p>
                        {
                            userBlog.length > 0 ?
                                <p><b >{userBlog.length} Blogs</b></p> :
                                <p><b>0 Blogs</b></p>
                        }
                    </div>


                    {/* <Link to={'/user/profile-edit'} >
                        <button className='btn btn-dark btn-sm'>Edit Profile</button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default UserPage