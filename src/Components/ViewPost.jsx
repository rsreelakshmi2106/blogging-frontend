import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePostAPI, getABlogAPI, getUserDetailAPI, updateBlogAPI, updateLikesAPI } from '../Services/allAPIs';
import { serverURL } from '../Services/serverURL';
import Swal from 'sweetalert2'
// import './ViewPost.css'
import Comments from './Comments';
import EditPost from './EditPost';
import Header from './Header';
import '../App.css'

function ViewPost() {
  const navigate = useNavigate('')

  const { bid } = useParams()
  console.log(bid);

  const [showOptions, setShowOptions] = useState(false);
  const [sessionUsername, setSessionUsername] = useState('');
  const [postDate, setPostDate] = useState('');
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setSessionUsername(sessionStorage.getItem("username"));
    }

  }, []);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };


  //GET BLOG
  const [userDet, setUserDet] = useState([])
  const [post, setPost] = useState([])

  const getABlogDetails = async () => {
    const result = await getABlogAPI(bid)
    console.log(result);
    if (result.status == 200) {
      setPost(result.data)
      setLikes(result.data.likes.length);
      console.log(post);
      // console.log(post.userId);
    }
  }

  //Get User Det
  const getUser = async () => {
    const uid = post.userId
    console.log(uid);
    const result2 = await getUserDetailAPI(uid)
    console.log(result2);
    if (result2.status == 200) {
      setUserDet(result2.data)
      console.log(userDet);
    }
  }

  useEffect(() => {
    getABlogDetails()
  }, [])

  useEffect(() => {
    getUser();
    if (post.date) { // Ensure post.date exists before proceeding
      const postDateObject = new Date(post.date);
      setPostDate(postDateObject.toLocaleDateString());
      console.log(postDate);
    }
  }, [post]);


  //DELETE

  const handleDelete = async (bid) => {
    console.log(bid);
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const delresult = await deletePostAPI(bid, reqHeader)
      console.log(delresult);
      Swal.fire({
        title: 'success',
        text: "Post Deleted",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      if(sessionUsername === 'admin'){
        navigate('/home')
      }
      else{
        navigate('/user/home')
      }
    }

  };



  // LIKES
  const handleLike = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result = await updateLikesAPI(bid,reqHeader);
      if (result.status === 200) {
        setLikes(result.data.likes.length);
        // setLikes(likes + 1); // Increment likes on the front end
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Unable to like post',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  };

  
  useEffect(() => {
    if (sessionStorage.getItem("token")) { }
    else {
      Swal.fire({
        title: 'warning',
        text: 'Login Required',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      navigate('/home')
    }
  })

  return (
    <div>
      <Header />
      <div className='my-2 mx-3 small-screen-reset'>

        <div className='text-center small-screen '>
          <div className="row my-5 ">
            <div className="col">
              <Link to={`/user/view-user/${userDet._id}`} style={{ textDecoration: 'none' }}>
                <h5 style={{ textAlign: 'left' }}>@{userDet.username}</h5>
              </Link>
            </div>
            <div className="col-1 post-date">
              <h5 style={{ textAlign: 'right' }}>{postDate}</h5>
            </div>
            {(sessionUsername === userDet.username || sessionUsername === 'admin') && (
              <div className='col-1' style={{ cursor: 'pointer', textAlign: 'right' }} onClick={handleToggleOptions}>
                <i className="fas fa-ellipsis-v"></i>
                {showOptions && (

                  <div className="options-container text-center">
                    <Link to={`/edit-blog/${post._id}`} style={{ textDecoration: 'none' }}>
                      {/* <EditPost blog={post}/> */}
                      <button className='btn '><i class="fa-solid fa-pen-to-square"></i></button>
                    </Link>
                    <button className="btn" onClick={() => handleDelete(bid)}>
                      <i class="fa-solid fa-trash"></i>
                    </button>


                  </div>
                )}
              </div>
            )}

            <hr />
          </div>

          <h1 className='mt-5' >{post.title}</h1>

          <img className='viewPimg' src={post ? `${serverURL}/uploads/${post.postimage}` : "https://th.bing.com/th/id/OIP.SWNGZYVaenEbA_4fj7l8OQHaEK?rs=1&pid=ImgDetMain"}  alt="" />

          <p></p>
          <div className="row mt-5" style={{ textAlign: 'left' }}>
            <div className='col-auto ' >
              <button className="like btn btn-primary me-3" onClick={handleLike} style={{ display: 'flex', alignItems: 'center' }}>
                <i className='fa-solid fa-heart '></i>&nbsp;&nbsp;{likes}
              </button>
            </div>
            <div className='col'>
              <Comments pid={post._id} />
            </div>
          </div>
          <div className='my-5 mx-4' style={{ textAlign: 'justify',fontFamily:'Sedan',fontSize:'larger' }} dangerouslySetInnerHTML={{ __html: post.body }}></div>
          {/* <p className='my-5 mx-4' style={{ textAlign: 'justify' }}>{post.body}</p> */}
        </div>
      </div>
    </div>

  )
}

export default ViewPost