export default function About({ userData }) {
  console.log(userData);
  return (
    <>
      {/* the main container */}
      <div className="flex bg-zinc-400  mt-5 rounded-xl py-4  shadow-xl  justify-center items-center mb-4 dark:bg-gray-600 text-left dark:text-white w-100 md:w-150 ">
        {/* the about section container */}
        <div className="px-4 w-full">
          <p className="text-xl font-bold">Profile info</p>
          {/* the overview part */}
          <div className="flex mt-4 border-blue-300 border-1 rounded-xl flex-col py-2 text-left px-2">
            <p className=" font-bold">Overview</p>
            <div className="mt-2 text-gray-800 dark:text-white">
              {userData.bio ? userData.bio : "NA"}
            </div>
          </div>
          {/* the other parts such as date of birth and relatieion ship status so on */}
          <div className="flex mt-5 border-2 border-gray-300 rounded-xl py-2 px-2 gap-2">
            <img src="/calendar.png" alt="" className="w-6" />
            <p>Date of Birth: {userData.dob ? userData.dob : "NA"}</p>
          </div>

          <div className="flex mt-5 border-2 border-gray-300 rounded-xl py-2 px-2 gap-2">
            <img src="/heart.png" alt="" className="w-6" />
            <p>Status: {userData.relation ? userData.relation : "NA"}</p>
          </div>

          <div className="flex mt-5 border-2 border-blue-300 rounded-xl py-2 px-2 gap-2">
            <img src="/edu.png" alt="" className="w-6" />
            <p>Education: {userData.education ? userData.education : "NA"}</p>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
}
