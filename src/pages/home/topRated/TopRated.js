import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

function TopRated() {
  const [endPoint, setEndPoint] = useState("movie");

  const { data, loading } = useFetch(`/${endPoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "Movie" ? "movie" : "tv");
  };

  return (
    <div className="carousel-selection">
      <ContentWrapper>
        <span className="carousel-title">Top Rated</span>
        <SwitchTab data={["Movie", "TV Show"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data} loading={loading} media_type={endPoint} />
    </div>
  );
}

export default TopRated;
