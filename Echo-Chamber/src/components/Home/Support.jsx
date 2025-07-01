import HomeNav from "./HomeNav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import ReackMarkdown from "react-markdown";

import { GoogleGenAI } from "@google/genai";

export default function Support() {
  const [isOpen, setIsOpen] = useState(false);
  const [qs, setQs] = useState([]);
  const [o, setO] = useState({});
  const [userQ, setUserQ] = useState("");
  const [loding, setLoding] = useState(false);
  const [response, Setresponse] = useState(
    "Ask me any questions related to Echo-Chamber?"
  );

  // function to get the gemmini ai response
  const apiKey = import.meta.env.VITE_GENAI_API;
  const ai = new GoogleGenAI({ apiKey: apiKey });
  async function aires() {
    const role = `You are Echo, the AI assistant for Echo Chamber, a peaceful, non-political social platform focused on genuine conversations and shared interests. Answer questions clearly and briefly, emphasizing Echo Chamber's values of respect, privacy, user control, and peaceful interactions. Always mention that Echo Chamber is free, with no political content allowed, and that users can customize their feeds, report toxic behavior, and enjoy a safe, non-toxic environment. Let users know the platform works well on mobile browsers but doesn’t have a mobile app yet. Ensure data privacy and user safety in every response. If a question is unrelated to the platform, reply with: “I’m here to help with Echo Chamber—ask me anything about the platform!” For political questions, politely redirect by saying: “Echo Chamber is designed to be a non-political space, focused on meaningful conversations around shared interests.” If asked about toxic behavior or inappropriate content, respond: “Echo Chamber is committed to a respectful, safe environment. If you encounter toxic behavior, you can report it, and our team will review it promptly.”`;
    setLoding(true);
    const user = ` Here is the first question ${userQ}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${role} ${user}`,
    });
    console.log(`${role} ${user}`);
    Setresponse(response.text);
    console.log(response.text);
    setLoding(false);
  }

  // function to get the questions form firebaser database
  async function getQuestions() {
    const qRef = collection(db, "faqs");

    const res = await getDocs(qRef);
    let data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setQs(data);
    console.log(data);
  }

  // function to open the text answer

  function open(id) {
    setO((pre) => {
      return {
        ...pre,
        [id]: !pre[id],
      };
    });
  }

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      {/* main container */}
      <div className="flex items-center justify-between p-3 bg-blue-800 md:px-10 cursor-pointer shadow-2xl shadow-blue-800 sticky top-0 z-10">
        {/* for logo */}
        <Link to="/">
          <div className="flex gap-2 items-center">
            <img src="/Main-logo.png" alt="" className="w-10 md:w-15" />
            <p className="text-2xl md:text-3xl text-white font-semibold font-mono">
              Echo-Chamber.
            </p>
          </div>
        </Link>
        {/* the hamburger sing and login button and other stuff*/}
        <div className="flex flex-row md:gap-10 gap-3 justify-center items-center">
          {/* the nav elements for md dispaly */}
          <div className="md:block hidden">
            <div className="flex justify-around gap-4 ">
              <Link to="/">
                <p className="font-semibold p-2 text-left px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer text-white rounded-xl hover:shadow-2xl shadow-cyan-200">
                  Home
                </p>
              </Link>
            </div>
          </div>
          <Link to="/login">
            <button className="bg-white py-2 px-5 cursor-pointer hover:bg-sky-400 hover:text-white rounded-xs duration-100 ease-initial font-semibold hover:shadow-2xl shadow-cyan-200">
              Login
            </button>
          </Link>

          {/* hamburger sign  */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group h-8 w-8 rounded-lg  flex items-center justify-center"
            >
              <div className="grid justify-items-center gap-1.5 transition-all duration-300 ease-in-out">
                <span
                  className={`h-1 w-8 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`h-1 w-8 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                    isOpen ? "scale-x-0" : ""
                  }`}
                ></span>
                <span
                  className={`h-1 w-8 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* body section */}

      <div className="min-h-screen flex bg-rose-50 ">
        {/* Main Container */}
        <div className="flex flex-col w-full py-16 px-4 bg-rose-50 items-center">
          {/* Header */}
          <p className="text-4xl font-semibold font-[Oswald] text-gray-800 tracking-wider mb-8">
            Hello, How can we help you?
          </p>

          {/* Message Section */}
          <div className="w-full max-w-2xl p-6 space-y-6">
            {/* Input Section */}
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                className="w-full bg-white  border-gray-300 rounded-lg py-4 px-5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                placeholder="Ask a Question"
                value={userQ}
                onChange={(e) => setUserQ(e.target.value)}
              />
              <button
                className="bg-blue-600 py-2 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 duration-75 ease-in-out cursor-pointer w-full sm:w-40"
                onClick={aires}
              >
                Send
              </button>
            </div>

            {/* AI Response */}
            {response && (
              <div className="bg-rose-200 p-5 rounded-lg shadow-inner mt-5 text-left">
                {loding ? (
                  <>
                    <p>Your question is being processed plese wait.</p>
                    <div
                      class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                      role="status"
                      aria-label="loading"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>{" "}
                  </>
                ) : (
                  ""
                )}
                <ReackMarkdown children={response} />
              </div>
            )}
          </div>

          {/* Frequently Asked Questions Section */}
          <div className="mt-16 w-full max-w-2xl space-y-4">
            <p className="text-3xl font-semibold font-sans text-gray-800">
              Frequently Asked Questions
            </p>
            <div className="space-y-4">
              {qs.map((q) => (
                <div key={q.id} className="flex flex-col">
                  <div
                    className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:bg-gray-100 transition duration-200"
                    onClick={() => {
                      open(q.id);
                      console.log("Clicked");
                    }}
                  >
                    {/* Question */}
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-800">
                        {q.q}
                      </p>
                      <p className="text-2xl text-gray-600">
                        {o[q.id] ? "-" : "+"}
                      </p>
                    </div>

                    {/* Answer */}
                    <AnimatePresence>
                      {o[q.id] === true && (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="text-gray-600 mt-3">{q.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
