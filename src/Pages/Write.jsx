import React, { useContext, useEffect, useState } from 'react'
import { addBlogAPI } from '../Services/allAPIs';
import { addBlogResponseContext } from '../ContextAPI/ContextShare';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Header from '../Components/Header';

function Write() {

  const {addBlogResponse,setAddBlogResponse} = useContext(addBlogResponseContext)

  const navigate = useNavigate()

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    postimage: "",
    body: ""
  })

  const [fileStatus, setFileStatus] = useState(false)
  const [imageUrl, setImageUrl] = useState("");
  // const [token, setToken] = useState('')


  useEffect(() => {
    if(sessionStorage.getItem("token")){
      console.log(blogData);
    if (blogData.postimage.type == 'image/png' || blogData.postimage.type == 'image/jpg' || blogData.postimage.type == 'image/jpeg') {
      console.log("Generate image url");
      console.log(URL.createObjectURL(blogData.postimage));
      setImageUrl(URL.createObjectURL(blogData.postimage))
      setFileStatus(false)
    }
    else {
      console.log("Please upload following image extension (png,jpeg,jpg)");
      setFileStatus(true)
    }
    }
    else{
      Swal.fire({
        title: 'warning',
        text: "Login Required",
        icon: 'warning',
        confirmButtonText: 'Back'
      })
      navigate('/')
    }
  }, [blogData.postimage])


  const handleAddBlog = async (e) => {
    e.preventDefault();
    //data passing
    console.log(blogData);
    const { title, category, postimage, body } = blogData
    const formattedBody = blogData.body.replace(/\n/g, '<br>');

    if (!title || !category || !postimage || !body) {
      Swal.fire({
        title: 'Warning',
        text: "Please fill all the fields",
        icon: 'warning',
        confirmButtonText: 'Back'
      })
    }
    else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("category", category)
      reqBody.append("postimage", postimage)
      reqBody.append("body", formattedBody)

      if (sessionStorage.getItem("token")) {
        const token =sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        // API Call
        try {
          const result = await addBlogAPI(reqBody, reqHeader);
          if (result.status === 200) {
            Swal.fire({
              title: 'Success',
              text: "Blog added successfully",
              icon: 'success',
              confirmButtonText: 'ok'
            })
            // setAddBlogResponse(result.data)
            navigate('/user/home');
          } else {
            Swal.fire({
              title: 'Error',
              text: result.response.data,
              icon: 'error',
              confirmButtonText: 'Back'
            })

          }
        } catch (error) {
          console.error("Error adding blog:", error);
          Swal.fire({
            title: 'Error',
            text: "An error occurred while adding the blog",
            icon: 'error',
            confirmButtonText: 'Back'
          })
        }
      }
    }
  }

  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     setToken(sessionStorage.getItem("token"))
  //   }
  //   else {
  //     setToken("")
  //   }
  // }, [])


  return (
    <div>
      <Header/>
      <div className='write'>
        <h2>Write a New Post</h2>
        <form>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" className='form-control mb-4' id="title" value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} required />
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <input type="text" className='form-control mb-4' id="category" value={blogData.category} onChange={(e) => setBlogData({ ...blogData, category: e.target.value })} required />
          </div>

          <div>
            <label htmlFor="image">Image:</label>
            {fileStatus && <p className='text-danger'>*Please upload following image extension (png,jpeg,jpg)</p>
            }
            <input type="file" id="image" className='form-control mb-4' accept="image/*" onChange={(e) => setBlogData({ ...blogData, postimage: e.target.files[0] })} />
            {imageUrl && <img src={imageUrl} alt="Uploaded Image" className="mb-4" style={{ maxWidth: '100%', maxHeight: '200px' }} />}

          </div>

          <div>
            <label htmlFor="body">Body:</label>
            <textarea id="body" rows={'15'} className='form-control mb-4' value={blogData.body} onChange={(e) => setBlogData({ ...blogData, body: e.target.value })} required />
          </div>

          <div className='text-center'>
            <button onClick={(e)=>handleAddBlog(e)} className='btn btn-dark'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Write