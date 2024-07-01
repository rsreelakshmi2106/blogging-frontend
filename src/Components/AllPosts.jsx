import React, { useState, useEffect } from 'react';
import { serverURL } from '../Services/serverURL';
import { Link } from 'react-router-dom';
import { getUserDetailAPI } from '../Services/allAPIs';

function AllPosts({ blog }) {
  // console.log(blog);
  const [show, setShow] = useState(false);
  const [userDet, setUserDet] = useState([]); // Declare userDet state variable
  const [postDate, setPostDate] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = async () => {
    const uid = blog.userId;
    console.log(blog.date);
    try {
      const result = await getUserDetailAPI(uid);
      if (result.status === 200) {
        setUserDet(result.data);
        console.log(userDet);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {

    getUser();
    if (blog.date) {
      const postDateObject = new Date(blog.date);
      setPostDate(postDateObject.toLocaleDateString());
    } else {
      setPostDate('');
    }

  }, [blog]);

  return (
    <div>
      <div className="container" style={{ width: '95%' }}>
        <Link to={`/view-post/${blog._id}`} style={{ textDecoration: 'none',color: 'inherit' }}>
          <div className="row m-3">
            <div className="col" style={{ textAlign: 'left' }}>
              
              <small>@{userDet.username}</small>&nbsp;&nbsp;
              { postDate && 
                <small>{postDate}</small>
              }
              <h4>{blog.title}</h4>
              <h6>{blog.category} &nbsp;&nbsp;&nbsp;<i className='fa-solid fa-heart'>&nbsp;&nbsp;{blog.likes.length}</i></h6>
            </div>
            <div className="col-4">
              <img
                src={blog ? `${serverURL}/uploads/${blog.postimage}` : "https://th.bing.com/th/id/OIP.SWNGZYVaenEbA_4fj7l8OQHaEK?rs=1&pid=ImgDetMain"}
                width={'100%'}
                alt=""
              />
            </div>
          </div>
          <hr />
        </Link>
      </div>

      {/* <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{blog.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={blog ? `${serverURL}/uploads/${blog.postimage}` : "https://th.bing.com/th/id/OIP.SWNGZYVaenEbA_4fj7l8OQHaEK?rs=1&pid=ImgDetMain"}
            width={'100%'}
            alt=""
          />
          <p>{blog.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

    </div>
  );
}

export default AllPosts;
