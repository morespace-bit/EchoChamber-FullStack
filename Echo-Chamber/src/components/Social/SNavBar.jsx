import React, { useEffect, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Noti from "./Noti";

function SNavBar() {
  const [isOpen, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [u_id, setUId] = useState("");
  const [noti, setNoti] = useState(false);
  const [mode, setMode] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Handle user authentication state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User UID:", user.uid);
        setUId(user.uid); // Set the UID in state
      } else {
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  // function to change to light mode
  let onoff = null;
  function light() {
    onoff = false;
    document.documentElement.classList.remove("dark");
    localStorage.setItem("onoff", "false");
  }

  function dark() {
    onoff = false;
    document.documentElement.classList.add("dark");
    localStorage.setItem("onoff", "true");
  }

  // geting user profile form firebase
  async function getUserProfile() {
    if (!u_id) return;
    const profileRef = doc(db, "User", u_id);
    const res = await getDoc(profileRef);
    if (res.exists()) {
      setUserData(res.data());
    } else {
      console.log("No profile found");
    }
  }

  useEffect(() => {
    const value = localStorage.getItem("onoff");
    console.log(value);
    if (value === "true") {
      dark();
    }
    getUserProfile();
  }, [u_id]);

  async function signout() {
    await signOut(auth);
    navigate("/", { replace: true });
  }

  return (
    <>
      {/* main container */}
      <div className="bg-white w-full flex px-4 py-6 justify-between items-center md:px-10 sticky top-0 overflow-x-hidden shadow-2xs z-10 dark:bg-gray-700 dark:text-white">
        {/* logo */}
        <div>
          <Link to="feed">
            <h1 className="font-black text-xl md:text-3xl text-black dark:text-white font-serif cursor-pointer">
              Echo-Chamber.
            </h1>
          </Link>
        </div>

        {/* search bar */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl px-4 py-2 flex gap-2">
          <img src="/search.svg" alt="" className="invert dark:invert-0" />
          <input
            type="text"
            className="outline-none md:w-50 w-20 lg:w-90 bg-transparent text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-300"
            placeholder="Search for vibes and peace"
          />
        </div>

        {/* profile and notification */}
        <div className="flex items-center gap-3 md:gap-10">
          <img
            onClick={() => {
              setNoti((pre) => !pre);
            }}
            src="/notification.png"
            alt=""
            className="w-6 cursor-pointer  hover:scale-105 active:scale-95 transition-all  "
            title="Notifications"
          />

          <div
            onClick={() => {
              setOpen((pre) => !pre);
              setNoti(false);
            }}
            className="rounded-full overflow-hidden w-10 h-10  hover:scale-105 active:scale-95 transition-all"
            title="Account"
          >
            <img
              src={userData?.Photo}
              alt=""
              className="object-cover w-full h-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* The notification dropdown */}
      {noti && <Noti />}
      {/* profile dropdown box */}
      {noti == false && (
        <div className="bg-white dark:bg-gray-600 dark:text-white w-60 fixed right-6 h-80 top-25 shadow-2xl rounded-xl flex p-6 hidden md:block z-10">
          {/* image + username */}
          <div className="flex gap-3">
            <div
              className="rounded-full overflow-hidden w-12 h-12"
              title="Account"
            >
              <img
                src={userData?.Photo}
                alt=""
                className="object-cover w-full h-full cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-xl font-semibold text-left">
                {userData?.username}
              </p>
              <p className="text-left text-xs text-gray-600 dark:text-gray-400">
                A Peace lover
              </p>
            </div>
          </div>

          {/* profile button */}
          <Link to={`/SocialPage/profile/${u_id}`}>
            <button className="mt-2 bg-blue-200 dark:bg-blue-800 text-black dark:text-white p-2 rounded w-full cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition">
              View profile
            </button>
          </Link>

          {/* menu options */}
          <div className="flex flex-col mt-4 gap-3">
            <div className="flex flex-row gap-2 group cursor-pointer">
              <img src="/settings.png" alt="" className="w-5" />
              <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                Settings and privacy
              </p>
            </div>
            <Link to="/support">
              <div className="flex flex-row gap-2 group cursor-pointer">
                <img src="/support.png" alt="" className="w-5" />
                <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                  Support and Help
                </p>
              </div>
            </Link>
          </div>

          {/* signout section */}
          <div className="border-b border-gray-400 dark:border-gray-600 w-full mt-4"></div>
          <div
            className="flex flex-row gap-2 group mt-3 cursor-pointer"
            onClick={signout}
          >
            <img src="/signout.png" alt="" className="w-5" />
            <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
              Sign out
            </p>
          </div>
          <div className="border-b border-gray-400 dark:border-gray-600 w-full mt-4 mb-4"></div>

          {/* dark mode toggle */}
          <div className="flex flex-row justify-around items-center">
            <p className="text-xl">Mode:</p>
            <img
              src="/night-mode.png"
              alt="Dark"
              className={`w-8   rounded cursor-pointer ${
                mode[1] ? "bg-blue-500 rounded-xl p-2" : ""
              }`}
              onClick={() => {
                dark();
                setMode({ 1: true });
                console.log(mode);
              }}
            />
            <img
              src="/light.png"
              alt="Light"
              className={`w-8  dark:hover:bg-gray-600 rounded cursor-pointer ${
                mode[2] ? "bg-blue-500 rounded-xl p-2" : ""
              }`}
              onClick={() => {
                light();
                setMode({ 2: true });
                console.log(mode);
              }}
            />
          </div>
        </div>
      )}

      {/* for the mobiel version */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-600 dark:text-white max-w-xs w-full fixed right-4 top-24 shadow-2xl rounded-xl p-4 flex flex-col gap-4 sm:w-60 sm:p-6 sm:right-6 sm:top-25 md:hidden z-10">
          {/* image + username */}
          <div className="flex gap-3 items-center">
            <div
              className="rounded-full overflow-hidden w-12 h-12"
              title="Account"
            >
              <img
                src={userData?.Photo}
                alt="User Avatar"
                className="object-cover w-full h-full cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{userData?.username}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                A Peace lover
              </p>
            </div>
          </div>

          {/* profile button */}
          <Link to={`/SocialPage/profile/${u_id}`} className="w-full">
            <button
              onClick={() => {
                setOpen((pre) => !pre);
              }}
              className="bg-blue-200 dark:bg-blue-800 text-black dark:text-white p-2 rounded w-full cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              View profile
            </button>
          </Link>

          {/* menu options */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 group cursor-pointer">
              <img src="/settings.png" alt="Settings" className="w-5" />
              <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                Settings and privacy
              </p>
            </div>

            <div className="flex items-center gap-2 group cursor-pointer">
              <img src="/support.png" alt="Support" className="w-5" />
              <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                Support and Help
              </p>
            </div>
          </div>

          {/* signout section */}
          <div className="border-b border-gray-400 dark:border-gray-600 w-full" />
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={signout}
          >
            <img src="/signout.png" alt="Sign out" className="w-5" />
            <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
              Sign out
            </p>
          </div>
          <div className="border-b border-gray-400 dark:border-gray-600 w-full" />

          {/* dark mode toggle */}
          <div className="flex justify-around items-center mt-2">
            <p className="text-base">Mode:</p>
            <img
              src="/night-mode.png"
              alt="Dark"
              className={`w-8   rounded cursor-pointer ${
                mode[1] ? "bg-blue-500 rounded-xl p-2" : ""
              }`}
              onClick={() => {
                dark();
                setMode({ 1: true });
                console.log(mode);
              }}
            />
            <img
              src="/light.png"
              alt="Light"
              className={`w-8  dark:hover:bg-gray-600 rounded cursor-pointer ${
                mode[2] ? "bg-blue-500 rounded-xl p-2" : ""
              }`}
              onClick={() => {
                light();
                setMode({ 2: true });
                console.log(mode);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SNavBar;
