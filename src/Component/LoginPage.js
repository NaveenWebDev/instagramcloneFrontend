import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
        email:"",
        password:"",
    },
    onSubmit: (value, action) => {
      console.log(value);
      action.resetForm();
    },
  });

  // const signupCall =
  return (
    <>
      <div className=" h-screen m-auto">
        <div className="h-full w-[100%] max-w-[1200px] m-auto">
          <div className="flex justify-between w-[100%] h-full m-auto">
 
            <div className="w-[50%] grid place-items-center">
                <img src="SignUpImg.png" alt="signup" />
            </div>


            <div
              className={`w-[50%] flex flex-col p-10 m-auto`}
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 border p-5 mb-3 shadow"
              >
                <img
                  src="logo.png"
                  alt=""
                  height="100px"
                  width="80%"
                  className="m-auto my-5"
                />

                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border p-3"
                  placeholder="enter your email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border p-3"
                  placeholder="enter your password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                  <input
                    type="submit"
                    value="Log in"
                    className="border p-3 bg-blue-600 text-white rounded-md cursor-pointer"
                  />

                <span className="w-[100%] text-center my-5 text-blue-800 cursor-pointer">
                  Forgot password?
                </span>
              </form>

              
                <div className=" border p-5 shadow">
                  <p className="text-center mx-2 text-[0.8rem]">
                    Don't have an account?
                      <span 
                        className="text-blue-600 cursor-pointer mx-1"
                        onClick={() => navigate("/sign-up")}
                      >
                        Sign Up
                      </span>
                  </p>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
