import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Image from "../lazyLoadimage/Image";
import CircleRating from "../circleRating/circleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { IMAGE_URL } from "../../app/config";

function Card({ data, fromSearch, mediaType }) {
  const navigate = useNavigate();
  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/${data?.media_type || mediaType}/${data?.id}`)}
    >
      <div className="poster-block">
        <Image
          className="poster-img"
          src={`${
            data?.poster_path
              ? `${IMAGE_URL}/${data?.poster_path}`
              : PosterFallback
          }`}
        />
        {!fromSearch && (
          <>
            <CircleRating rating={data.vote_average?.toFixed(1)} />
            <Genres data={data.genre_ids?.slice(0, 2)} />
          </>
        )}
      </div>
      <div className="text-block">
        <span className="title">{data?.title || data?.name}</span>
        <span className="date">
          {dayjs(data?.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
}

export default Card;
