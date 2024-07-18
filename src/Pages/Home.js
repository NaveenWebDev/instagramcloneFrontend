import React, { useEffect, useState } from 'react'
import Post from '../Component/Post'
import axios from 'axios'

const Home = () => {

  const apiUrl = process.env.REACT_APP_MAIN_URL;

  const [postData, setPostData] = useState([])
  const [postRender, setPostRender] = useState()

  const getPostData = async ()=>{
    await axios.get(`${apiUrl}/getPost`)
      .then((res)=>{
        setPostData(res?.data?.result)
      })
  }

  useEffect(()=>{
    getPostData()
  },[postRender])

  return (
    <div className='overflow-auto h-screen'>
      <div className="myContainer ">

    {/* ============posts=========== */}

    <div>
      {
        postData?.map((val, ind)=>(
        <div key={ind}>
          <Post postId={val?.id} userId={val?.userId} postImg={val?.imageUrl} profileImg={val?.profileImg} createdAt={val?.createdAt} userName={val?.userName} desc={val?.description} commentCount={val?.commentCount} setPostRender={setPostRender} getPostData={getPostData} />
        </div>
        ))
      }

    </div>
      
      </div>

    </div>
  )
}

export default Home