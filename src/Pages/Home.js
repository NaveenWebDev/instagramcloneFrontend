import React, { useEffect, useState } from 'react'
import Post from '../Component/Post'
import axios from 'axios'

const Home = () => {

  const apiUrl = process.env.REACT_APP_MAIN_URL;

  const [postData, setPostData] = useState([])

  const getPostData = async ()=>{
    await axios.get(`${apiUrl}/getPost`)
      .then((res)=>{
        // console.log(res?.data?.result)
        setPostData(res?.data?.result)
      })
  }

  useEffect(()=>{
    getPostData()
  },[])

  return (
    <div className='overflow-auto h-screen'>
      <div className="myContainer ">

    {/* ============posts=========== */}

    <div>
      {
        postData?.map((val, ind)=>(
        <div key={ind}>
          <Post postImg={val?.imageUrl} profileImg={val?.profileImg} createdAt={val?.createdAt} userName={val?.userName} desc={val?.description} />
        </div>
        ))
      }

    </div>
      
      </div>

    </div>
  )
}

export default Home