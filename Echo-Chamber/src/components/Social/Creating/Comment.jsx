import { useEffect, useState } from "react";
import { db } from "../../Firebase/config";
import { FaReply } from "react-icons/fa";

import {
  collection,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  addDoc,
  getDocs,
} from "firebase/firestore";
import Reply from "./Reply";

export default function Comment({ userData, postId, open, close }) {
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  const [isReply, setIsReply] = useState({});
  const [reply, setReply] = useState("");
  const [trackReply, setTrackReply] = useState({});
  const [repLoding, setRepLoading] = useState(false);

  // getting the comments form the firebase database
  const getComment = async () => {
    const pcommentRef = collection(db, "Post", postId, "comment");
    const q = query(pcommentRef, orderBy("Timestamp", "desc"));
    const res = await getDocs(q);
    const data = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setComment(data);
  };

  // function and state to track whcih reply button is active

  function replyOpen(comment_id) {
    setIsReply((pre) => ({ ...pre, [comment_id]: !pre[comment_id] }));
  }

  // function to track which comment reply post is active
  function replyTrack(comment_id) {
    setTrackReply((pre) => ({ ...pre, [comment_id]: !pre[comment_id] }));
  }

  // posting the comment data to the firebase databse
  const PostComment = async () => {
    if (content.trim().length === 0) {
      alert("Please enter a comment");
      return;
    }
    const commentRef = collection(doc(db, "Post", postId), "comment");
    await addDoc(commentRef, {
      username: userData.username,
      Photo: userData.Photo,
      content: content,
      Timestamp: serverTimestamp(),
    });
    getComment();
    setContent((pre) => {
      return (pre = "");
    });
  };

  // function to post the reply to the firebase database

  const replyPost = async (comment_id) => {
    if (reply.trim().length === 0) {
      alert("Please enter a valid content");
      return;
    }
    setRepLoading(true);

    const replyRef = collection(
      doc(collection(doc(db, "Post", postId), "comment"), comment_id),
      "reply"
    );

    await addDoc(replyRef, {
      username: userData.username,
      Photo: userData.Photo,
      content: reply,
      Timestamp: serverTimestamp(),
    });

    setRepLoading(false);
    setIsReply(false);
    setReply("Add reply...");
  };

  useEffect(() => {
    getComment();
  }, [postId]);

  return (
    <>
      {/* main container for comment add commetn*/}
      <div className="flex w-full  dark:bg-gray-800 mt-3 flex-col p-3 rounded-xl dark:shadow-xl overflow-x-hidden overflow-y-hidden">
        {/* now the add a comment section */}
        <div className="flex items-center gap-3">
          {/* div for making the profile pic circle */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
            <img
              src={userData?.Photo}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          {/* the comment input type div */}
          <div className="flex items-center flex-1 min-w-70 max-w-170 md:w-120 bg-gray-200 dark:bg-gray-700 rounded-xl p-2 cursor-pointer overflow-y-hidden">
            <input
              type="text"
              className="w-full outline-none px-2 bg-transparent text-black dark:text-white cursor-pointer"
              placeholder="Add a comment..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              className="p-2 bg-blue-300 dark:bg-blue-600 px-4 rounded-2xl hover:bg-blue-500 dark:hover:bg-blue-700 hover:scale-105 active:scale-95 duration-75 ease-in cursor-pointer"
              onClick={PostComment}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* the comments of all the people mapped */}
      {open[postId] && (
        <div className="absolute bg-white dark:bg-gray-800 shadow-2xl shadow-blue-200 w-90 rounded-xl h-115 overflow-y-auto md:w-150">
          <div className="mt-3 justify-center items-center flex gap-5 relative">
            <h2 className="text-xl font-semibold dark:text-white">Comments</h2>
            <img
              src={"/close.png"}
              alt=""
              className="h-8 absolute right-4 cursor-pointer hover:scale-120 active:scale-95 duration-75 ease-in"
              onClick={() => {
                close(postId);
              }}
            />
          </div>

          {comment.length === 0 && (
            <div className="mt-20 text-center">
              <p className="text-2xl dark:text-white">No comments</p>
            </div>
          )}
          {/* // the actual comment being mapped here */}
          {comment.map((c) => {
            return (
              // the main container for the comment and reply
              <div className="flex flex-col relative" key={c.id}>
                {/* // the main container of the comment and reply button */}
                <div className="flex gap-3 mt-2 p-2  " key={c.id}>
                  {/* image of the person */}
                  <div className="rounded-full overflow-hidden object-cover w-8 h-8 ">
                    <img
                      src={c.Photo}
                      alt="user-profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* the content and username */}
                  <div className="bg-gray-300 dark:bg-gray-600 flex flex-col pt-3 px-3 pb-0 rounded-2xl relative">
                    <h2 className="text-black dark:text-white text-xl font-semibold text-left ">
                      {c.username}
                    </h2>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-black dark:text-white text-left bg-pink-100 rounded-2xl p-2">
                        {c.content}
                      </p>

                      <p
                        className="text  w-20 hover:scale-105 cursor-pointer  rounded-xl underline active:scale-95 transition-all"
                        onClick={() => {
                          replyTrack(c.id);
                        }}
                      >
                        replies
                      </p>
                    </div>
                  </div>
                  <div
                    className=" flex flex-row gap-2 items-center hover:scale-105 cursor-pointer transition-all"
                    onClick={() => {
                      replyOpen(c.id);
                    }}
                  >
                    {/* the reply button */}
                    <FaReply />
                    <p>reply</p>
                  </div>
                </div>
                {/* the add reply section */}

                {isReply[c.id] && (
                  <div className="flex items-center flex-1 min-w-60 max-w-120 md:w-120 bg-gray-200 dark:bg-gray-700 rounded-xl p-2 cursor-pointer ml-7 mr-20">
                    <input
                      type="text"
                      className="w-full outline-none px-2 bg-transparent text-black dark:text-white cursor-pointer"
                      placeholder="Add a reply..."
                      value={reply}
                      onChange={(e) => {
                        setReply(e.target.value);
                      }}
                    />
                    <button
                      className="p-2 bg-blue-300 dark:bg-blue-600 px-4 rounded-2xl hover:bg-blue-500 dark:hover:bg-blue-700 hover:scale-105 active:scale-95 duration-75 ease-in cursor-pointer"
                      onClick={() => {
                        replyPost(c.id);
                      }}
                    >
                      {setRepLoading == true ? " plese Wait" : "Add"}
                    </button>
                  </div>
                )}

                {/* this is the div to show the user to click to show the replies */}
                {trackReply[c.id] == true && (
                  <Reply userData={userData} postId={postId} cmtId={c.id} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
