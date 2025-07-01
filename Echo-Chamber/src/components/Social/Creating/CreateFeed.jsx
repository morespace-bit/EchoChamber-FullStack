import React, { useEffect, useRef, useState } from "react";
import { db } from "../../Firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function CreateFeed({ userData, setImageUpload, u_id, getPost }) {
  const [content, setContent] = useState(null);
  const [url, setUrl] = useState("");
  const [loding, setLoding] = useState(false);
  const inputRef = useRef(null);

  // function to upload to cloudniary

  async function Upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "file-upload");
    data.append("coud_name", "dvxidzrno");
    setLoding(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvxidzrno/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const upload = await res.json();
    setUrl(upload.url);
    setLoding(false);
  }

  // the actual function to upload to firebase

  async function uploadFirebase() {
    if (!url || !content) {
      alert("Please make sure you are uploading a file and writing content.");
      return;
    }

    let postRef = collection(db, "Post");
    try {
      await addDoc(postRef, {
        Username: userData.username,
        Uid: u_id,
        Content: content,
        Url: url,
        Profile: userData.Photo,
        CreatedAt: serverTimestamp(),
        Likes: 0,
      });
      setImageUpload((pre) => !pre);
      getPost();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="fixed top-30 w-full flex justify-center items-center z-50">
      {/* Card container */}
      <div className="rounded-xl shadow-2xl bg-white dark:bg-zinc-900 dark:text-white flex justify-center items-center flex-col w-110 md:w-140 relative p-4">
        <h1 className="font-semibold text-2xl font-sans">Create post</h1>

        <img
          onClick={() => setImageUpload((pre) => !pre)}
          src={"/close.png"}
          alt="Close"
          className="h-8 absolute right-3 top-2 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer hover:bg-red-300 dark:hover:bg-red-500 transition duration-75 ease-in"
        />

        {/* Divider */}
        <div className="flex border-b-2 border-gray-200 dark:border-gray-600 w-full mt-2 mb-2"></div>

        {/* Text input */}
        <div className="flex flex-row justify-start w-full">
          <input
            ref={inputRef}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder={`What's on your mind, ${userData?.username}`}
            className="w-full px-3 outline-none placeholder:text-xl bg-transparent text-black dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        {/* File Upload */}
        <div className="border-2 border-gray-100 dark:border-gray-600 rounded-xl mt-3">
          <input
            onChange={Upload}
            type="file"
            className="h-50 bg-gray-300 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-75 ease-in rounded-2xl p-2 w-full text-black dark:text-white"
          />
        </div>

        {/* Post Button */}
        <div className="w-full flex items-center justify-center mt-4">
          {loding ? (
            <button className="bg-blue-300 dark:bg-blue-800 text-black dark:text-white w-full rounded-xl p-2 hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-75 ease-in active:scale-95 hover:scale-105">
              Image is being processed
            </button>
          ) : (
            <button
              className="bg-blue-300 dark:bg-blue-800 text-black dark:text-white w-full rounded-xl p-2 hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-75 ease-in active:scale-95 hover:scale-105"
              onClick={uploadFirebase}
            >
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateFeed;
