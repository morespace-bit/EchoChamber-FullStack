import { useForm } from "react-hook-form";

import { db } from "../../Firebase/config";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { data } from "react-router-dom";
import { useState } from "react";

export default function EditProfile({ setEditProfile, u_id, getUserProfile }) {
  // function to get form data form form uisng the useForm hook
  const [loding, setLoding] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Upload(data);
  };

  // function to set the data about user in the firebase in the User doc
  async function Upload(data) {
    console.log(data);
    if (!data) {
      alert("Please upload");
      return;
    }
    setLoding(true);

    // Save user data to Firestore using setDoc
    const userRef = doc(db, "User", u_id);
    await updateDoc(userRef, {
      location: data.location,
      bio: data.bio,
      education: data.education,
      employment: data.employment,
      relation: data.relation,
      dob: data.dob,
    });
    getUserProfile();
    setLoding(false);
    setEditProfile((pre) => !pre);
  }

  return (
    <>
      {/* the main container */}
      <div className="absolute z-10 top-40 bg-white w-90 p-4 rounded-xl shadow-2xl shadow-blue-400 dark:bg-gray-900 dark:text-white ">
        {/* the user data form  */}

        <form
          className="flex flex-col gap-3 relative p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="" className="flex flex-col text-left">
            Location:
            <input
              required
              type="text"
              placeholder="eg:Kathmandu, Butwal"
              className="border-2 border-black rounded-xl p-2"
              {...register("location")}
            />
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Employment Status:
            <input
              required
              type="text"
              placeholder="eg:Unemployed, student"
              className="border-2 border-black rounded-xl p-2"
              {...register("employment")}
            />
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Relationship Status:
            <select
              required
              name="relation"
              id=""
              className="border-2 border-black rounded-xl p-2"
              {...register("relation")}
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="In Relationship">In relationship</option>
              <option value="Broke">Broke</option>
            </select>
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Date of Birth:
            <input
              type="date"
              placeholder="eg:Broke, single, married"
              className="border-2 border-black rounded-xl p-2"
              {...register("dob")}
            />
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Education:
            <input
              required
              type="text"
              placeholder="eg:Pokhara University, TU"
              className="border-2 border-black rounded-xl p-2"
              {...register("education")}
            />
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Bio:
            <textarea
              required
              {...register("bio")}
              className="outline-none border-2 border-black rounded-xl p-2"
            ></textarea>
          </label>

          {/* the close button */}
          <img
            src="/close.png"
            alt=""
            className="w-8 h-8 absolute right-0 top-0 hover:scale-105 cursor-pointer active:scale-95"
            onClick={() => {
              setEditProfile((pre) => !pre);
            }}
          />

          <button
            type="submit"
            className="bg-black rounded-xl p-2 text-white cursor-pointer"
          >
            {loding
              ? "Your information is being saved please wait"
              : "Save and Continue"}
          </button>
        </form>
      </div>
    </>
  );
}
