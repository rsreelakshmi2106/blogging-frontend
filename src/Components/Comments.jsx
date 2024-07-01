import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { FaComment } from 'react-icons/fa';
import { addCommentAPI, addReplyAPI, delCommentAPI, delRepAPI, getPostCommentsAPI, getUserDetailAPI } from '../Services/allAPIs';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import '../App.css'

function Comments({ pid }) {

  const [scrollableModal, setScrollableModal] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(null);
  const [replyValue, setReplyValue] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [ctext, setCText] = useState('');
  const [userDetails, setUserDetails] = useState({});
  // const [totalComm, setTotalComm] = useState(0);
  const [sessionUsername, setSessionUsername] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsrep, setShowOptionsrep] = useState(null);
  const [selectedReplyId, setSelectedReplyId] = useState(null);


  const handleToggleOptions = (comId) => {
    if(showOptions === comId){
      setShowOptions(null)
    }
    else{
      setShowOptions(comId)
    }
  };
  const handleToggleOptionsrep = (replyId) => {
    if (selectedReplyId === replyId) {
        setSelectedReplyId(null); // Deselect if the same reply is clicked again
    } else {
        setSelectedReplyId(replyId); // Select the new reply
    }
};

  const getComments = async () => {
    const result1 = await getPostCommentsAPI(pid);
    setAllComments(result1.data);


    result1.data.forEach(async (comment) => {
      // setTotalComm(totalComm+1);
      if (!userDetails[comment.userId]) {
        const user = await getUserDetailAPI(comment.userId);
        setUserDetails(prev => ({ ...prev, [comment.userId]: user.data.username }));
      }
      comment.reply.forEach(async (rep) => {
        // setTotalComm(totalComm+1);
        if (!userDetails[rep.userId]) {
          const user = await getUserDetailAPI(rep.userId);
          setUserDetails(prev => ({ ...prev, [rep.userId]: user.data.username }));
        }
      });
    });

    // console.log(result1.data);
  }

  // setTotalComm(totalComm+allComments.length+allComments.reply.length)
  // console.log(totalComm);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const reqBody = {
      postId: pid,
      text: ctext
    };
    const token = sessionStorage.getItem("token");

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await addCommentAPI(reqBody, reqHeader);
        if (result.status === 200) {
          Swal.fire({
            title: 'Success',
            text: "Comment added",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          setCText('');
          getComments(); // Refresh comments
        } else {
          Swal.fire({
            title: 'Error',
            text: result.message || 'Failed to add comment',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      } catch (error) {
        console.error('API Call Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding the comment',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } else {
      Swal.fire({
        title: 'Unauthorized',
        text: 'You need to log in to add a comment',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }

  const handleReply = (e, cid) => {
    e.preventDefault();
    setShowReplyInput(cid); // Set specific comment ID to show reply input
  };

  const handleReplySubmit = async (cid) => {
    console.log(cid);
    const reqBody = {
      commentId: cid,
      text: replyValue
    };

    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const result2 = await addReplyAPI(reqBody, reqHeader);
        console.log(result2);
        if (result2.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Reply submitted',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          setShowReplyInput(null);
          setReplyValue('');
          getComments(); // Refresh comments
        } else {
          Swal.fire({
            title: 'Error',
            text: result2.message || 'Failed to add reply',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      } else {
        Swal.fire({
          title: 'Unauthorized',
          text: 'You need to log in to reply',
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      }
    } catch (error) {
      console.error('API Call Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while submitting the reply',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };


  //DELETE REPLY
  const handleRepDelete = async(cid,rid)=>{
    console.log(cid,rid);
    const token = sessionStorage.getItem("token");
    if(token){
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const deleteReply = await delRepAPI(cid,rid,reqHeader)
      console.log(deleteReply);
      if(deleteReply.status==200){
        alert("Deleted")
        getComments()
      }
    }
  }

  //DELETE COMMENT
  const handleCommentDelete = async(cid)=>{
    console.log(cid);
    const token = sessionStorage.getItem("token");
    if(token){
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const deleteComment = await delCommentAPI(cid,reqHeader)
      console.log(deleteComment);
      if(deleteComment.status==200){
        alert("Deleted")
        getComments()
      }
    }
  }

  useEffect(() => {
    getComments();
    setSessionUsername(sessionStorage.getItem("username"))
  });

  return (
    <div>
      <MDBBtn className='btn btn-dark comm' onClick={() => setScrollableModal(!scrollableModal)}>
        <i className="fa-regular fa-comment" >
          <span style={{fontFamily:'Sedan'}}>&nbsp;{allComments.length}</span></i>
      </MDBBtn>

      <MDBModal open={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
        <MDBModalDialog scrollable >
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Comments</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setScrollableModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                {allComments.length > 0 ?
                  allComments.map(com => (
                    <div key={com._id} className='m-3'>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <small>@{userDetails[com.userId]}</small>
                          <p><b>{com.text}</b></p>
                        </div>
                        {
                          (sessionUsername === userDetails[com.userId] || sessionUsername === "admin") && (
                            <div className='col-1' style={{ cursor: 'pointer' }} onClick={() => handleToggleOptions(com._id)}>
                              <i className="fas fa-ellipsis-v"></i>
                              {showOptions === com._id && (

                                <div className="options-container text-center">

                                  {/* <button className='btn '>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                  </button> */}

                                  <button className="btn" >
                                    <i class="fa-solid fa-trash" onClick={()=>handleCommentDelete(com._id)}></i>
                                  </button>
                                </div>
                              )}
                            </div>
                          )
                        }

                      </div>
                      <div>

                        {/* <Link to={`/user/view-user/${com._id}`}>
                      <small>@{userDetails[com.userId]}</small>
                      </Link> */}

                        {
                          com.reply.length > 0 && com.reply.map(rep => (
                            <div className="d-flex justify-content-between align-items-start">
                              <div style={{ marginLeft: '20%' }}>
                                <small>@{userDetails[rep.userId]} </small>
                                <p><b>{rep.text}</b></p>
                              </div>
                              {
                                (sessionUsername === userDetails[rep.userId] || sessionUsername === "admin") && (
                                  <div className='col-1' style={{ cursor: 'pointer' }} onClick={() => handleToggleOptionsrep(rep._id)}>
                                    <i className="fas fa-ellipsis-v"></i>
                                    {selectedReplyId === rep._id && (

                                      <div className="options-container text-center">

                                        {/* <button className='btn '>
                                          <i class="fa-solid fa-pen-to-square"></i>
                                        </button> */}

                                        <button className="btn" onClick={()=>handleRepDelete(com._id,rep._id)}>
                                          <i class="fa-solid fa-trash"></i>
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )
                              }

                            </div>

                          ))
                        }
                      </div>
                      <a onClick={(e) => handleReply(e, com._id)} style={{ textDecoration: 'none' }} className='mx-5 border p-2 rounded-5'>reply</a>
                      {showReplyInput === com._id && (
                        <div>
                          <input type="text" className='form-control mt-3 rounded-5' placeholder='Add your reply..' value={replyValue} onChange={(e) => setReplyValue(e.target.value)} />
                          <MDBBtn size='sm' className='rounded-5 mt-2' onClick={() => handleReplySubmit(com._id)}>Submit</MDBBtn>
                        </div>
                      )}
                      <hr />
                    </div>
                  ))
                  :
                  <h1>No comments</h1>
                }
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <input type="text" value={ctext} onChange={(e) => setCText(e.target.value)} className='form-control rounded-5' placeholder='Add your comments..' />
              <MDBBtn className='rounded-5' onClick={handleAddComment}>Submit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default Comments;
