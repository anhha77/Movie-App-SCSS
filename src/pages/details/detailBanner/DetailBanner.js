import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import Image from "../../../components/lazyLoadimage/Image";
import PosterFallback from "../../../assets/no-poster.png";
import { IMAGE_URL } from "../../../app/config";
import PlayBtn from "../playBtn/PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

import "./style.scss";
import CircleRating from "../../../components/circleRating/circleRating";

function DetailBanner({ video, crew }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const genres = data?.genres.map((item) => item.id);

  const director = crew?.find(
    (item) => item.job === "Director" || item.job === "Executive Producer"
  );
  const writter = crew?.filter(
    (item) =>
      item.job === "Screenplay" ||
      item.job === "Story" ||
      item.job === "Writter"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 0 ? `${hours}h` : ""}${minutes > 0 ? `${minutes}m` : ""}`;
  };

  return (
    <div className="details-banner">
      {!loading ? (
        <>
          <div className="backdrop-img">
            <Image src={`${IMAGE_URL}${data?.backdrop_path}`} />
          </div>
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data?.poster_path ? (
                  <Image
                    className="poster-img"
                    src={`${IMAGE_URL}${data?.poster_path}`}
                  />
                ) : (
                  <Image className="poster-img" src={PosterFallback} />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${data?.name || data?.title} (${dayjs(
                    data?.release_date
                  ).format("YYYY")})`}
                </div>
                <div className="subtitle">{data?.tagline}</div>
                <Genres data={genres} />
                <div className="row">
                  <CircleRating
                    rating={Math.ceil(data?.vote_average * 10) / 10}
                  />
                  <div
                    className="play-btn"
                    onClick={() => {
                      setShow(true);
                      setVideoId(video?.key);
                    }}
                  >
                    <PlayBtn />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>
                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data?.overview}</div>
                  <div className="info">
                    {data?.status && (
                      <div className="info-item">
                        <span className="text bold">Status: </span>
                        <span className="text">{data?.status}</span>
                      </div>
                    )}
                    {(data?.release_date || data?.first_air_date) && (
                      <div className="info-item">
                        <span className="text bold">Release Date: </span>
                        <span className="text">
                          {dayjs(
                            data?.release_date || data?.first_air_date
                          ).format("MMM D, YYYY")}
                        </span>
                      </div>
                    )}
                    {(data?.runtime || data?.episode_run_time[0]) && (
                      <div className="info-item">
                        <span className="text bold">Run Time: </span>
                        <span className="text">
                          {toHoursAndMinutes(
                            data?.runtime || data?.episode_run_time[0]
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  {director && (
                    <div className="info">
                      <span className="text bold">Director</span>
                      <span className="text">{director.name}</span>
                    </div>
                  )}
                  {writter?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Writter</span>
                      <span className="text">
                        {writter?.map((item, index) => (
                          <span key={index}>
                            {item.name}
                            {writter.length - 1 !== index && ", "}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </ContentWrapper>
        </>
      ) : (
        <div className="details-banner-skeleton">
          <ContentWrapper>
            <div className="left-skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}

export default DetailBanner;
