import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { auth, db } from "../Firebase/config";
import { Link } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  limit,
  startAfter,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import CreateFeed from "./Creating/CreateFeed";
import Comment from "./Creating/Comment";
import SNavBar from "./SNavBar";
import CreateFeedText from "./Creating/CreateFeedText";
export default function Feed() {
  const [userData, setUserData] = useState(null);
  const [u_id, setU_id] = useState(""); // Use state for UID
  const [imageUpload, setImageUpload] = useState(false);
  const [textUpload, setTextUpload] = useState(false);
  const [post, setPost] = useState(null);
  const [commentPost, setCommentPost] = useState({});
  const [loadmore, setLoadmore] = useState(false);
  const [more, setMore] = useState(true);

  // using use reff to make the infinite loding stuff happen

  const buttonRef = useRef(null);
  console.log(buttonRef);

  // to simulate pagination kind of thing like

  const [last, setLast] = useState({});

  // for the timestamp such as this many hours ago and so on
  dayjs.extend(relativeTime);

  const comment = (id) => {
    setCommentPost((pre) => {
      return {
        ...pre,
        [id]: !pre[id],
      };
    });
  };

  // geting user profile form firebase
  async function getUserProfile() {
    if (!u_id) return;
    const profileRef = doc(db, "User", u_id);
    const res = await getDoc(profileRef);
    if (res.exists()) {
      setUserData(res.data());
    } else {
    }
  }

  async function getPost() {
    let postRef = collection(db, "Post");
    let q = query(postRef, orderBy("CreatedAt", "desc"), limit(5));
    let res = await getDocs(q);
    setLast(res.docs[res.docs.length - 1]);
    let data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPost(data);
    setLoadmore(false);

    // loop to set the likes the likesOfPost object
  }

  // pagineted data fetching

  async function getPostPaginated() {
    console.log("pagination func");
    let postRef = collection(db, "Post");
    let q = query(
      postRef,
      orderBy("CreatedAt", "desc"),
      limit(5),
      startAfter(last)
    );
    let res = await getDocs(q);
    // a method provided by firebase to see if there are dcos or it is empty
    // if (res.empty) {
    //   setMessage("No more data");
    //   // setMore(false);
    //   // setLoadmore(false);
    //   setLoadmore(false);
    //   return;
    // }
    setLast(res.docs[res.docs.length - 1]);
    let data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPost((pre) => [...pre, ...data]);
    console.log(data);
    console.log(post);
    setLoadmore(false);
  }

  // to get the user id
  useEffect(() => {
    // handle user authentication state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setU_id(user.uid); // Set the UID in state
      } else {
      }
    });
  }, []);

  // use effect to load initial data

  useEffect(() => {
    getUserProfile();
    getPost();
  }, [u_id]);

  // useEffect to do the infinite scrool using the intersection observer
  // useEffect(() => {
  //   // if (!more) {
  //   //   return;
  //   // }
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const entry = entries[0];
  //       if (entry.isIntersecting) {
  //         // now doing the paganeted call to the funcion
  //         // setLoadmore(true);
  //         getPostPaginated();
  //       }
  //     },
  //     { threshold: 1 }
  //   );

  //   if (buttonRef.current) {
  //     observer.observe(buttonRef.current);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (more && loadmore) {
  //     // calling the pagineted data
  //     getPostPaginated();
  //   }
  // }, [more, loadmore]);

  if (post === null) {
    return (
      <>
        <div
          role="status"
          className="h-screen flex justify-center items-center"
        >
          <svg
            aria-hidden="true"
            class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white overflow-x-hidden">
      <div className="flex w-full md:justify-between items-center justify-center flex-9/12 overflow-x-hidden overflow-y-auto">
        {/* Left part */}
        <div className="hidden md:block fixed left-0 top-30 h-full overflow-x-hidden">
          {/* card container */}
          <div className="flex flex-col p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl ml-4 shadow-2xl h-[80%] mb-4">
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/group.png"} alt="" className="h-8" />
              <p>Friends</p>
            </div>

            <div className="flex flex-row items-center gap-2 mb-3 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/history.png"} alt="" className="h-6" />
              <p>Memories</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/vibes.png"} alt="" className="h-6" />
              <p>Vibes</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/peace.png"} alt="" className="h-8" />
              <p>Peace</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/cpu.png"} alt="" className="h-8" />
              <p>Tech News</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/home.png"} alt="" className="h-8" />
              <p>Home Feed</p>
            </div>
          </div>
        </div>

        {/* Center part */}
        <div className="w-full text-center p-6 flex justify-center items-center flex-col overflow-y-auto overflow-x-hidden">
          {/* Create feed and user name part */}
          <div className="flex p-6 bg-white dark:bg-gray-700 mb-5 rounded-xl shadow-xl max-w-150 flex-col gap-4">
            <div className="flex flex-row gap-6">
              <div className="rounded-full overflow-hidden w-10 h-10 ">
                <img
                  src={userData?.Photo}
                  alt=""
                  className="object-cover w-full h-full cursor-pointer"
                />
              </div>
              <input
                type="text"
                className="bg-gray-200 dark:bg-gray-600 rounded-2xl px-5 py-3 w-80 md:w-120 cursor-pointer"
                placeholder={`What's on your mind, ${userData?.username}`}
                onClick={() => {
                  setImageUpload((pre) => !pre);
                }}
              />
            </div>
            <div className="flex flex-row justify-around items-center">
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setImageUpload((pre) => !pre);
                }}
              >
                <img src={"/image.png"} alt="" className="h-10" />
                <p>Images</p>
              </div>
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setTextUpload((pre) => !pre);
                }}
              >
                <img src={"/thought-bubble.png"} alt="" className="h-10" />
                <p>Thoughts</p>
              </div>
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setTextUpload((pre) => !pre);
                }}
              >
                <img src={"/activity.png"} alt="" className="h-10" />
                <p>Activity</p>
              </div>
            </div>
          </div>

          {/* the actual post starts from here */}
          {post?.map((i) => (
            <div
              key={i?.id}
              className="flex p-6 bg-white dark:bg-gray-700 mb-5 rounded-xl shadow-xl max-h-200 max-w-150 flex-col"
              onClick={() => {
                setImageUpload(fasle);
              }}
            >
              <Link to={`/SocialPage/profile/${i.Uid}`}>
                <div className="mb-4 flex items-center gap-4 group">
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 cursor-pointer group-hover:scale-110 active:scale-95"
                    title="Visit profile"
                  >
                    <img
                      src={i.Profile}
                      alt="profile-icon"
                      className="object-cover h-full w-full"
                    />
                  </div>

                  <div className="flex flex-col group-hover:scale-105">
                    <p className="tracking-widest">{i?.Username}</p>
                    <p className="text-xs">
                      {dayjs(i.CreatedAt.toDate()).fromNow()}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex justify-start items-start mb-4">
                <p className="text-left">{i?.Content}</p>
              </div>
              <div className="overflow-hidden rounded-xl">
                {i?.Url && (
                  <img src={i?.Url} className="rounded-xl w-auto h-auto " />
                )}
              </div>
              <div className="border-b-2 border-gray-400 dark:border-gray-600 flex justify-center items-center mt-2"></div>
              <div className="flex flex-row px-2 py-2 justify-around">
                <div
                  className="flex flex-row gap-2 items-center cursor-pointer"
                  onClick={() => {
                    async function likeUnlike(id) {
                      console;
                      const postRef = doc(db, "Post", id);

                      if (!i.likedBy.includes(u_id)) {
                        // like
                        await updateDoc(postRef, {
                          Likes: increment(1),
                          likedBy: arrayUnion(u_id),
                        });
                      } else {
                        // unlike
                        console.log("unlike run");
                        await updateDoc(postRef, {
                          Likes: increment(-1),
                          likedBy: arrayRemove(u_id),
                        });
                      }
                      getPost();
                    }
                    likeUnlike(i.id);
                  }}
                >
                  <img
                    src={
                      i.likedBy.includes(u_id) ? "/red-love.png" : "/love.png"
                    }
                    alt=""
                    className="h-6 hover:shadow-4xl hover:shadow-rose-500 duration-75 ease-in active:scale-95 hover:scale-120"
                  />
                  <p>Likes {i?.Likes}</p>
                </div>
                <div
                  className="flex flex-row gap-2 items-center cursor-pointer hover:shadow-4xl hover:shadow-rose-500 duration-75 ease-in active:scale-95 hover:scale-105"
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

          <button
            ref={buttonRef}
            className="bg-black p-1 text-white hover:scale-105 cursor-pointer  "
            onClick={() => {
              getPostPaginated();
              setLoadmore((pre) => !pre);
            }}
          >
            Load more
          </button>
          {/* The loder that indicates data being loaded */}

          {loadmore && (
            <div role="status" className="mt-2 mb-2">
              <svg
                aria-hidden="true"
                class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>

        {imageUpload == true && (
          <CreateFeed
            userData={userData}
            setImageUpload={setImageUpload}
            u_id={u_id}
            getPost={getPost}
          />
        )}

        {textUpload && (
          <CreateFeedText
            userData={userData}
            setTextUpload={setTextUpload}
            u_id={u_id}
            getPost={getPost}
          />
        )}
      </div>
    </div>
  );
}
