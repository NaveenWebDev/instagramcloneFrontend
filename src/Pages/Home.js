import React from 'react'
import Post from '../Component/Post'

const Home = () => {
  return (
    <div className='overflow-auto h-screen'>
      <div className="myContainer ">

    {/* ============posts=========== */}

    <div>
      <div>
      <Post />
      </div>
      <div>
      <Post />
      </div>
      <div>
      <Post />
      </div>
      <div>
      <Post />
      </div>

    </div>
      
      </div>

    </div>
  )
}

export default Home