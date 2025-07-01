import React from "react";
import SNavBar from "../SNavBar";
import { Outlet } from "react-router-dom";

function SocialPage() {
  return (
    <>
      <SNavBar />
      <Outlet />
    </>
  );
}

export default SocialPage;
