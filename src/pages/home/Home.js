import React from "react";
import Banner from "./Banner/Banner";
import Trending from "./trending/Trending";
import "./style.scss";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

function Home() {
  return (
    <div className="homePage">
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
}

export default Home;
