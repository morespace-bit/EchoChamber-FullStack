import { Link, replace, useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/config";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // login function with email and password
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/SocialPage/feed", { replace: true });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  }

  // login functin with google
  async function googleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/SocialPage/feed", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  // login function with google with mobile
  async function googleLoginMbl() {
    try {
      await signInWithRedirect(auth, googleProvider);
      navigate("/feed", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* main container */}
      <motion.div
        className="bg-rose-50 flex items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* card container */}
        <motion.div
          className="bg-white flex flex-col relative space-y-10 shadow-2xl rounded-2xl m-6 md:pl-15 md:flex-row md:space-x-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* left part container */}
          <motion.div
            className="flex flex-col space-y-5 md:pt-15"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-3">
              <h1 className="text-3xl font-black px-6 font-sans tracking-wide mt-4">
                Log In
              </h1>
              <p className="font-thin px-6 text-gray-600">
                Log in to Exprience the world of non-toxic world. We beieve this
                will be a happy journey.
              </p>
            </div>
            {/* Input type or email */}
            <div className="px-6 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your Email"
                className="px-4 py-5 border border-gray-500 rounded-xs w-full"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Enter your Password"
                className="px-4 py-5 border border-gray-500 rounded-xs w-full"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            {/* Forget password and Next */}
            <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 justify-center items-center px-6 md:justify-between">
              <p className="text-blue-800 md:justify-end">Forget Password</p>
              <button
                onClick={() => {
                  login(email, password);
                }}
                className="px-4 py-5 
                cursor-pointer
                w-full md:w-50 border border-gray-500 rounded-xs  bg-sky-700 text-white  hover:shadow-2xl shadow-blue-800/50"
              >
                Next
              </button>
            </div>
            <div className="mx-6 border-b-2 border-gray-300"></div>
            <div className="px-6 flex justify-center item">
              <p className="font-thin">or login with</p>
            </div>
            {/* Social media method */}
            <motion.div
              className="flex flex-col md:flex-row px-6 space-y-6 mb-10 md:space-y-0  md:justify-around"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button className="flex justify-center items-center space-x-4 border-2 border-gray-300 py-2 hover:shadow-2xl duration-150 ease-in-out md:px-8">
                <img
                  src={"/facebook.png"}
                  alt="facebook-icon"
                  className="w-10"
                />
                <p>Facebook</p>
              </button>

              <button
                className="flex
                cursor-pointer
                shadow-xl
                shadow-blue-500
                justify-center items-center space-x-4 border-2 border-gray-300 py-2 hover:shadow-2xl duration-150 ease-in-out md:px-8"
                onClick={googleLogin}
              >
                <img src={"/google.png"} alt="google-icon" className="w-10" />
                <p>Google</p>
              </button>
            </motion.div>
            {/* if not signed in yet */}
            <div className="flex justify-center items-center">
              <Link to="/signup" replace={true}>
                <button className="bg-sky-700 rounded p-4 hover:bg-blue-800 duration-75 ease-in capitalize text-white cursor-pointer">
                  not signed in yet
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className=" hidden md:block md:flex justify-center items-center h-150"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <img src={"/welcome.png"} alt="" className="h-100" />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
