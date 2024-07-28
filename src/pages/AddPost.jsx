import React from 'react'
import PostForm from '../components/PostForm'
import Container from '../components/Container'

function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <PostForm/>
      </Container>
    </div>
  )
}

export default AddPost
