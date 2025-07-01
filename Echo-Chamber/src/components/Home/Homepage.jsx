import React from "react";
import HomeNav from "./HomeNav";
import WhyJoin from "./WhyJoin";
import Who from "./Who";
import Hero from "./Hero";
import EchoChamber from "./EchoChamber";

function Homepage() {
  return (
    <>
      <HomeNav />

      <Hero />
      <div className="md:px-25">
        <EchoChamber />
        <Who />
        <WhyJoin />
      </div>
    </>
  );
}

export default Homepage;
