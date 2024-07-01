import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

export const registerAPI = async (user) =>{
    return await commonAPI("post",`${serverURL}/register`,user,"")
}

export const loginAPI = async (user)=>{
    return await commonAPI("post",`${serverURL}/login`,user,"")
}

export const addBlogAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("post",`${serverURL}/blog/add-blog`,reqBody,reqHeader)
}

export const userBlogAPI = async(reqHeader)=>{
    return await commonAPI("get",`${serverURL}/blog/user-blog`,"",reqHeader)
}

export const allBlogsAPI = async(searchKey)=>{
    return await commonAPI("get",`${serverURL}/blog/all-blog?search=${searchKey}`,"","")
}

export const getABlogAPI = async(bid)=>{
    return await commonAPI("get",`${serverURL}/view-blog/${bid}`,{},"")
}

export const getUserDetailAPI = async(userId)=>{
    return await commonAPI("get",`${serverURL}/get-user-detail/${userId}`,{},"")
}

export const getLoginIdAPI = async(reqHeader)=>{
    return await commonAPI("get",`${serverURL}/get-login-id`,{},reqHeader)
}

export const deletePostAPI = async(postId,reqHeader)=>{
    return await commonAPI("delete",`${serverURL}/delete-a-post/${postId}`,{},reqHeader)
}

export const viewUserBlogAPI = async(uid)=>{
    return await commonAPI("get",`${serverURL}/view-user-blog/${uid}`,"","")
}

export const updateProfileAPI = async(uid,reqBody,reqHeader)=>{
    return await commonAPI("put",`${serverURL}/profile/update-profile/${uid}`,reqBody,reqHeader)
}

export const addCommentAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${serverURL}/comment/add-comment`,reqBody,reqHeader)
}

export const getPostCommentsAPI = async(pid)=>{
    return await commonAPI("get",`${serverURL}/comment/get-comments/${pid}`,"","")
}

export const addReplyAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("put",`${serverURL}/comment/add-reply`,reqBody,reqHeader)
}

export const updateBlogAPI = async(pid,reqBody,reqHeader)=>{
    return await commonAPI("put",`${serverURL}/blog/update-blog/${pid}`,reqBody,reqHeader)
}

export const updateLikesAPI = async(pid,reqHeader)=>{
    return await commonAPI("put",`${serverURL}/blog/likes/${pid}`,{},reqHeader)
}

export const allUserAPI = async(searchKey)=>{
    return await commonAPI("get",`${serverURL}/user/all-users?search=${searchKey}`,"","")
}

export const delRepAPI = async(cid,rid,reqHeader)=>{
    return await commonAPI("delete",`${serverURL}/comment/delete-reply/${cid}/${rid}`,{},reqHeader)
}

export const delCommentAPI = async(cid,reqHeader)=>{
    return await commonAPI("delete",`${serverURL}/comment/delete-comment/${cid}`,{},reqHeader)
}

export const setUserStatusAPI = async(reqBody)=>{
    return await commonAPI("put",`${serverURL}/user/set-user-status`,reqBody,"")
}

export const getNotificationsAPI = async(reqHeader)=>{
    return await commonAPI("get",`${serverURL}/get-notifications`,"",reqHeader)
}

export const clearNotificationsAPI = async(reqHeader)=>{
    return await commonAPI("delete",`${serverURL}/notification/clear`,{},reqHeader)
}