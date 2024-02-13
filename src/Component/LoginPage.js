import React, { useState } from 'react'

const LoginPage = () => {

    const [signup , setSignup] = useState(false)

  return (
    <>
        <div className="w-screen h-screen m-auto">
            <div className="h-full w-[80%] max-w-[1200px] m-auto">
                <div className="flex justify-between w-[80%] h-full m-auto">
                {
                    signup?null:(<div className="w-[50%] grid place-items-center">
                    <img src="SignUpImg.png" alt="signup" />
                </div>)
                }
                
                <div className="w-[50%] flex flex-col p-10 m-auto">

                    <form className='flex flex-col gap-3 border p-8 mb-3'>
                    <img src="logo.png" alt="" height="100px" width="60%" className='m-auto my-5' />
                    
                        <input type="email" name="email" id="email" className='border p-3' placeholder='enter your email' />

                        {
                            signup?(
                                <>
                                <input type="text" name="fullName" id="fullName" className='border p-3' placeholder='enter your fullName' />
                                <input type="text" name="userName" id="userName" className='border p-3' placeholder='enter your userName' />
                                </>
                            ):null
                        }

                        <input type="password" name="email" id="email" className='border p-3' placeholder='enter your password' />

                        {
                            signup?(
                                <input type="submit" value="Sign Up" className='border p-3 bg-blue-600 text-white rounded-md' />
                            ):(
                                <input type="submit" value="Log in" className='border p-3 bg-blue-600 text-white rounded-md' />
                            )
                        }


                    <span className='w-[100%] text-center my-5 text-blue-800 cursor-pointer'>Forgot password?</span>
                    {
                            signup?(
                                <span className='text-blue-600 cursor-pointer text-center mx-1' onClick={()=>setSignup(false)}>Sign In</span>
                            ):null
                        }
                    </form>
                    {
                        signup?null:(
                            <div className=' border p-5'>
                        <p className='text-center mx-2'>Don't have an account? 
                        {
                            signup?(
                                <span className='text-blue-600 cursor-pointer mx-1' onClick={()=>setSignup(false)}>Sign In</span>
                            ):(
                                <span className='text-blue-600 cursor-pointer mx-1' onClick={()=>setSignup(true)}>Sign up</span>
                            )
                        }
                        </p>
                    </div>
                        )
                    }


                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage