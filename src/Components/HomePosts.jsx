import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverURL } from '../Services/serverURL';
import { Link } from 'react-router-dom';

function HomePosts({ posts }) {

  const [show, setShow] = useState(false);
  const [postDate, setPostDate] = useState(''); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    const postDateObject = new Date(posts.date); // Assuming blog.date contains the date field
    setPostDate(postDateObject.toLocaleDateString());
  },[posts])

  return (

    <div>
      <div className="container" style={{ width: '90%' }} >
        <Link to={`/view-post/${posts._id}`} style={{ textDecoration: 'none',color: 'inherit' }}>
          <div className="row my-3">
            <div className="col" style={{ textAlign: 'left' }}>
              <h4>{posts.title}</h4>
              <h6>{posts.category} &nbsp;&nbsp;&nbsp;<i className='fa-solid fa-heart'>&nbsp;&nbsp;{posts.likes.length}</i></h6>
              <small>{postDate}</small>
            </div>
            <div className="col-4">
              <img src={posts ? `${serverURL}/uploads/${posts.postimage}` : "https://th.bing.com/th/id/OIP.SWNGZYVaenEbA_4fj7l8OQHaEK?rs=1&pid=ImgDetMain"} width={'100%'} alt="" />
              {/* <img src="https://th.bing.com/th/id/OIP.SWNGZYVaenEbA_4fj7l8OQHaEK?rs=1&pid=ImgDetMain" width={'50%'} alt="" /> */}
            </div>
            
          </div>
        </Link>
        <hr />
      </div>


    </div>
  )
}

export default HomePosts