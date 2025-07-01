import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../Firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function UserData() {
  const [u_id, setUId] = useState("");
  const [loding, setLoading] = useState(false);
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
  console.log(u_id);
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  // Upload to Cloudinary and get URL function

  async function fileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    // Correct collection + document ID
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "file-upload");
    data.append("cloud_name", "dvxidzrno");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvxidzrno/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploaded = await res.json();
    setUrl(uploaded.url);
    setLoading(false);
  }

  // Upload data to Firebase Firestore
  async function Upload() {
    if (!url || !username) {
      alert("Please upload an image and enter a username before submitting.");
      return;
    }

    // Save user data to Firestore using setDoc
    const userRef = doc(db, "User", u_id);
    await setDoc(userRef, {
      username: username,
      Photo: url,
    });

    navigate("/welcome", { replace: true });
  }

  return (
    <div className="bg-rose-50 min-h-screen flex justify-center items-center overflow-x-hidden flex-row">
      <div className="bg-white rounded-2xl flex p-20 flex-col gap-4 shadow-2xl">
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your username"
          className="bg-rose-300 p-6 rounded-2xl outline-none  md:text-2xl text-xl"
        />
        <div className="flex flex-col gap-2">
          <p className="px-4 mt-4">Upload a profile picture</p>
          <input
            onChange={fileUpload}
            type="file"
            className="bg-cyan-100 cursor-pointer flex p-6 rounded-2xl hover:scale-105 active:scale-95 duration-150 ease-in"
            placeholder="upload a profile picture"
          />
        </div>
        {loding ? (
          <button className="bg-green-300 p-4 rounded-2xl font-semibold text-xl hover:scale-105 active:scale-95 duration-100 ease-in cursor-pointer">
            {" "}
            Image is processing.
          </button>
        ) : (
          <button
            onClick={Upload}
            className="bg-green-300 p-4 rounded-2xl font-semibold text-xl hover:scale-105 active:scale-95 duration-100 ease-in cursor-pointer"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default UserData;
