import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { getABlogAPI, updateBlogAPI } from '../Services/allAPIs';
import { serverURL } from '../Services/serverURL';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

function EditPost() {

    const { pid } = useParams()
    console.log(pid);

    const navigate = useNavigate()

    const [preview, setPreview] = useState('')
    const [fileStatus, setFileStatus] = useState(false)

    const [blogData, setBlogData] = useState({
        _id: "",
        title: "",
        category: "",
        postimage: "",
        body: "",
        userId: "",
        date: ""
    })


    const getABlogDetails = async () => {
        const result = await getABlogAPI(pid)
        console.log(result);
        if (result.status == 200) {
            setBlogData(result.data)
            console.log(blogData);
            // console.log(post.userId);
        }
    }
    console.log(blogData);

    useEffect(() => {
        getABlogDetails()
    }, [])

    // edit useeffect

    useEffect(() => {
        console.log(blogData.postimage.type);
        if (blogData.postimage && typeof blogData.postimage === 'object') {
            const fileType = blogData.postimage.type;
            if (fileType === "image/png" || fileType === "image/jpeg" || fileType === "image/jpg") {
                setPreview(URL.createObjectURL(blogData.postimage));
                setFileStatus(false);
            } else {
                setFileStatus(true);
            }
        }
        // if (blogData.postimage.type == "image/png" || blogData.postimage.type == "image/jpeg" || blogData.postimage.type == "image/jpg") {
        //     console.log("generate image url");
        //     //file to url convertion
        //     console.log(URL.createObjectURL(blogData.postimage));
        //     // setPreview(`${serverURL}/uploads/${blog.postImage}`)
        //     setPreview(URL.createObjectURL(blogData.postimage))
        //     setFileStatus(false)
        // }
        // else {
        //     setFileStatus(true)
        //     console.log("Please upload following image extention(png,jpeg,jpg) only...");
        // }
    }, [blogData.postimage])


    //   Edit



    const handleEdit = async () => {

        const { _id, title, category, postimage, body, userId, date } = blogData
        console.log(_id, title, category, postimage, body, userId, date);

        const formattedBody = blogData.body.replace(/\n/g, '<br>');

        const reqBody = new FormData()
        reqBody.append("title", title)
        reqBody.append("category", category)
        // reqBody.append("postimage", postimage)
        preview ? reqBody.append("postimage", postimage) : reqBody.append("postimage", blogData.postimage)
        reqBody.append("body", formattedBody)
        reqBody.append("userId", userId)
        reqBody.append("date", date)

        // console.log(reqBody);
        const token = sessionStorage.getItem("token")
        //if there is a change in image
        if (preview) {
            const reqHeader = {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }

            const result3 = await updateBlogAPI(_id, reqBody, reqHeader)
            console.log(result3);
            if (result3.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: "Blog Updated successfully",
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                navigate(`/view-post/${pid}`)

            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: "Blog Not Updated",
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

            const result3 = await updateBlogAPI(_id, reqBody, reqHeader)
            console.log(result3);
            if (result3.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: "Blog Updated successfully",
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                navigate(`/view-post/${pid}`)

            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: "Blog Not Updated",
                    icon: 'error',
                    confirmButtonText: 'back'
                })
            }
        }
    };

    return (
        <div>
            <Header/>
            <div className='my-5'>
                <div className="container">
                    <h2 className='text-center'>Update Blog</h2>
                    <div className="row">
                        <div className="col-lg-12 mt-4 p-5 ">
                            <div className='text-center'>
                            <label>
                                <input onChange={e => setBlogData({ ...blogData, postimage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                                <img src={preview ? preview : `${serverURL}/uploads/${blogData.postimage}`} alt="" width={'100%'} />
                            </label>
                            {
                                fileStatus && <p className='text-warning m-2'>*Please upload following image extention(png,jpeg,jpg) only...</p>
                            }
                            </div>
                            {/* </div>

                        <div className="col-lg-6 text-center"> */}
                            <label htmlFor="Title">Title:</label>
                            <input type="text" value={blogData.title} onChange={e => setBlogData({ ...blogData, title: e.target.value })} placeholder='Blog Title' className='form-control mb-3' />

                            <label htmlFor="category">Category:</label>
                            <input type="text" value={blogData.category} onChange={e => setBlogData({ ...blogData, category: e.target.value })} placeholder='Category' className='form-control mb-3' />

                            <label htmlFor="Content">Blog Content:</label>
                            <textarea type="text" value={blogData.body} onChange={e => setBlogData({ ...blogData, body: e.target.value })} placeholder='Blog Content' rows="30" className='form-control mb-3' />

                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={(e) => handleEdit(e)}>Update</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditPost