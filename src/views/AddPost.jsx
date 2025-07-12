import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-4 sm:py-8 px-2 sm:px-0'>
        <Container>
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Add New Post</h1>
                <p className="text-[#A1A1AA] text-sm sm:text-base">Create and share your thoughts with the world</p>
            </div>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost