import React, { useEffect, useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
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

import { allBlogsAPI, allUserAPI } from '../Services/allAPIs';
import AllPosts from '../Components/AllPosts';
import Header from '../Components/Header';
import { serverURL } from '../Services/serverURL';
import { Link } from 'react-router-dom';

function Home() {
  const [basicActive, setBasicActive] = useState('tab1');
  const [allPost, setAllposts] = useState([]);
  const [allUser, setAlluser] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState(10);

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [openNavText, setOpenNavText] = useState(false);

  const allBlogs = async () => {
    const result = await allBlogsAPI(searchKey);
    console.log(result);
    setAllposts(result.data);
  };

  const getallusers = async () => {
    const userResult = await allUserAPI(searchKey);
    console.log(userResult);
    setAlluser(userResult.data)
    // console.log(allUser);
  }

  const uniqueCategories = Array.from(new Set(allPost.map(post => post.category)));

  useEffect(() => {
    allBlogs();
    getallusers();
  }, [searchKey]);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredPosts = selectedCategory ? allPost.filter(post => post.category === selectedCategory) : allPost;

  const activeUserPosts = filteredPosts.filter(post => {
    const user = allUser.find(user => user._id === post.userId);
    return user && user.userStatus === 'Active';
  });

  const trendingPosts = allPost.filter(posts=>{
    const user = allUser.find(user => user._id === posts.userId);
    return user && user.userStatus === 'Active';
  })

  const handleViewMore = () => {
    setDisplayedPosts(prevCount => prevCount + 10);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <div>
      {/* <Header/> */}
      {
        isLoggedIn ? <Header /> :
          <MDBNavbar expand='lg' sticky light bgColor='primary'>
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
                    <MDBNavbarLink className='text-light' active aria-current='page' href='/user/write'>
                      Write
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>

                    <MDBNavbarLink className='text-light' href='/login'>Sign in</MDBNavbarLink>


                  </MDBNavbarItem>
                  <MDBNavbarItem>

                    <MDBNavbarLink className='text-light' href='/register'>Sign up</MDBNavbarLink>

                  </MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
      }

      <div className="row my-5 mx-0">
        <div className='text-center mb-4'>Welcome @{sessionStorage.getItem('username')}</div>
        <input onChange={e => setSearchKey(e.target.value)} type="text" placeholder='Search' className='form-control w-50 mx-auto mb-4 rounded-5' />
        <div className="col-md-8" style={{ borderRight: 'solid black ' }}>
          <MDBTabs className='mb-3'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => setBasicActive('tab1')} className='mx-3' active={basicActive === 'tab1'}>
                HOME
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane open={basicActive === 'tab1'}>
              {
                activeUserPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, displayedPosts).map(item => (
                  <AllPosts blog={item} key={item.id} />
                ))
              }
              {displayedPosts < activeUserPosts.length && (
                <div className='text-center'>
                  <button className="btn btn-primary my-3" onClick={handleViewMore}>
                    View More
                  </button>
                </div>
              )}
              {activeUserPosts.length === 0 && (
                <h1>No posts found for selected category</h1>
              )}
            </MDBTabsPane>
          </MDBTabsContent>
        </div>

        <div className="col-md-4 text-center">
          {
            !searchKey ? (
              <div>
                <div><h5>Stories from all interests </h5>
                  {
                    uniqueCategories.map((cat, index) => (
                      <button className={`btn btn-dark rounded-5 m-2 ${selectedCategory === cat ? 'active' : ''}`} key={index} onClick={() => handleCategoryClick(cat)}>
                        {cat}
                      </button>
                    ))
                  }</div>
                <div className='mt-4'>
                  <h5>Top Trending Stories</h5>
                  {
                    trendingPosts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5).map(item => (
                      <AllPosts blog={item} key={item.id} />
                    ))
                  }
                </div>
              </div>
            ) :
              <div>
                <h5>Users</h5>
                {allUser.length > 0 ? (
                  allUser.filter(ur=>ur.userStatus=="Active").map(u => {
                    const uid = u._id;
                    return (
                      <Link to={`/user/view-user/${uid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="row m-2" key={u.username}>

                          <div className="col-2">
                            <img
                              style={{ width: '100%' }}
                              src={u.userImage ? `${serverURL}/uploads/${u.userImage}` : "https://th.bing.com/th/id/OIP.OwjGOqZo_xrPUlv1cqd9kwHaHx?rs=1&pid=ImgDetMain"}
                              alt=""
                            />
                          </div>
                          <div className="col-5">
                            <p>@{u.username}<br />{u.name}</p>
                          </div>

                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <h6 className='text-warning'>No such user !!</h6>
                )}
              </div>

          }


          {/* {
            searchKey && (
              allUser ? (
                <div>
                  <h5>Users</h5>
                  {allUser.map(u => (
                    <div className="row m-2" key={u.username}>
                      {u.username}
                    </div>
                  ))}
                </div>
              ) : null
            )
          } */}

        </div>
      </div>
    </div>
  )
}

export default Home;
