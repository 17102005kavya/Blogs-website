import React, { useState } from 'react'
import Container from '../components/Container'
import PostForm from '../components/PostForm'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
    const [post,setPosts]=useState();
    const {slug}=useParams();
    const nav=useNavigate();
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            nav('/')
        }
    }, [slug, nav])
  return  post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
