import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Animation.css";

function Forlogin() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/SocialPage/feed", { replace: true });
    }, 5000);
  }, []);
  return (
    <>
      <div className="wrapper text-xs font-black p-4 md:text-2xl text-rose-300">
        <div className="typing-demo">Welcome to EchoChamber!</div>
        <div className="typing-demo2 text-[2px]">
          Where your voice finds its echo.
        </div>
      </div>
    </>
  );
}

export default Forlogin;
