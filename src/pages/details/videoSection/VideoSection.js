import React, { useState, useRef } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Image from "../../../components/lazyLoadimage/Image";
import PlayBtn from "../playBtn/PlayBtn";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

function VideoSection({ data, loading }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const videosContainer = useRef();

  const loadingSkeleton = () => (
    <div className="skeleton-item">
      <div className="thumb skeleton"></div>
      <div className="row skeleton"></div>
      <div className="row2 skeleton"></div>
    </div>
  );

  const navigation = (direction) => {
    const container = videosContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="videos-section">
      <ContentWrapper>
        <div className="section-heading">Official Videos</div>
        <BsFillArrowLeftCircleFill
          className="carousel-left arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel-right arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="videos" ref={videosContainer}>
            {data?.map((item) => (
              <div
                className="video-item"
                key={item.id}
                onClick={() => {
                  setShow(true);
                  setVideoId(item.key);
                }}
              >
                <div className="video-thumbnail">
                  <Image
                    src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                  />
                  <PlayBtn />
                </div>
                <div className="video-title">{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="video-skeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}

export default VideoSection;
