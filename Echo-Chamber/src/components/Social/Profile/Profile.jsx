import { useEffect, useState } from "react";
import { auth, db } from "../../Firebase/config";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router-dom";
import About from "./About";
import ProfileFeed from "./ProfileFeed";
import EditProfile from "./EditProfile";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [u_id, setUId] = useState("");
  const [userData, setUserData] = useState({});
  const [button, setButton] = useState({
    1: true,
  });

  const [editProfile, setEditProfile] = useState(false);

  const { id } = useParams();
  console.log(id);

  // function to set the user profile details

  // async function Upload() {
  //   if (!url || !username) {
  //     alert("Please upload an image and enter a username before submitting.");
  //     return;
  //   }

  //   // Save user data to Firestore using setDoc
  //   const userRef = doc(db, "User", u_id);
  //   await setDoc(userRef, {
  //     username: username,
  //     Photo: url,
  //   });

  //   navigate("/welcome", { replace: true });
  // }

  // function to toogel for the button such as about post and so on

  function toogle(id) {
    setButton((pre) => {
      return {
        [id]: true,
      };
    });
    console.log(button);
  }

  // function to get user profile

  async function getUserProfile() {
    if (!id) return;
    const profileRef = doc(db, "User", id);
    const res = await getDoc(profileRef);
    setUserData(res.data());
    console.log(res.data());
  }
  // the use effect function to get the user data
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

  // the useeffect funtion to load data on the first mounting of the data
  useEffect(() => {
    getUserProfile();
  }, [id]);
  return (
    <>
      {/* the body part of the profile */}
      <div className="h-full bg-gray-200 flex  relative overflow-x-hidden flex-col items-center overflow-y-hidden dark:bg-gray-900">
        {/* the main container */}
        {/* the card container */}
        <div className="flex bg-white px-2  h-105 mt-5 rounded-2xl w-100 flex-col items-center md:w-150 dark:bg-gray-600">
          {/* the image and person name */}
          {/* main container or the card of the profile */}
          <div
            className="rounded-full  overflow-hidden w-50 h-50 mt-4"
            title="Visit profile"
          >
            <img
              src={userData?.Photo}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-xl font-semibold">{userData?.username}</p>
          {u_id == id ? (
            <button
              onClick={() => {
                setEditProfile((pre) => !pre);
              }}
              className="mt-1 bg-blue-300 p-2 px-3 rounded-xs flex flex-row gap-2 items-center hover:scale-105 hover:bg-blue-800 cursor-pointer"
            >
              <img src="/edit.png" alt="" className="w-5" />
              Edit profile
            </button>
          ) : (
            " Peace is always the option."
          )}

          {/* the edit profile component  */}

          {editProfile && (
            <EditProfile
              setEditProfile={setEditProfile}
              u_id={u_id}
              getUserProfile={getUserProfile}
            />
          )}
          {/* the profile info */}
          <div className=" flex gap-4 bg-gray-200  w-full py-5 justify-center items-center rounded-2xl mt-3 px-2 dark:bg-gray-400 capitalize">
            {/* for the job */}
            <div className="flex gap-1">
              <img src="/job-seeker.png" alt="" className="w-6" />
              <p>{userData.employment ? userData.employment : "NA"}</p>
            </div>

            {/* relationship status */}
            <div className="flex gap-1">
              <img src="/heart.png" alt="" className="w-6" />
              <p>{userData.relation ? userData.relation : "NA"}</p>
            </div>

            {/* location  */}

            <div className="flex gap-1">
              <img src="/location.png" alt="" className="w-6" />
              <p>{userData.location ? userData.location : "NA"}</p>
            </div>
          </div>
          {/* the divider */}
          <div className="border-1 border-gray-400 w-full mt-3"></div>
          {/* the nav bar for the profile like about post and so on */}
          <div className="flex mt-2 items-center justify-between w-full px-4 font-bold">
            <p
              onClick={() => {
                toogle(1);
              }}
              className={`cursor-pointer ${
                button[1] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              Post
            </p>
            <p
              onClick={() => {
                toogle(2);
              }}
              className={`cursor-pointer ${
                button[2] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              About
            </p>
            <p
              onClick={() => {
                toogle(3);
              }}
              className={`cursor-pointer ${
                button[3] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              Activity
            </p>
            <p
              onClick={() => {
                toogle(4);
              }}
              className={`cursor-pointer ${
                button[4] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              Events
            </p>
          </div>
        </div>
        {button[2] && <About userData={userData} />}
        {button[1] && <ProfileFeed id={id} />}
      </div>
    </>
  );
}
