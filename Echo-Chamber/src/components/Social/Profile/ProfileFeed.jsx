import { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/config";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
  limit,
  startAfter,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Comment from "../Creating/Comment";

export default function ProfileFeed({ id }) {
  const [img, setImg] = useState([]);
  const [userData, setUserData] = useState(null);
  const [u_id, setUId] = useState(""); // Use state for UID
  const [imageUpload, setImageUpload] = useState(false);
  const [post, setPost] = useState(null);
  const [likedPost, setLikedPost] = useState({});
  const [commentPost, setCommentPost] = useState({});
  const [likesOfPost, setLikesOfPost] = useState(null);

  // function to set liked and unlike ui
  const like = (id) => {
    setLikedPost((pre) => {
      return {
        ...pre,
        [id]: !pre[id],
      };
    });
    console.log(likedPost);
  };

  const comment = (id) => {
    setCommentPost((pre) => {
      return {
        ...pre,
        [id]: !pre[id],
      };
    });
  };

  // getting user post form the firebase firestore
  async function getPost() {
    let postRef = collection(db, "Post");
    let q = query(postRef, orderBy("CreatedAt", "desc"));
    let res = await getDocs(q);
    let data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const filtred = data.filter((d) => d.Uid === id);
    setPost(filtred);
  }

  // geting user profile form firebase
  async function getUserProfile() {
    if (!id) return;
    const profileRef = doc(db, "User", id);
    const res = await getDoc(profileRef);
    if (res.exists()) {
      setUserData(res.data());
    } else {
      console.log("No profile found");
    }
  }

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

  useEffect(() => {
    getUserProfile();
    getPost();
  }, [id]);

  if (post?.length === 0) {
    return (
      <div className="h-80 w-150 bg-gray-100 mt-2 rounded-xl flex justify-center items-center dark:bg-gray-600 dark:text-white">
        <p>No post by user yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* // the main container of the body part */}
      {post?.map((i) => (
        <div
          key={i?.id}
          className="flex p-6 bg-white dark:bg-gray-700 mb-5 rounded-xl shadow-xl max-h-200  flex-col mt-3 max-w-150 dark:text-white overflow-x-hidden"
        >
          {/* upper part */}
          <div className="mb-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
              <img
                src={i.Profile}
                alt="profile-icon"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="tracking-widest">{i?.Username}</p>
              <p className="text-xs">4 hours ago</p>
            </div>
          </div>
          <div className="flex justify-start items-start mb-4">
            <p className="text-left">{i?.Content}</p>
          </div>
          <div className="overflow-hidden object-center rounded-xl">
            <img src={i?.Url} alt="" className="rounded-xl w-full " />
          </div>
          <div className="border-b-2 border-gray-400 dark:border-gray-600 flex justify-center items-center mt-2"></div>
          <div className="flex flex-row px-2 py-2 justify-around">
            <div
              className="flex flex-row gap-2 items-center cursor-pointer"
              onClick={() => {
                like(i.id);
              }}
            >
              <img
                src={likedPost[i.id] ? "/red-love.png" : "/love.png"}
                alt=""
                className="h-6 hover:shadow-4xl hover:shadow-rose-500 duration-75 ease-in active:scale-95 hover:scale-120"
              />
              <p>Likes </p>
            </div>
            <div
              className="flex flex-row gap-2 items-center cursor-pointer hover:shadow-4xl hover:shadow-rose-500 duration-75 ease-in active:scale-95 hover:scale-120"
              onClick={() => {
                comment(i.id);
              }}
            >
              <img src={"/comments.png"} alt="" className="h-6 " />
              <p>Comments</p>
            </div>
          </div>
          <Comment
            userData={userData}
            postId={i.id}
            open={commentPost}
            close={comment}
          />
        </div>
      ))}
    </>
  );
}
