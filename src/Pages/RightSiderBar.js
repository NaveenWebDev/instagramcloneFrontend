import React from 'react'
import ShowProfile from '../Component/ShowProfile'
import profileImg from "../assets/profile.jpg"
import CopyrightIcon from '@mui/icons-material/Copyright';

const RightSiderBar = () => {
  const date = new Date();
let year = date.getFullYear();
  return (
    <>
        <div className='p-5 -z-20'>
            <ShowProfile profileImg={profileImg} userName="naveensharma8266" name="Naveen Sharma" button="Switch" />

          {/* ================================suggested people ========================== */}

          <div className='mt-4'>
              <p className='font-bold text-gray-600'>Suggested for you</p>
            <div className='flex flex-col gap-3 mt-3'>
              <ShowProfile profileImg={profileImg} userName="naveensharma8266" name="Naveen Sharma" button="Follow" />
              <ShowProfile profileImg={profileImg} userName="naveensharma8266" name="Naveen Sharma" button="Follow" />
              <ShowProfile profileImg={profileImg} userName="naveensharma8266" name="Naveen Sharma" button="Follow" />
              <ShowProfile profileImg={profileImg} userName="naveensharma8266" name="Naveen Sharma" button="Follow" />
            </div>

          </div>

          <footer className="mt-10">
          <p className='text-gray-400 text-sm'>About Help Press API Jobs Privacy Terms Locations Language Meta Verified</p>

          <div className='text-gray-400 text-sm mt-5'>
            <CopyrightIcon /> {year} Instagram From NaveenWebDev
          </div>

          </footer>


        </div>
    </>
  )
}

export default RightSiderBar
