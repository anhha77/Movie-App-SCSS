import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { IMAGE_URL } from "../../../app/config";
import Image from "../../../components/lazyLoadimage/Image";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

function Banner() {
  const [background, setBackGround] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = `${IMAGE_URL}${
      data?.results?.[Math.floor(Math.random() * 20)].backdrop_path
    }`;
    setBackGround(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="banner">
      <div className="backdrop-img">
        {!loading && <Image src={background} />}
      </div>
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="banner-content">
            <span className="title">Welcome.</span>
            <span className="sub-title">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onKeyUp={searchQueryHandler}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Banner;
