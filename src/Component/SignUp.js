import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_MAIN_URL;
  console.log(apiUrl)

  const signupSchema = Yup.object({
    email:Yup.string().email().required("email is required"),
    fullName:Yup.string().min(2).max(25).required("fullName is required"),
    userName:Yup.string().min(2).max(25).required("userName is required"),
    password:Yup.string().min(6).required("password is required"),
    confirmPassword:Yup.string().min(6).required("confirmPassword is required").oneOf([Yup.ref("password"), null, "password must  match"])
  })

  const initialValues = {
    email:"",
    fullName:"",
    userName:"",
    password:"",
    confirmPassword:""
}

const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues: initialValues,
    validationSchema:signupSchema,
    onSubmit: async(value, action) => {
      try{

        const data = await axios.post(`${apiUrl}/api/v1/signup`, value) 
        .then(res=>{
          toast.success("SignUp Successfully")
          action.resetForm();
          let userDatas = res?.data?.user
          userDatas.password = ""
          localStorage.setItem("userData", JSON.stringify(userDatas))
        })
        .catch(err=>{
          toast.error(err.response.data.message)
          console.log(err.message)
        })
        
      }catch(err){
        console.log(err.message)
      }

    },

});
// console.log(localStorage.getItem("userData"));
  return (
    <>
        <ToastContainer/>
      <div className=" h-screen m-auto">
        <div className="h-full w-[100%] max-w-[1200px] m-auto">
          <div className="flex justify-between w-[100%] h-full m-auto">

            <div
              className={`w-[70%] flex flex-col p-10 m-auto`}
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 border p-5 mb-3 shadow-2xl"
              >
                <img
                  src="logo.png"
                  alt=""
                  height="100px"
                  width="80%"
                  className="m-auto my-5"
                />
                <div className="w-[100%]">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border p-3 w-[100%]"
                  placeholder="enter your email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="text-red-600 m-0 p-0">{errors.email}</p>
                </div>

                    <div>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="border p-3 w-[100%]"
                      placeholder="enter your fullName"
                      value={values.fullName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className="text-red-600 m-0 p-0">{errors.fullName}</p>
                    </div>

                    <div>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      className="border p-3 w-[100%]"
                      placeholder="enter your userName"
                      value={values.userName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className="text-red-600 m-0 p-0">{errors.fullName}</p>
                    </div>

                <div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border p-3 w-[100%]"
                  placeholder="enter your password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                    <p className="text-red-600 m-0 p-0">{errors.password}</p>

                </div>
                    <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="border p-3 w-[100%]"
                      placeholder="ConfirmPassword"
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className="text-red-600 m-0 p-0">{errors.confirmPassword}</p>

                    </div>

                    <input
                      type="submit"
                      value="Sign Up"
                      className="border p-3 bg-blue-600 text-white rounded-md cursor-pointer"
                    />


              

                <span className="w-[100%] text-center my-5 text-blue-800 cursor-pointer">
                  Forgot password?
                </span>
          
                  <span
                    className="text-blue-600 cursor-pointer text-center mx-1"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </span>
     
              </form>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
